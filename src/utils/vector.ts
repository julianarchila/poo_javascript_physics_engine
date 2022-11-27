import { isThisTypeNode } from "typescript";

export class Vector {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
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

  subtractFrom(v2: Vector) {
    this.x -= v2.x;
    this.y -= v2.y;
  }

  multiply(scalar: number): Vector {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  multiplyBy(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
  }

  multiplyByVector(v2: Vector) {
    this.x *= v2.x;
    this.y *= v2.y;
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

  Squaring(): number {
    return this.x * this.x + this.y * this.y;
  }

  toArray(): number[] {
    return [this.x, this.y, this.getDirection(), this.getMagnitude()];
  }

  rotate(angleDeg: number, origin: Vector = new Vector()) {
    let x = this.x - origin.x;
    let y = this.y - origin.y;

    let angleRad = angleDeg * (Math.PI / 180);

    this.x = x * Math.cos(angleRad) - y * Math.sin(angleRad) + origin.x;
    this.y = x * Math.sin(angleRad) + y * Math.cos(angleRad) + origin.y;
  }

  serialize(): any {
    return {
      x: this.x,
      y: this.y,
      direction: this.getDirection(),
      magnitude: this.getMagnitude(),
    };
  }
  zero(){
    this.x = 0.0;
    this.y = 0.0;
  }
}
