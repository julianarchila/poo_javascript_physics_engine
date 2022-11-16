class regularPolygon {
  constructor(sides,length, x, y, name,ctx) {
    this.sides = sides
    this.name = name;
    this.length = length;
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  display() {
    this.name = new Path2D();
    const apothem = (Math.PI * 2) / this.sides;
    for (let i = 0; i < this.sides+1; i++) {
      this.name.lineTo(
        this.x + this.length * Math.cos(apothem * i),
        this.y + this.length * Math.sin(apothem * i)
      );
      // this.vertex.push(this.x,this.y);  Agregar si se necesitan todos los vertices de la figura
    }
    this.ctx.fillStyle = "rgba(46,142,222,1)";
    this.ctx.fill(this.name);
    this.ctx.stroke(this.name);
  }
}

export default regularPolygon;
