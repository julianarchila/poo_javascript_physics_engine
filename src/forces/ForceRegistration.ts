import Rigidbody from "../rigidBody/RigidBody";
import ForceGenerator from "../forces/ForceGenerator";
class ForceRegistration{
    fg : ForceGenerator = new ForceGenerator();
    rb : Rigidbody = new Rigidbody();
    constructor(fg: ForceGenerator, rb: Rigidbody) {
        this.fg = fg;
        this.rb = rb;
      }

}
export default ForceRegistry;