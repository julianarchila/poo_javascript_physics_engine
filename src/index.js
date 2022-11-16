import { AABB, Box2d, Circle, Line } from "./primitives";
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

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
