import { Vector } from "../utils/vector";

class Rigidbody {
  position: Vector = new Vector();
  rotation: number = 0.0;
  linearVelocity: Vector = new Vector();
  angularVelocity: number = 0.0;
  linearDamping: number = 0.0;
  angularDamping: number = 0.0;
  fixedRotation: boolean = false;
  mass: number = 0.0;
  inverseMass: number = 0.0;
  forceAccum: Vector = new Vector();
  setTransform(position: Vector, rotation: number) {
    this.position = position;
    this.rotation = rotation;
  }
  setMass(mass: number) {
    this.mass = mass;
    if (this.mass != 0.0) {
      this.inverseMass = 1.0 / this.mass;
    }
  }
  physicsUpdate(dt: number) {
    if (this.mass == 0.0) return;
    let acceleration = this.forceAccum.multiply(this.inverseMass);
    this.linearVelocity = this.linearVelocity.add(acceleration.multiply(dt));
    this.position = this.position.add(this.linearVelocity.multiply(dt));
    this.clearAccumulators();
  }
  clearAccumulators() {
    this.forceAccum.zero();
  }
  addForce(force: Vector) {
    this.forceAccum = this.forceAccum.add(force);
  }
}

export default Rigidbody;
