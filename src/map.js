import { sprite, canvas } from "./sprite.js";

const SMALLBLOCK = 10;

const WATER = 0x00;
const LAND = 0x01;
const FOREST = 0x02;
const HILLS = 0x04;
const MOUNTAIN = 0x08;

export default class map {
  // constructor
  constructor(
    width,
    heigth,
    landRatio,
    forestRatio = 30,
    hillsRatio = 25,
    mountainRatio = 10
  ) {
    this._width = width;
    this._heigth = heigth;
    this._landRatio = landRatio;
    this._forestRatio = forestRatio;
    this._hillsRatio = hillsRatio;
    this._mountainRatio = mountainRatio;
    this._map = [];
  }

  // Shore value
  shoreValue(map, x, y, tileType = WATER) {
    return (
      (map[x - 1][y] === tileType ? 0x01 : 0) +
      (map[x][y - 1] === tileType ? 0x02 : 0) +
      (map[x + 1][y] === tileType ? 0x04 : 0) +
      (map[x][y + 1] === tileType ? 0x08 : 0)
    );
  }

  // build initial map
  createSmallMap() {
    // define sea and land areas
    var smallmap = [];
    var maxx = Math.round(this._width / SMALLBLOCK);
    var maxy = Math.round(this._heigth / SMALLBLOCK);

    for (var x = 0; x < maxx; x++) {
      smallmap[x] = [];
      for (var y = 0; y < maxy; y++) {
        if (
          x === 0 ||
          x === maxx - 1 ||
          y === 0 ||
          y === maxy - 1 ||
          Math.round(Math.random() * 100) > this._landRatio
        )
          smallmap[x][y] = WATER;
        else smallmap[x][y] = LAND;
      }
    }
    return smallmap;
  }

  // create half size map
  createHalfMap(smallmap) {
    // convert small map to map
    var halfMap = [];
    for (var x = 0; x < this._width / 2; x++) {
      halfMap[x] = [];
      for (var y = 0; y < this._heigth / 2; y++) {
        halfMap[x][y] =
          smallmap[Math.floor(x / (SMALLBLOCK / 2))][
            Math.floor(y / (SMALLBLOCK / 2))
          ];
      }
    }
    //this.print(this._map, 4);
    // adapt shores
    loopMap(halfMap, 1, LAND, WATER, 40);
    loopMap(halfMap, 1, WATER, LAND, 30);
    function loopMap(map, loop, testTile, changeTile, prob) {
      for (var l = 0; l < loop; l++) {
        for (x = 1; x < map.length - 1; x++)
          for (y = 1; y < map[x].length - 1; y++)
            if (
              map[x][y] === testTile &&
              (map[x - 1][y] === changeTile ||
                map[x + 1][y] === changeTile ||
                map[x][y - 1] === changeTile ||
                map[x][y + 1] === changeTile) &&
              Math.round(Math.random() * 100) < prob
            )
              map[x][y] = changeTile;
      }
    }
    return halfMap;
  }

  // add hils and mountains.._.
  addHillsAndMountains(smallmap) {
    for (var x = 1; x < smallmap.length - 1; x++)
      for (var y = 1; y < smallmap[x].length - 1; y++) {
        //if no sore
        if (this.shoreValue(smallmap, x, y) === 0) {
          if (Math.round(Math.random() * 100) < this._forestRatio)
            smallmap[x][y] = FOREST;
          else if (Math.round(Math.random() * 100) < this._hillsRatio)
            smallmap[x][y] = HILLS;
          else if (Math.round(Math.random() * 100) < this._mountainRatio)
            smallmap[x][y] = MOUNTAIN;
        }
      }
  }

  // convert to full Map
  convertHalfToFullMap(halfMap) {
    this._map = [];
    for (var x = 0; x < halfMap.length; x++) {
      var a = [],
        b = [];

      for (var y = 0; y < halfMap[x].length; y++) {
        a.push(halfMap[x][y]);
        b.push(halfMap[x][y]);
      }
      this._map.push(a);
      this._map.push(b);
    }
    for (x = 0; x < this._width; x++)
      for (y = 0; y < this._heigth; y++) {
        if (
          (this._map[x][y] === FOREST ||
            this._map[x][y] === HILLS ||
            this._map[x][y] === MOUNTAIN) &&
          Math.round(Math.random() * 100) > 80
        )
          this._map[x][y] = LAND;
      }
  }

  createMap() {
    var smallmap = this.createSmallMap();
    var halfMap = this.createHalfMap(smallmap);
    this.addHillsAndMountains(halfMap);
    //  this.print(halfMap,8);
    this.convertHalfToFullMap(halfMap);
    this.print(this._map, 8);
  }

  neighbours(x, y) {
    var out = 0;
    for (var b = y - 1; b <= y + 1; b++)
      for (var a = x - 1; a <= x + 1; a++) out += this._map[a][b];
    return out;
  }

  // d
  test() {
    var c = new canvas("canvas");
    var img = new sprite(c.context(), 50, 50, "blue");
    img.draw(50, 50);
  }

  print(m, icon) {
    var c = new canvas("canvas");
    var water = new sprite(c.context(), icon, icon, "blue");
    var land = new sprite(c.context(), icon, icon, "green");
    var forest = new sprite(c.context(), icon, icon, "darkgreen");
    var hills = new sprite(c.context(), icon, icon, "brown");
    var mountain = new sprite(c.context(), icon, icon, "grey");
    for (var x = 0; x < m.length; x++) {
      for (var y = 0; y < m[x].length; y++) {
        switch (m[x][y]) {
          case WATER:
            water.draw(icon * x, icon * y);
            break;
          case LAND:
            land.draw(icon * x, icon * y);
            break;
          case FOREST:
            forest.draw(icon * x, icon * y);
            break;
          case HILLS:
            hills.draw(icon * x, icon * y);
            break;
          case MOUNTAIN:
            mountain.draw(icon * x, icon * y);
            break;
          default:
            break;
        }
      }
    }
  }
}
