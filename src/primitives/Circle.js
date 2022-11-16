class Circle {
  constructor(radius,x,y,ctx) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.path = new Path2D();

  }
  display() {
    this.path.arc(this.x,this.y,this.radius,0,2*Math.PI);
    this.ctx.fillStyle = "rgba(241,91,96,1)";
    this.ctx.fill(this.path);
    this.ctx.lineWidth = 1;
    this.ctx.stroke(this.path)
  }
}

export default Circle;
