
import { sprite } from "./sprite.js";

/*

Terrain types 

{ 
  name: 'plains', 'grassland'..
  defence: defence-ratio
  attack: attack-ratio
  production: [{food, +2}...]
  icon: &sprite-object
  maxindex: <number of images in sprite>

}

*/



export class terrain {
  // set up terrain structure
  constructor(canvas, iconsize) {
    this._canvas = canvas;
    this._iconsize = iconsize;
    this._terrain = [
      { 'name':'Unknown', 'defence':0, 'attack':0, 'movement': 1, 'production':[], 'icon':null, 'maxindex':1 },
      { 'name':'Ocean', 'defence':0, 'attack':0, 'movement': 1, 'production':[], 'icon':null, 'maxindex':1 },
      { 'name':'Coast', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Lake', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Plains', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Grassland', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Tundra', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Desert', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Plains-Florest', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Plains-Hills', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Grassland-Hills', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Desent-Hills', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Mountains', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Grassland-Hills', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'Swamp', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
      { 'name':'City', 'defence':0, 'attack':0, 'movement': 1, 'production':[{ 'food':1 }], 'icon':null, 'maxindex':1 },
    ];
  }

  // load images
  loadImages() {
    this._terrain[this.id('Unknown')].icon = 
        new sprite(this._canvas.context(), 4, this._iconsize, this._iconsize, "yellow");
    this._terrain[this.id('Ocean')].icon = 
        new sprite(this._canvas.context(), 4, this._iconsize, this._iconsize, "blue");
    this._terrain[this.id('Coast')].icon = 
        new sprite(this._canvas.context(), 4, this._iconsize, this._iconsize, "blue");
    this._terrain[this.id('Lake')].icon = 
        new sprite(this._canvas.context(), 4, this._iconsize, this._iconsize, "blue");
    this._terrain[this.id('Plains')].icon = 
        new sprite(this._canvas.context(), 4, this._iconsize, this._iconsize, "green");
    this._terrain[this.id('Plains-Florest')].icon = 
        new sprite(this._canvas.context(), 4, this._iconsize, this._iconsize, "darkgreen");
    this._terrain[this.id('Plains-Hills')].icon = 
        new sprite(this._canvas.context(), 4, this._iconsize, this._iconsize, "brown");
    this._terrain[this.id('Mountains')].icon = 
        new sprite(this._canvas.context(), 4, this._iconsize, this._iconsize, "grey");
    this._terrain[this.id('City')].icon = 
        new sprite(this._canvas.context(), 4, this._iconsize, this._iconsize, "white");
  }

  // return terrain id
  id(name) {
    for(var x=0; x < this._terrain.length; x++)
      if( name.toLowerCase() === this._terrain[x].name.toLowerCase() ) return(x);
    return(null);
  }

  // return icon
  icon(id) { return this._terrain[id].icon; }

  // return terrain object
  get(id) { return this._terrain[id]; }

}