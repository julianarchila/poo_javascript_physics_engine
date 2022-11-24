import { Vector } from "../utils/vector";

class RayCastResult {
  point: Vector;
  normal: Vector;
  hit: boolean;
  t: number;

  constructor() {
    this.point = new Vector();
    this.normal = new Vector();
    this.hit = false;
    this.t = -1;
  }

  init(point: Vector, normal: Vector, hit: boolean, t: number) {
    this.point = point;
    this.normal = normal;
    this.hit = hit;
    this.t = t;
  }

  static reset(result: RayCastResult | null) {
    if (result != null) {
      result.init(new Vector(), new Vector(), false, -1);
    }
  }
}

export default RayCastResult;
