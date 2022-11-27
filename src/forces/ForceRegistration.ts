import Rigidbody from "../rigidBody/RigidBody";
import ForceGenerator from "../forces/ForceGenerator";
class ForceRegistration{
    fg : ForceGenerator;
    rb : Rigidbody;
    constructor(fg: ForceGenerator, rb: Rigidbody) {
        this.fg = fg;
        this.rb = rb;
      }
}
export default ForceRegistration;