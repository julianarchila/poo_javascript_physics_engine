import Rigidbody from "../rigidBody/RigidBody";

interface ForceGenerator{
    updateForce(body: Rigidbody, dt: number):void;
    }
    

export default ForceGenerator;