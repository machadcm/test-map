import "./styles.css";
//import map from "./map.js";
import { game } from "./game";

//var m = new map(100, 100, 50);
//m.build();
//m.test();

//document.getElementById("map").innerHTML = m.display();

  // force clease console
  console.clear();


  if (_game === undefined) {
    var _game = new game();


document.getElementById("screen").innerHTML = `
<div id="container" class="container">
  <div>
  <canvas id="canvas"></canvas>
  </div>
  <div class="header" id="header"></div>
  <div id="bottom"></div>
</div>
`;

    _game.init();
    _game.displayHeader();
    _game.displayCity();

    //document.getElementById("header").innerHTML = "header";
    document.getElementById("bottom").innerHTML = "footer";

}
