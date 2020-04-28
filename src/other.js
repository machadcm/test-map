//
//
const INITIAL_LEVEL = 1;
const INITIAL_HAPINESS = 1;
const HUMAN = 0;
const AUTO = 1;

export const CITY = 0x01;
export const MONESTERY = 0x02;
export const HOTPOST = 0x04;
export const KEEP = 0x08;

export class city {
  //
  // constuctor
  constructor(player, name, tribe, type, pos) {
    this._info = {
      player: player,
      name: name,
      tribe: tribe,
      type: type,
      coordinates: pos
    };
    this._population = {
      nobles: 0,
      cleric: 0,
      craftsmen: 0,
      merchants: 0,
      pleasant: 0,
      servent: 0
    };
    this._level = {
      tax: 0,
      level: INITIAL_LEVEL,
      hapiness: INITIAL_HAPINESS,
      health: 0,
      religion: 0,
      security: 0
    };
    this._buildings = [];
    this._goods = {
      stock: {},
      production: {},
      supply: {},
      demand: {},
      import: {},
      export: {},
      trade: []
    };
  }


  coordinates() { return this._info.coordinates; }

  // calculate health level
  health() {
    // Health = food_level * plagues
  }

  // calculate happines level
  happiness() {
    // Happiness = security * health * religion * 1/tax 
    this._level.hapiness = this._level.security * this._level.health * this._level.religion * ( this._level.tax ? 1/this._level.tax : 1);
  }

  // calculate security
  security() {
    // Security = army_protection * fortress_level
  }

  // add new building to
  building(buildtype) {}

  // calculate city growth
  growth() {}

  auto() {}

  turn() {
    this.growth();

    // add imports to trade

    // foreach building calculate production with existing stock
    this._buldings.forEach(item => {
      item.turn(this._goods.stock);
    });
    // for each building calculate demand and supply at current procuction capacity
    this._buildings.forEach(item => {
      item.production(this._goods.supply, this._goods.demand);
    });

    // calculate trade list (trade = stock - demand )
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
  farm: { level: 1, turns: 1, cost: 0, demand: {}, supply: { food: 1 }, social: {}, workers: 100 },
  mill: { level: 1, turns: 1, cost: 1, demand: {}, supply: { food: 1 }, social: {}, workers: 100 }
};

export class building {
  constructor(player, name, type, tribe, pos) {
    this._info = {
      player: player,
      name: name,
      tribe: tribe,
      type: type,
      coordinates: pos
    };
    this._status = {
      build: building[this._info.type].turns,
      level: 0,
      health: 0,
      workers: 0,
      maxworkers: building[this._info.type].workers
    }
  }

  // return building information
  info() { return(this._info); }

  // return building status
  status() { return(this._status); }

  // set workers
  workers(wrk) { this._status.workers = wrk; }

  // set current production needs and outcome
  social(scl) { 
    if (this._status.level) {
      var productionratio = this._status.level * this._status.health * this._status.workers / (building[this._type].workers * this._status.level)
      // set supply and demand lists
      for( var item in building[this._type].social ) 
      scl[item] += this.building[this._type].social[item] * productionratio; 
    }
  }

  // set current production needs and outcome
  production(supply, demand) { 
    if (this._status.level) {
      var productionratio = this._status.level * this._status.health * this._status.workers / (building[this._type].workers * this._status.level)
      // set supply and demand lists
      for( var item in building[this._type].demand ) 
        demand[item] += this.building[this._type].demand[item] * productionratio; 
      for( item in building[this._type].supply ) 
        supply[item] += this.building[this._type].supply[item] * productionratio; 
    }
  }

  // building turn
  turn(stock) {
    // check if in upgrade
    if ( this._build > 0 ) this._build--;
    else {
      if( this._build === 0 ) {
        this._status.level ++;
        this._maxworkers = building[this._info.type].workers * this._status.level;
        this._build = -1;
      }
    }
    
    if(this._status.level) {
      // check if demand exists on stock
       var productionratio = this._status.level * this._status.health * this._status.workers / (building[this._type].workers * this._status.level)
      // remove from stock
      // add production to stock

    }

  }
}

const MAP_MASK = 0x00f;
const MAP_HIDDEN = 0x010;
const MAP_IDLE = 0x020;
const MAP_ACTIVE = 0x040;

export class player {
  // constructor
  constructor(playerid, name, human, map, cities, armies, html) {
    this._id = playerid;
    this._name = name;
    this._tribe = 0;
    this._human = human;
    this._map = map;
    this._cities = cities;
    this._armies = armies;
    // set mask map
    this._mapmask = this._map.createMask();
    this._gold = 1;
  }

  id() { return this._id; }

  tribe() { return this._tribe; }

  // define map mask
  mask() {
    // reset map mask (active to idle)
    this._map.reset(this._mapmask);
    // map cities
    for (var city of this._cities) {
      if (city.player() === this._id) {
        this._map.mask(this._mapmask, city.coordinates(), 3); //city.visible(),
      }
    }
    // map mask armies
    for (var army in this._armies)
      if (army.payer === this._id)
        this._map.mask(
          this._map.map(),
          this._mapmask,
          army.pos(),
          army.visible()
        );
  }

  // define capital
  capital(city) {
    this._capital = city;
  }

  // turn
  turn() {
    // set map mask
    //this.mask();
    //console.log("prepare to display")
    // if humman player
    if (this._human) {
      this._map.prepare(this._id, this._mapmask, this._cities, this._armies);
      //console.log("player: " + this._id + ", human: " + this._human);
      //console.log(this._mapmask[0][0]);
      // set map mask
      //this.mask();
      this._map.display(this._capital.coordinates());
    }
  }
}
