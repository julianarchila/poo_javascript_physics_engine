import Rigidbody from "../rigidBody/RigidBody";
import { Vector } from "../utils/vector";
import ForceGenerator from "./ForceGenerator";

class Gravity implements ForceGenerator{
    gravity: Vector;
    constructor(force: Vector){
        this.gravity = force;
    }

    updateForce(body: Rigidbody, dt: number): void {
        body.addForce(this.gravity.multiply(body.mass));
    }
}
export default Gravity