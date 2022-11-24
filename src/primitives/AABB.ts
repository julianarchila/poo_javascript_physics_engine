import Rigidbody from "../rigidBody/RigidBody";
import { Vector } from "../utils/vector";

// Axis Aligned Bounding Box
class AABB {
  center: Vector;
  size: Vector;
  rigidBody: Rigidbody = new Rigidbody();

  constructor(min: Vector, max: Vector) {
    this.size = max.subtract(min);
    this.center = min.add(this.size.divide(2));
    this.rigidBody.position = this.center;
  }

  getMin(): Vector {
    return this.rigidBody.position.subtract(this.size.divide(2));
  }

  getMax(): Vector {
    return this.rigidBody.position.add(this.size.divide(2));
  }

  display() {}
}

export default AABB;
