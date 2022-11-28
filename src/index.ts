import { AABB, regularPolygon, Circle, Line, Box2D } from "./primitives/";
import { Vector } from "./utils/vector";
import Renderer from "./render";
import PhysicsEngine from "./PhysicsSystem";
import Rigidbody from "./rigidBody/RigidBody";

// class Engine {
//   ctx: CanvasRenderingContext2D;
//   constructor() {
//     const canvas = document.createElement("canvas");
//     canvas.id = "render";
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     canvas.style.background = "rgba(26,26,35,1)";
//     document.body.style.background = "rgba(26,26,35,1)";
//     document.body.appendChild(canvas);
//     const render = document.getElementById("render") as any;
//     this.ctx = render.getContext("2d");
//   }
//   primitives = {
//     AABB,
//     regularPolygon,
//     Circle,
//     Line,
//   };
// }

let renderer = new Renderer(
  window.innerHeight,
  window.innerWidth,
  document.body
);

renderer.canvas!.style.background = "rgba(26,26,35,1)";

let engine = new PhysicsEngine(1 / 60, new Vector(0, -9.8));
console.log(engine);

let c1 = new Circle(50, new Vector(100, 100));
c1.style.color = "red";
let rb1 = new Rigidbody();
rb1.setTransform(c1.getCenter(),2);
rb1.setMass(100);

engine.addRigidbody(rb1);
renderer.addElement(c1);

console.log(engine);

setInterval(() => {
  renderer.display();
  engine.update(1 / 60);
}, 1000 / 60);
