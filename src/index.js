import { AABB, Box2d, Circle, Line } from "./primitives/index.js";
class Engine {
  constructor() {
    const display = new Path2D(); // todo
  }

  primitives = {
    AABB,
    Box2d,
    Circle,
    Line,
  };
}

let c = new Engine();

console.log(c);
