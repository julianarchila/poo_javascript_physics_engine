class Line {
  constructor(start_x,start_y,end_x,end_y,ctx) {
    this.start_x = start_x;
    this.start_y = start_y;
    this.end_x = end_x;
    this.end_y = end_y;
    this.name = new Path2D();
    this.ctx = ctx;

  }
  display() {
    this.name.moveTo(this.start_x, this.start_y);
    this.name.lineTo(this.end_x, this.end_y);
    this.ctx.lineWidth = 5;
    this.ctx.stroke(this.name)


  }
}

export default Line;
