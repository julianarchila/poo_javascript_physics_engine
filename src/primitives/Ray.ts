import { Vector } from "../utils/vector";

class Ray {
  origin: Vector;
  direction: Vector;

  constructor(origin: Vector, direction: Vector) {
    this.origin = origin;
    this.direction = direction;
    this.direction.normalize();
  }
}

export default Ray;
