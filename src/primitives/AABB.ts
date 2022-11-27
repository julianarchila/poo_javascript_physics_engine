import Rigidbody from "../rigidBody/RigidBody";
import { Vector } from "../utils/vector";
import Style from "./style";

// Axis Aligned Bounding Box
class AABB {
  center: Vector;
  size: Vector;
  halfSize: Vector = new Vector();
  rigidBody: Rigidbody = new Rigidbody();

  style: Style = new Style();

  constructor(min: Vector, max: Vector) {
    this.size = max.subtract(min);
    this.center = min.add(this.size.divide(2));
    this.rigidBody.position = this.center;
    this.halfSize = this.size.divide(2);
  }

  getMin(): Vector {
    return this.rigidBody.position.subtract(this.size.divide(2));
  }

  getMax(): Vector {
    return this.rigidBody.position.add(this.size.divide(2));
  }
  setSize(size: Vector) {
    this.size = size;
    this.halfSize.x = size.x / 2;
    this.halfSize.y = size.y / 2;
  }
}

export default AABB;
