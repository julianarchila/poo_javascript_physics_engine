import { Vector } from "../utils/vector";
import Style from "./style";

class Line {
  start: Vector;
  end: Vector;

  style: Style = new Style();

  constructor(start: Vector, end: Vector) {
    this.start = start;
    this.end = end;
  }

  lengthSquared() {
    let dx = this.end.x - this.start.x;
    let dy = this.end.y - this.start.y;

    return dx * dx + dy * dy;
  }
}

export default Line;
