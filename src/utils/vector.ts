export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static unitVectorFromDirection(direction: number): Vector {
    return new Vector(Math.cos(direction), Math.sin(direction));
  }

  getMagnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  setMagnitude(magnitude: number) {
    let direction = this.getDirection();
    this.x = Math.cos(direction) * magnitude;
    this.y = Math.sin(direction) * magnitude;
  }

  normalize() {
    let magnitude = this.getMagnitude();
    this.x /= magnitude;
    this.y /= magnitude;
  }

  add(v2: Vector): Vector {
    return new Vector(this.x + v2.x, this.y + v2.y);
  }

  addTo(v2: Vector) {
    this.x += v2.x;
    this.y += v2.y;
  }

  subtract(v2: Vector): Vector {
    return new Vector(this.x - v2.x, this.y - v2.y);
  }

  subtractFrom(v2: Vector) {}

  multiply(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  multiplyBy(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
  }

  divide(scalar: number): Vector {
    return new Vector(this.x / scalar, this.y / scalar);
  }

  divideBy(scalar: number) {
    this.x /= scalar;
    this.y /= scalar;
  }

  dotProduct(v2: Vector): number {
    return this.x * v2.x + this.y * v2.y;
  }

  crossProduct(v2: Vector): number {
    return this.x * v2.y - this.y * v2.x;
  }

  getDirection(): number {
    return Math.atan2(this.y, this.x);
  }

  setDirection(direction: number) {
    let magnitude = this.getMagnitude();
    this.x = Math.cos(direction) * magnitude;
    this.y = Math.sin(direction) * magnitude;
  }

  toArray(): number[] {
    return [this.x, this.y, this.getDirection(), this.getMagnitude()];
  }

  serialize(): any {
    return {
      x: this.x,
      y: this.y,
      direction: this.getDirection(),
      magnitude: this.getMagnitude(),
    };
  }
}
