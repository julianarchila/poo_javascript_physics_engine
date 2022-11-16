class Box2d {
  //rectangulo equilatero
  constructor(length, x, y, name) {
    this.name = name;
    this.length = length;
    this.x = x;
    this.y = y;
  }

  display() {
    this.name = new Path2D();
    const apothem = (Math.PI * 2) / 4;
    for (let i = 0; i < 5; i++) {
      this.name.lineTo(
        this.x + this.length * Math.cos(apothem * i),
        this.y + this.length * Math.sin(apothem * i)
      );
      // this.vertex.push(this.x,this.y);  Agregar si se necesitan todos los vertices de la figura
    }
    ctx.fillStyle = "rgba(46,142,222,1)";
    ctx.fill(this.name);
    ctx.stroke(this.name);
  }
}

export default Box2d;
