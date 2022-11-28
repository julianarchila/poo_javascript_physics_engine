import { AABB, regularPolygon, Circle, Line, Box2D } from "./primitives/";
import { Vector } from "./utils/vector";
import Renderer from "./render";
import PhysicsEngine from "./PhysicsSystem";
import Rigidbody from "./rigidBody/RigidBody";

let frameRate = 60;

let renderer = new Renderer(
  window.innerHeight,
  window.innerWidth,
  document.body
);

renderer.canvas!.style.background = "rgba(26,26,35,1)";

let engine = new PhysicsEngine(1 / frameRate, new Vector(0, 9.8));
console.log(engine);

let c1 = new Circle(50, new Vector(100, 100));
c1.rigidBody.setMass(100);
c1.style.color = "red";
c1.rigidBody.setTransform(c1.getCenter(), 2);

engine.addRigidbody(c1.rigidBody);
renderer.addElement(c1);

let c2 = new Circle(50, new Vector(200, 100));
c2.rigidBody.setMass(100);
c2.style.color = "blue";
c2.rigidBody.setTransform(c2.getCenter(), 2);

engine.addRigidbody(c2.rigidBody);
renderer.addElement(c2);

const gameLoop = () => {
  let dt = 1 / frameRate;
  engine.update(dt);
  renderer.display();
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
