//
//
const INITIAL_LEVEL = 1;
const INITIAL_HAPINESS = 1;
const HUMAN = 0;
const AUTO = 1;

export default class city {
  //
  // constuctor
  constructor(name, type, posx, posy) {
    this._name = name;
    this._type = type;
    this._coor["x"] = posx;
    this._coor["y"] = posx;
    this._posy = posy;
    this._population = {
      nobles: 0,
      cleric: 0,
      craftsmen: 0,
      pleasant: 0,
      servent: 0
    };
    this._level = INITIAL_LEVEL;
    this._buldings = [];
    this._hapiness = INITIAL_HAPINESS;
    this._health = 0;
    this._religion = 0;
    this._security = 0;
    this._goods = { production: [], supply: [], demand: [], trade: [] };
  }

  // calculate health level
  health() {
    // Health = food_level * plagues
  }

  // calculate happines level
  happiness() {
    // Happiness = security * tax * health * religion
    this._hapiness = this._security * this._tax * this._health * this._religion;
  }

  // calculate security
  security() {
    // Security = army_protection * fortress_level
  }

  // add new building to
  building(buildtype) {}

  production() {}

  demand() {
    this._buldings.forEach(item => {
      item.demand();
    });
  }

  supply() {
    this._buldings.forEach(item => {
      item.supply();
    });
  }

  growth() {}

  auto() {}

  turn() {
    this.growth();
    this._buldings.forEach(item => {
      item.turn();
    });
  }
}

/*
const knight = 1;
const cavalary = 2;
const infantary = 3;
const archers = 4;
const pikeman = 5;
const mercenaries = 6;
*/
var armies = {
  knight: {
    cost: 20,
    maintenance: 5,
    attack: 20,
    defence: 30,
    movement: 4,
    size: 10
  },
  cavalary: {
    cost: 20,
    maintenance: 4,
    attack: 20,
    defence: 30,
    movement: 4,
    size: 10
  },
  archer: {
    cost: 5,
    maintenance: 1,
    attack: 10,
    defence: 2,
    movement: 2,
    size: 10
  },
  pikeman: {
    cost: 4,
    maintenance: 1,
    attack: 5,
    defence: 10,
    movement: 2,
    size: 10
  },
  infantary: {
    cost: 1,
    maintenance: 1,
    attack: 5,
    defence: 5,
    movement: 2,
    size: 10
  },
  mercenary: {
    cost: 3,
    maintenance: 5,
    attack: 10,
    defence: 10,
    movement: 2,
    size: 10
  },
  raider: {
    cost: 3,
    maintenance: 5,
    attack: 10,
    defence: 10,
    movement: 2,
    size: 10
  },
  pirate: {
    cost: 3,
    maintenance: 5,
    attack: 10,
    defence: 10,
    movement: 2,
    size: 10
  }
};

export class army {
  constructor(type) {
    this._type = {};
    this._morale = 100;
    this._health = 0;
    this._experience = 0;
    this.add(type);
  }

  add(type) {}
}

/*

1. Mill: food multiplier
2. Farm: +food
3. Brewery: +happiness +growth
4. Castle: +defense
5. Church: +happiness +culture
6. Industry: +growth +wealth
7. Well: +sanitation +happiness
City: Only cities can contain these structures
1. Large Castle (upgraded from Castle): +defense
2. Fortifications: +defense
3. Theatre: +happiness +culture
4. Library: +happiness +culture +research
5. Market: +growth +wealth
6. Barracks
7. Range
8. Stable
9. Siege Workshop
Infrastructure: Region upgrades
1. Roads: +movement
Town: Any town
1. Guardhouse: +defense
Salt Town
1. Salt Works: +salt
2. Salt Trade: +wealth +growth
Mining Town
1. Iron Mine: +iron
2. Iron Trade: +wealth +growth
Quarry Town
1. Quarry: +iron
2. Stone Trade: +wealth +growth
Market Town
1. Market: +wealth +growth
2. Inn: +happiness
Harbor Town
1. Fishery: +growth +food
2. Military Harbor
3. Trade Port: +growth +wealth
Logging Town
1. Hunting Lodge: +food +wealth
2. Woodcutter: +wood

*/

const buldings = {
  farm: {
    level: 1,
    turns: 1,
    demand: {},
    production: { food: 1 },
    workers: 100
  },
  mill: {
    level: 1,
    turns: 1,
    demand: {},
    production: { food: 1 },
    workers: 100
  }
};

export class building {
  constructor(type, city) {
    this._type = type;
    this._city = city;
    this._health = 100;
    this._workers = building[this._type].workers;
    this._build = building[this._type].turns;
  }

  demand() {
    if (!this._build) {
      // demaind is based on building level, workers and building health
      var goods = {};
      for (var demand in building[this._type].demand) {
        var racio =
          building[this._type].level *
          (this.workers / building[this._type].workers) *
          (this._health / 100);
        for (var key in Object.keys(demand))
          goods[key] = building[this._type].demand[key] * racio;
      }
      this._city.updateDemand(goods);
    }
  }

  supply() {
    if (!this._build) {
      // supply is based on existing demand, building level, workers and health
      var goods = {};
      this._city.updateSupply(goods);
    }
  }

  turn() {
    if (this._build) this._build--;
    else {
      let x = 1;
      x++;
    }
    // x = {a:1,b:2}
    //Object.keys(x)
    //for(var y in x) console.log(y);
    //x['a']
  }
}
