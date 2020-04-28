import { sprite, canvas } from "./sprite.js";
import { city, player, CITY, MONESTERY } from "./other.js";
import { terrain } from "./terrain.js";

const SMALLBLOCK = 10;

/*
const WATER = 0x0001;
const LAND = 0x0002;
const FOREST = 0x0004;
const HILLS = 0x0008;
const MOUNTAIN = 0x0010;
const BUILDING = 0x0100;
*/
const BUILDING = 0x0100;

const PLAYER_NEUTRAL = 0x00;

/*

map struct {

  type; 'water','land','forest'... (int)
  orientation: 'S','N','NW' ... (int)
  construction {
    type: 'city','tower','ruins'.. (int)
    tribe: ... (int)
    level: 1..100 (int)
  }

}

mask map stucture 
{
  visible: true, false (boolean)
  fog: true, false (boolean)
  construction: {... map struture }

}

*/

class mapTools {
  // create array
  create(width, heigth) {
    var array = [];
    for (var y = 0; y < heigth; y++) {
      array[y] = [];
      for(var x = 0; x < width; x ++) {
        array[y].push({ visible: false, fog: false, map: null });
      }
      //array[y] = new Array(width).fill({ visible: false, fog: f alse, map: null });
    }
    return array;
  }

  // change bit value if bit match
  reset(maskarray) {
    for (var y = 0; y < maskarray.length; y++)
      for (var x = 0; x < maskarray[0].length; x++)
        if (maskarray[y][x].visible) maskarray[y][x].fog = true;
  }

  /*
  // set mask value
  mask(maparray, maskarray, pos , range, bitvalue, bitmask) {
    var minx = pos.x - range >= 0 ? pos.x - range : 0;
    var miny = pos.y - range >= 0 ? pos.y - range : 0;
    var maxx = pos.x + range < maskarray[0].length ? pos.x + range : maskarray[0].length - 1;
    var maxy = pos.y + range < maskarray.length ? pos.y + range : maskarray.length - 1;

    //console.log("=>> x:" + minx + " .. " + maxx + ", y:" + miny + " .. " + maxy);
    //this.count(maskarray, "1: ");

    for (var y = miny; y < maxy; y++){
      for (var x = minx; x < maxx; x++) {
        maskarray[y][x].visible = true;
        maskarray[y][x].fog = false;
        maskarray[y][x].map = {
          type: maparray[y][x].type,
          orientation: maparray[y][x].orientation,
          construction: { ...maparray[y][x] }
        };
      }
    }
      //console.log(maskarray[miny-1][minx-1]);     
      //console.log(maskarray[maxy][maxx]);
    //this.count(maskarray, "2: ");
  }

  // check if element in range
  check(maparray, pos, range, bitvalue) {
    var minx = pos.x - range >= 0 ? pos.x - range : 0;
    var miny = pos.y - range >= 0 ? pos.y - range : 0;
    var maxx = pos.x + range < maparray[0].length ? pos.x + range : maparray[0].length - 1;
    var maxy = pos.y + range < maparray.length ? pos.y + range : maparray.length - 1;

    for (var y = miny; y < maxy; y++)
      for (var x = minx; x < maxx; x++)
        if (maparray[y][x].value & bitvalue) return true;
    return false;
  }

  // return a random position within radius
  random(maparray, pos, width, heigth, match, radius, attempts = 100) {
    
    for (var k = 0; k < attempts; k++) {
      var index = Math.trunc(Math.random() * width * heigth);
      var x = pos.x + Math.trunc(index % width);
      var y = pos.y + Math.trunc(index / width);

      if ( match.includes(maparray[y][x].type)  &&
        !this.check(maparray, { x: x, y: y }, radius, BUILDING)
      ) return { x: x, y: y };
    }
    return null;
  }

  // return neighbours
  neighbours(array, pos, match) {
    return (
      (match.includes(array[pos.x][pos.y - 1]) ? 0x01 : 0) +
      (match.includes(array[pos.x + 1][pos.y]) ? 0x02 : 0) +
      (match.includes(array[pos.x][pos.y + 1]) ? 0x04 : 0) +
      (match.includes(array[pos.x - 1][pos.y]) ? 0x08 : 0)
    );
  }
  */
}



class screenIso extends mapTools {

  mask(array, maskarray, pos , range) {
    var nbg = [pos];
    nbg.push({x:pos.x+1, y:pos.y});
    nbg.push({x:pos.x-1, y:pos.y+1});
    nbg.push({x:pos.x, y:pos.y+1});
    nbg.push({x:pos.x-1, y:pos.y});
    nbg.push({x:pos.x+1, y:pos.y-1});
    nbg.push({x:pos.x, y:pos.y-1});

    for( var p of nbg) {
      if(!maskarray[p.y][p.x].visible) {
        maskarray[p.y][p.x].visible = true;
        maskarray[p.y][p.x].fog = false;
        maskarray[p.y][p.x].map = {
          type: array[p.y][p.x].type,
          orientation: array[p.y][p.x].orientation,
          construction: { ...array[p.y][p.x] }
        };      
      }
      if( range>1 )
        //&& p.x !== pos.x && p.y !== pos.y) 
        this.mask(array, maskarray, p , range-1)
  
    }
  }

  //TODO: falta procurar exercito inimigo
  // check if element in range
  check(array, pos, match, range) {
    var minx = pos.x - range >= 0 ? pos.x - range : 0;
    var miny = pos.y - range >= 0 ? pos.y - range : 0;
    var maxx = pos.x + range < array[0].length ? pos.x + range : array[0].length - 1;
    var maxy = pos.y + range < array.length ? pos.y + range : array.length - 1;

    // create floating 
    var floatminx = minx;
    var floatmaxx = maxx - range;
    // check if exists any 
    for (var y = miny; y < maxy; y++) {
      for (var x = minx; x < maxx; x++) {
        if( x >= floatminx && x < floatmaxx && match.includes(array[y][x].value) ) 
          return(true)
      }
      if( x < pos.x ) floatmaxx++;
        else floatminx++;
    }
    return false;
  }

  // return a random position within radius
  random(array, quadrant, matchtypeof, unmatchtypeof, radius, attempts = 100) {
    // random position in quadrant
    for (var k = 0; k < attempts; k++) {
      var index = Math.trunc(Math.random() * quadrant.width * quadrant.heigth);
      var x = quadrant.x + Math.trunc(index % quadrant.width);
      var y = quadrant.y + Math.trunc(index / quadrant.width);
      // select if position match selection and unmatch radius
      if ( matchtypeof.includes(array[y][x].type) &&
        !this.check(array, { x: x, y: y }, unmatchtypeof, radius))
        return { x: x, y: y };
    }
    return null;
  }

  // return neighbours
  neighbours(array, pos, match) {
    return (
      (match.includes(array[pos.x][pos.y - 1]) ? 0x01 : 0) +
      (match.includes(array[pos.x + 1][pos.y - 1]) ? 0x02 : 0) +
      (match.includes(array[pos.x + 1][pos.y]) ? 0x04 : 0) +
      (match.includes(array[pos.x][pos.y + 1]) ? 0x08 : 0) +
      (match.includes(array[pos.x - 1][pos.y + 1]) ? 0x10 : 0),
      (match.includes(array[pos.x - 1][pos.y]) ? 0x20 : 0)
    );
  }

  // display on canvas
  display(canvas, terrain, iconsize, map, mask, pos, zoom ) {

    // calculate screen max width and heigth
    var screenMaxY = Math.ceil(2 * canvas.height() / ( 1.5 * iconsize.height * zoom)) + 1;
    var screenMaxX = Math.ceil(canvas.width() / (iconsize.width * zoom));

    // calculate x offset at y=0
    //var screenOffsetx = Math.ceil(screenMaxX * 0.5 * Math.sqrt(3));

    // calculate initial map positions
    //var imapx = pos.x + Math.round((screenMaxX + 1 ) * 0.5 - screenMaxX * 0.5 - 1/zoom) - 2;
    //var imapx = 1
    //var imapy = pos.y - Math.round((screenMaxY - 1) * 0.5);

    var p = this.position(canvas, iconsize, pos, zoom);
    var imapx = p.x;
    var imapy = p.y;

    // loop through y map
    for(var y=0; y < screenMaxY; y++) {
      // define screen positions
      var posy = y * zoom * iconsize.height * 0.75 - zoom * iconsize.height * 0.5;
      // loop through x map
      for(var x=(y+1-screenMaxX); x < (y + screenMaxX + 2); x++){
        // if inside canvas
        if( x>=0 && y>=0) {
          // calculate x position on canvas
          var posx = ( x - (y + 1) * 0.5) * zoom * iconsize.width;
          // if inside map array 
            if( (x + imapx) >= 0 && (x + imapx) < map[0].length && (y+imapy) >= 0 && (y+imapy) < map.length) {
            // print map tile
            terrain.icon(map[y+imapy][x+imapx].type).draw(posx, posy, false, zoom );
          } else {
            // print unknown
            terrain.icon(0).draw(posx, posy, false, zoom );
          }
        }
      }
      // decrement offset
      imapx--;
    }

  }

  // define position screen zero on map
  position(canvas, iconsize, pos, zoom) {
   // calculate screen max width and heigth
   var screenMaxY = Math.ceil(2 * canvas.height() / ( 1.5 * iconsize.height * zoom)) + 1;
   var screenMaxX = Math.ceil(canvas.width() / (iconsize.width * zoom));

   // calculate initial map positions (45º => 0.5 60º => ..)
   var y = pos.y - Math.round((screenMaxY - 1) * 0.5);
   var x = pos.x - Math.round(screenMaxX - (screenMaxY * 0.25 + screenMaxX * 0.5));
  
   return({x:x, y:y});
  }

  mouse(iconsize, zero, mouse, zoom) {
    // calculate x position
    var y = 1 + Math.floor( ( mouse.y - iconsize.height * zoom * 0.5 ) / (iconsize.height * zoom * 0.5 * 1.5)) 
    // calculate y position
    var x = Math.floor( (mouse.x + ( y & 0x01 ? 0 : iconsize.width * zoom * 0.5 )) / (iconsize.width * zoom));

    var xoffset = zero.x + Math.round(x - (y * 0.5)) ;
    var yoffset = zero.y + y;
    //console.log(Math.round(x - (y * 0.5)))
    //console.log("Zero: (" + zero.x + "," + zero.y + ") center: (" + center.x + "," + center.y + ")");
    //console.log("mouse: " + x + "," + y + "  offset: " + xoffset + "," + yoffset)
    //console.log("offset: " + xoffset + "," + yoffset )

    //var newpos = this.position(canvas, iconsize, {x:x, y:y}, zoom)
    //console.log(newpos)

    return( {x:xoffset, y:yoffset} );
  }
} 

export default class map extends mapTools {
  // constructor
  constructor( width, heigth, landRatio, forestRatio = 30, hillsRatio = 25, mountainRatio = 10 ) {
    super();
    this._width = width;
    this._heigth = heigth;
    this._landRatio = landRatio;
    this._forestRatio = forestRatio;
    this._hillsRatio = hillsRatio;
    this._mountainRatio = mountainRatio;
    this._map = [];
    this._canvas = new canvas("canvas");
    this._iconsize = { width:128, height:128 };
    this._terrain = new terrain(this._canvas, 128, 64);
    this._terrain.loadImages();
    this._screen = new screenIso();
    this._run = {
      player: null,
      screenzero: null,
      screencenter: null,
      newpos: null,
      zoom: 0.25,
      event: {
        type: "mouseup"
      }
    }
  }

  /*
  // map witdh
  width() { return this._width; }

  // map heigth
  heigth() { return this._heigth; }

  map() { return this._map; }
  */

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
          smallmap[x][y] = this._terrain.id('Ocean');
        else smallmap[x][y] = this._terrain.id('Plains');
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
    // adapt shores
    loopMap(halfMap, 1, this._terrain.id('Plains'), this._terrain.id('Ocean'), 40);
    loopMap(halfMap, 1, this._terrain.id('Ocean'), this._terrain.id('Plains'), 30);
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
  addHillsAndMountains(halfmap) {
    var ocean = this._terrain.id('Ocean');
    var florest = this._terrain.id('Plains-Florest');
    var hills = this._terrain.id('Plains-Hills');
    var mountains = this._terrain.id('Mountains');

    for (var x = 1; x < halfmap.length - 1; x++)
      for (var y = 1; y < halfmap[x].length - 1; y++) {
        //if no coast
        if ( halfmap[x][y-1] !== ocean && halfmap[x+1][y] !== ocean &&   
             halfmap[x+1][y+1] !== ocean && halfmap[x-1][y] !== ocean) {
          if (Math.round(Math.random() * 100) < this._forestRatio)
            halfmap[x][y] = florest;
          else if (Math.round(Math.random() * 100) < this._hillsRatio)
            halfmap[x][y] = hills;
          else if (Math.round(Math.random() * 100) < this._mountainRatio)
            halfmap[x][y] = mountains;
        }
      }
  }

  // convert to full Map
  convertHalfToFullMap(halfMap) {
    for (var y = 0; y < halfMap.length; y++) {
      var a = [], b = [];
      for (var x = 0; x < halfMap[0].length; x++) { 
        a.push({ type: halfMap[y][x], orientation: 0, construction: null });
        a.push({ type: halfMap[y][x], orientation: 0, construction: null });
        b.push({ type: halfMap[y][x], orientation: 0, construction: null });
        b.push({ type: halfMap[y][x], orientation: 0, construction: null });
      }
      this._map.push(a);
      this._map.push(b);
    }

    var plains = this._terrain.id('Plains');
    var florest = this._terrain.id('Plains-Florest');
    var hills = this._terrain.id('Plains-Hills');
    var mountains = this._terrain.id('Mountains');

    // filter out some to make coast not linear
    for (x = 0; x < this._width; x++)
      for (y = 0; y < this._heigth; y++) {
        if ( [florest,hills,mountains].includes(this._map[x][y].type) &&
            Math.round(Math.random() * 100) > 70 )
          this._map[x][y].type = plains;
      }
  }

  addRiver() {
    for (var y = 0; y < this._heigth; y++) {
      for (var x = 0; x < this._width; x++) {
        if (this._map[x][y] === MOUNTAIN) {
          console.log(x + "-" + y);
        }
      }
    }
  }

  
  //
  getRandomLocation(quadrant, totalquadrants, emptyradius) {
    var xquad = 2;
    var yquad = 2;

    if (totalquadrants > 6) {
      xquad = 3;
      yquad = 3;
    } else if (totalquadrants > 4) xquad = 3;

    var width = Math.trunc(this._width / xquad);
    var heigth = Math.trunc(this._heigth / yquad);
    var x = Math.trunc((quadrant - 1) % xquad) * width;
    var y = Math.trunc((quadrant - 1) / yquad) * heigth;

    //
    //var pos = this.randomLocation( {x:x, y:y}, width, heigth, LAND | FOREST, emptyradius);

    var pos = this._screen.random(this._map, { x:x, y:y, width:width, heigth:heigth },
                  [this._terrain.id("Plains"), this._terrain.id("Plains")], 
                  [this._terrain.id("Building")], emptyradius);

    if (pos == null) {
      var newquadrant = (quadrant + 1) % totalquadrants;
      x = Math.trunc(newquadrant % xquad) * width;
      y = Math.trunc(newquadrant / yquad) * heigth;
      pos = this._screen.random(this._map, { x:x, y:y, width:width, heigth:heigth },
                  [this._terrain.id("Plains"), this._terrain.id("Plains")], 
                  [this._terrain.id("Building")], emptyradius);
}
    return pos;
  }

  createMap() {
    var smallmap = this.createSmallMap();
    
    var halfMap = this.createHalfMap(smallmap);
    this.addHillsAndMountains(halfMap);
    this.convertHalfToFullMap(halfMap);
    //this.print(halfMap, false);
    //this.print(this._map, true);
    // place rivers
    //this.addRiver();
    // place monestaries
    // place major towns
    // place independent towns
    /*
    var pos = this.randomLocation(this._width / 2, this._heigth / 2, 0, 0);
    console.log(pos);
    if (pos) {
      this._map[pos.y][pos.x] = CITY;
    }
    */
   
    //this.print(8);
    var debugmap = [
      [1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,4,4,4,4,4,1,1,1],
      [1,1,1,4,4,4,4,4,1,1,1],
      [1,1,1,4,4,4,4,4,1,1,1],
      [1,1,1,4,4,4,4,4,1,1,1],
      [1,1,1,4,4,4,4,4,1,1,1],
      [1,1,1,4,4,4,4,4,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1]
    ];

/*
    var debugmap = [
      [1,1,1,1,],
      [1,4,4,1,],
      [1,4,4,1,],
      [1,1,1,1,]
    ];
*/
    //console.log(debugmap);
    this._map = [];
    for (var y = 0; y < debugmap.length; y++) {
      this._map[y] = [];
      for (var x = 0; x < debugmap[0].length; x++) { 
        this._map[y][x] = { type: debugmap[y][x], orientation: 0, construction: null };
      }
    }
  }

  addCities(cities, players, majorcityrange = 6, otherbuildingrange = 4,monestatyrate = 20) {

    var pos = {x:5, y:5};
    this._map[pos.y][pos.x].type = this._terrain.id("City");
        var c = new city(players[0].id(), "name", players[0].tribe(), CITY, pos);
        players[0].capital(c);
        cities.push(c);

/*
    for (var i = 0; i < players.length; i++) {
      // add player cities
      var pos = this.getRandomLocation(players[i].id(), players.length, majorcityrange);
      if (pos == null) console.log("Unable to add city");
      else {
        this._map[pos.y][pos.x].type = this._terrain.id("City");
        var c = new city(players[i].id(), "name", CITY, pos);
        players[i].capital(c);
        cities.push(c);
      }
    }
    // add other neutral cities and monestaries
    for (i = 0; i < players.length; i++) {
      for (var k = 0; k < 8; k++) {
        pos = this.getRandomLocation( players[i].id(), players.length, majorcityrange );
        if (pos != null) {
          c = new city( PLAYER_NEUTRAL,"name", Math.random() * 100 < monestatyrate ? MONESTERY : CITY, pos );
          this._map[pos.y][pos.x].type = this._terrain.id("City");
          cities.push(c);
        }
      }
    }
  */
  }


  createMask() { return(this._screen.create(this._map[0].length, this._map.length)); }

  mask(maskarray, pos, range) { 
    return( this._screen.mask(this._map, maskarray, pos, range)); 
  }

  prepare(playerid, mask, cities, armies) {
    this._run.player = {
      id: playerid,
      mask: mask,
      cities: cities,
      armies: armies
    }
  }

  details(pos) {}

  position(pos) { this._run.newpos = pos; }

  // display 
  display(pos) {
    // set center position
    this._run.screencenter = this._run.newpos = pos;
    this._run.screenzero = this._screen.position(this._canvas, this._iconsize, pos, this._run.zoom);
    // display map
    this._screen.display(this._canvas, this._terrain, this._iconsize, 
                         this._map, this._run.player.mask, pos, this._run.zoom);

    this._loop = true;
    this._canvas.id().addEventListener("mousedown", this);
/*
    var i = 10;
    var timer = setInterval(() => {
      console.log("timer (" + this._loop + ")");

      this._screen.display(this._canvas, this._terrain, this._iconsize, 
        this._map, mapmask, pos, zoom);

      if( i-- <= 0 || !this._loop) { 
        clearInterval(timer ); 
        console.log("clear timer (" + i + ")" ); 
      }
    } ,5000);
*/
  }

//  displayLoop()

  handleEvent(e) {

    switch(e.type) {
      case "mousedown":
          this._run.event.type = e.type;
          this._canvas.id().addEventListener("mouseup", this);
          this._canvas.id().addEventListener("mousemove", this);
         // window.addEventListener("mousemove", this);
        break;
      case "mouseup":
        // remove event listeners
        this._canvas.id().removeEventListener("mouseup", this);
        this._canvas.id().removeEventListener("mousemove", this);

        // get mouse map position
        var pos = this._screen.mouse(this._iconsize, this._run.screenzero, 
                                        {x:e.clientX, y:e.clientY}, this._run.zoom);

        if( pos.x !== this._run.screencenter.x || pos.y !== this._run.screencenter.y ) {
          // if mouse move set new position else display tile details
          if (this._run.event.type === "mousemove" ) {
            // display tile details
            this.position(pos);
          } else {
            // display tile details
            this.details(pos);
          }
        } else {
            // display tile details
            this.details(pos);
        } 
        break;
      case "mousemove":
          pos = this._screen.mouse(this._iconsize, this._run.screenzero, 
                                            {x:e.clientX, y:e.clientY}, this._run.zoom);
          if( pos.x !== this._run.screencenter.x || pos.y !== this._run.screencenter.y ) {
            this.position(pos);
            this._run.event.type = e.type;
          }
          break;
      default:
        break;
    }

    this._loop = false;
    // window.addEventListener("mousedown", this);
  }
}
 
