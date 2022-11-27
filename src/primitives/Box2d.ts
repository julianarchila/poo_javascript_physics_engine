import Rigidbody from "../rigidBody/RigidBody";
import { Vector } from "../utils/vector";

class Box2D {
  size: Vector = new Vector();
  halfSize: Vector = new Vector();
  rigidBody: Rigidbody = new Rigidbody();

  constructor(min: Vector, max: Vector) {
    this.size = max.subtract(min);
    this.halfSize = this.size.divide(2);
    this.rigidBody.position = min.add(this.halfSize);
  }

  getMin(): Vector {
    return this.rigidBody.position.subtract(this.halfSize);
  }

  getMax(): Vector {
    return this.rigidBody.position.add(this.halfSize);
  }

  getVertices(): Vector[] {
    let vertices: Vector[] = [];
    let min = this.getMin();
    let max = this.getMax();

    vertices.push(min);
    vertices.push(new Vector(min.x, max.y));
    vertices.push(max);
    vertices.push(new Vector(max.x, min.y));

    if (this.rigidBody.rotation != 0) {
      let center = this.rigidBody.position;
      for (let i = 0; i < vertices.length; i++) {
        vertices[i] = vertices[i].subtract(center);
        vertices[i].rotate(this.rigidBody.rotation);
        vertices[i] = vertices[i].add(center);
      }
    }
    return vertices;
  }
  setSize(size: Vector){
    this.size = size;
    this.halfSize.x = size.x/2;
    this.halfSize.y = size.y/2;
  }
}

export default Box2D;
