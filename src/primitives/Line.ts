import { Vector } from "../utils/vector";

class Line {
  start: Vector;
  end: Vector;
  // path: Path2D;
  ctx: any;

  constructor(start: Vector, end: Vector, ctx: any) {
    this.start = start;
    this.end = end;
    // this.path = new Path2D();
    // this.ctx = ctx;
  }

  // display() {
  //   this.path.moveTo(this.start.x, this.start.y);
  //   this.path.lineTo(this.end.x, this.end.y);
  //   this.ctx.strokeStyle = "white";
  //   this.ctx.lineWidth = 5;
  //   this.ctx.stroke(this.path);
  // }
}

export default Line;
