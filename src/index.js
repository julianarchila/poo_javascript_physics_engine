import { AABB, regularPolygon, Circle, Line } from "./primitives/index.js";
class Engine {
  constructor() {
    const canvas = document.createElement("canvas");
    canvas.id = ("render");
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);
    const render = document.getElementById("render");
    this.ctx = render.getContext('2d'); 
  }
  primitives = {
    AABB,
    regularPolygon,
    Circle,
    Line,
  };
}

let engine = new Engine();
let rectangle = new engine.primitives.regularPolygon(6,100,100,100,"hexagon", engine.ctx);
function draw(){
  rectangle.display();
}
setInterval(draw,100)
console.log(engine.ctx);
