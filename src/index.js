import { AABB, regularPolygon, Circle, Line } from "./primitives/index.js";
class Engine {
  constructor() {
    const canvas = document.createElement("canvas");
    canvas.id = ("render");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "rgba(26,26,35,1)";
    document.body.style.background = "rgba(26,26,35,1)";
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
let rectangle = new engine.primitives.regularPolygon(6,100,100,100, engine.ctx);
let circle = new engine.primitives.Circle(100,400,100,engine.ctx);
let line = new engine.primitives.Line(200,200,300,200,engine.ctx);
function draw(){
  rectangle.display();
  circle.display();
  line.display();
  requestAnimationFrame(draw);

}
requestAnimationFrame(draw)
console.log(engine.ctx);
