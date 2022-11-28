import Rigidbody from "../rigidBody/RigidBody";
import { Vector } from "../utils/vector";
import Style from "./style";
class Circle {
  radius: number;
  style: Style = new Style();

  rigidBody: Rigidbody = new Rigidbody();

  constructor(radius: number, position: Vector) {
    this.radius = radius;
    this.rigidBody.position = position;
  }

  getCenter(): Vector {
    return this.rigidBody.position;
  }
}

export default Circle;
