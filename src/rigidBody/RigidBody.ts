import { Vector } from "../utils/vector";

class Rigidbody {
  position: Vector = new Vector();
  rotation: number = 0.0;
  linearVelocity : Vector = new Vector();
  angularVelocity : number = 0.0;
  linearDamping : number = 0.0;
  angularDamping : number = 0.0;
  fixedRotation : boolean = false;
  getPosition(){
   return this.position;
  }
  setTransform(position: Vector, rotation : number){
    this.position = position;
    this.rotation = rotation;

  }
  getRotaion(){
    return this.rotation;
  }
}

export default Rigidbody;
