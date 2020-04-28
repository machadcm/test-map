import map from "./map";
import { city, player, CITY } from "./other";

var callbackfunction = null;

export class htmlMethods {
  // clear
  clear(id) {
    document.getElementById(id).innerHTML = "";
  }

  // div
  div(text, cls) {
    return (
      "<div " + (cls ? ' class="' + cls + '"' : "") + ">" + text + "</div>"
    );
  }

  // unordered list
  ul(list, callback, cls) {
    var html = "<ul" + (cls ? ' class="' + cls + '"' : "") + ">";
    for (var l of list) html += '<li onclick="' + callback + '">' + l + "</li>";
    html += "</ul>";
    return html;
  }

  // set element by id
  set(id, html) { document.getElementById(id).innerHTML = html; }

  // hide element
  hide(id) { document.getElementById(id).classList += ' hidden'; }
  // display element
  show(id) { 
    document.getElementById(id).classList =
    document.getElementById(id).classList.value.replace(/ hidden/g,'');
  }
  
  // prepare callback
  callback(cbfunction) {
    callbackfunction = cbfunction;
  }
}

/*
const MapSize = {
  small: { width: 60, height: 60 },
  medium: { width: 80, height: 80 },
  large: { width: 100, height: 100 }
};
*/

export class game {
  constructor(players, mapsize) {
    this._players = [];
    this._cities = [];
    this._armies = [];
    this._map = null;
    this._html = new htmlMethods();
    //this._map = new map(100,100,50);
    this._numplayers = 0;
  }

  mainMenu() {
    this._html.clear("menu");
    var html = this._html.div("Dark Ages", "menuheader");
    html += this._html.ul(
      ["New Game", "Load Game", "Credits"],
      "xx",
      "menulist"
    );
    this._html.set("menu", html);

    /*
    this._set('menu',
    this._html.ul(["New Game", "Load Game", "Credits"], "menulist","xx")
    );
    */
  }

  load() {}

  start() {
    document.getElementById("map").classList = "hidden";
    this.mainMenu();
    // select map size
    // select number of players
    // settting
  }

  // create player structure
  players(numplayers, name ) {
    this._numplayers = numplayers;
    var humanplayer = Math.round(Math.random() * (numplayers-1)) + 1;
    
    // create players
    for(var i=0; i<numplayers; i++) {
      if (humanplayer === (i+1))
        this._players[i] = new player(i+1, name, true, this._map, this._cities, this._armies);
      else
        this._players[i] = new player(i+1, 'ai', false, this._map, this._cities, this._armies);
    }
  }

  //
  init() {
    if( this._map === null ) {
      // create nap strycture
      this._map = new map(60, 60, 50);
      // create map
      this._map.createMap();
      // create players
      this.players(1,'xpto');
      // place cities
      this._map.addCities(this._cities, this._players, 6);

      for(var p of this._players)
        p.turn();
    } else console.log("Error: game already created.")

    //this._map.print(8);
  }

  displayHeader() {
    this._html.set("header",
    `
    <div id="header-left" class="left"></div>
    <div id="header-right" class="right">right</div>
    `
    );
    this._html.set("header-left", this._html.ul(["Population", "Coins"]));
    this._html.set("header-right", "Settings");
  }

  displayCity() {
    /*
    document.getElementById("screen").innerHTML = `
      <div id="container" class="container">
        <canvas id="canvas"></canvas>
        <div id="header"></div>
        <div id="bottom"></div>
      </div>
    `;
    */
   this._html.hide('canvas');
   this._html.show('canvas');
  }
}
