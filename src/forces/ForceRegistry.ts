import ForceRegistration from "./ForceRegistration";
import Rigidbody from "../rigidBody/RigidBody";
import ForceGenerator from "./ForceGenerator";
class ForceRegistry{
    registry: Array<ForceRegistration>;
    constructor(){
        this.registry = []
    }
    add(rb: Rigidbody, fg : ForceGenerator){
        let fr  = new ForceRegistration(fg,rb);
        this.registry.push(fr);
      }

    remove(rb: Rigidbody,fg: ForceGenerator){
        let fr  = new ForceRegistration(fg,rb);
        let index = this.registry.indexOf(fr);
        this.registry.splice(index,1);
    }
    clear(){
        this.registry =[]
    }
    updateForces(dt:number){
        this.registry.forEach(function (fr: ForceRegistration){
            fr.fg.updateForce(fr.rb,dt);
        }) 

    }
    zeroForces(){
        this.registry.forEach(function (fr:ForceRegistration){
            //fr.rb.zeroForces(); implementar
        })
    }
}
export default ForceRegistry