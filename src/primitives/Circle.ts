import { Vector } from "../utils/vector";
class Circle {
  radius: number;
  position: Vector;
  ctx: CanvasRenderingContext2D;
  path: Path2D;

  constructor(radius: number, position: Vector, ctx: CanvasRenderingContext2D) {
    this.radius = radius;
    this.position = position;
    this.ctx = ctx;
    this.path = new Path2D();
  }
  display() {
    this.path.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = "rgba(241,91,96,1)";
    this.ctx.fill(this.path);
    this.ctx.lineWidth = 1;
    this.ctx.stroke(this.path);
  }
}

export default Circle;
