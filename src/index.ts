import { AABB, regularPolygon, Circle, Line, Box2D, Ray } from "./primitives/";
import { Vector } from "./utils/vector";
import Renderer from "./render";
import PhysicsEngine from "./PhysicsSystem";
import Rigidbody from "./rigidBody/RigidBody";

import IntersectionDetector from "./rigidBody/IntersectionDetector";

let frameRate = 60;

let renderer = new Renderer(
  window.innerHeight,
  window.innerWidth,
  document.body
);

renderer.canvas!.style.background = "rgba(26,26,35,1)";

let engine = new PhysicsEngine(1 / frameRate, new Vector(0, 9.8));
console.log(engine);

let c1 = new Circle(50, new Vector(200, 100));
c1.rigidBody.setMass(100);
c1.style.color = "blue";
c1.rigidBody.setTransform(c1.getCenter(), 2);

engine.addRigidbody(c1.rigidBody);
renderer.addElement(c1);

let c2 = new Circle(50, new Vector(200, 500));
c2.rigidBody.setMass(0);
c2.style.color = "blue";
c2.rigidBody.setTransform(c2.getCenter(), 2);

engine.addRigidbody(c2.rigidBody);
renderer.addElement(c2);

// let box1 = new Box2D(new Vector(300, 500), new Vector(400, 200));
// box1.rigidBody.rotation = 70;
// box1.style.color = "red";
// box1.rigidBody.setMass(100);
// box1.rigidBody.setTransform(box1.rigidBody.position, 2);

// engine.addRigidbody(box1.rigidBody);
// renderer.addElement(box1);

let ray1 = new Ray(new Vector(30, 500), new Vector(1, -1));
ray1.style.color = "red";
renderer.addElement(ray1);

const gameLoop = () => {
  let dt = 1 / frameRate;
  engine.update(dt);
  renderer.display();

  if (IntersectionDetector.CircleAndCircle(c1, c2)) {
    c1.style.color = "red";
    c2.style.color = "red";
  } else {
    c1.style.color = "blue";
    c2.style.color = "blue";
  }

  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
