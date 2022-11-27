import { Vector } from "../utils/vector";
import Style from "./style";

class Ray {
  origin: Vector;
  direction: Vector;

  style: Style = new Style();

  constructor(origin: Vector, direction: Vector) {
    this.origin = origin;
    this.direction = direction;
    this.direction.normalize();
  }
}

export default Ray;
