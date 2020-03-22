import "./styles.css";
//import map from "./map.js";
import { game } from "./game";

//var m = new map(100, 100, 50);
//m.build();
//m.test();

//document.getElementById("map").innerHTML = m.display();

var g = new game();
g.init();

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
 Test page...
</div>
`;
//<!--${m.version()}-->
//`;
