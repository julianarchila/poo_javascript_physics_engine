import Style from "./style";

class regularPolygon {
  length: number;
  sides: number;
  y: number;
  x: number;

  style = new Style();

  constructor(sides: number, length: number, x: number, y: number) {
    this.sides = sides;
    // this.name = name;
    this.length = length;
    this.x = x;
    this.y = y;
  }

  isPointInPath() {}
}

export default regularPolygon;
