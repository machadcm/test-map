import map from "./map";

export class htmlMethods {
  //constructor() {};

  /* 
  //map.process(htmlCanvas.context);
  $('#mainwindow').addClass('menulist')
  htmlUl('mainwindow',null,[['New Game',0],['Load Game',1],['Credits',2]],'menuSelection(this)');
});
*/

  ul(id, cls, list, callback) {
    var html = "<ul" + (cls ? ' class="' + cls + '""' : "") + ">";
    for (var l of list)
      html +=
        '<li onclick="' +
        callback +
        '">' +
        l[0] +
        '<span class="hidden">' +
        l[1] +
        "</span></li>";
    html += "</ul>";
    document.getElementById(id).innerHTML = html;
  }
}

export class game {
  constructor() {
    this._map = null;
    //this._map = new map(100,100,50);
  }

  start() {
    // select map size
    // select number of players
    // settting
  }

  //
  init() {
    this._map = new map(60, 60, 50);
    this._map.createMap();
    //    this._map.test();
  }
}
