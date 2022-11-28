import ForceRegistry from "./forces/ForceRegistry";
import Rigidbody from "./rigidBody/RigidBody";
import { Vector } from "./utils/vector";
import Gravity from "./forces/Gravity";
class PhysicsSystem {
  forceRegistry: ForceRegistry;
  rigidbodies: Array<Rigidbody>;
  gravity: Gravity;
  fixedUpdate: number;
  constructor(fixedUpdateDt: number, gravity: Vector) {
    this.forceRegistry = new ForceRegistry();
    this.rigidbodies = [];
    this.gravity = new Gravity(gravity);
    this.fixedUpdate = fixedUpdateDt;
  }
  fixedUpdater() {
    this.forceRegistry.updateForces(this.fixedUpdate);
    for (let i = 0; this.rigidbodies.length; i++) {
      this.rigidbodies[i].physicsUpdate(this.fixedUpdate);
    }
  }
  update(dt: number) {
    this.fixedUpdater();
  }
  addRigidbody(body: Rigidbody) {
    this.rigidbodies.push(body);
    this.forceRegistry.add(body, this.gravity);
  }
}

export default PhysicsSystem;
