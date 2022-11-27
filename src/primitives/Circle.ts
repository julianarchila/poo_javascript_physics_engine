import { Vector } from "../utils/vector";
import Style from "./style";
class Circle {
  radius: number;
  position: Vector;
  style: Style = new Style();

  constructor(radius: number, position: Vector) {
    this.radius = radius;
    this.position = position;
  }

  getCenter(): Vector {
    return this.position;
  }
}

export default Circle;
