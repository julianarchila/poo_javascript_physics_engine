export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  //   static unitVectorFromDirection(direction: number): Vector {}

  //   static fromPolar(length: number, angle: number): Vector {}

  getMagnitude(): number {
    return 1;
  }

  setMagnitude(magnitude: number) {}

  normalize() {}

  add(v2: Vector): Vector {
    return new Vector(0, 0);
  }

  addTo(v2: Vector) {}

  subtract(v2: Vector): Vector {
    return new Vector(0, 0);
  }

  subtractFrom(v2: Vector) {}

  multiply(scalar: number): Vector {
    return new Vector(0, 0);
  }

  multiplyBy(scalar: number) {}

  //   divide(scalar: number): Vector {}

  //   divideBy(scalar: number) {}

  dotProduct(v2: Vector): number {
    return 0;
  }

  crossProduct(v2: Vector): number {
    return 0;
  }

  //   getDirection(): number {
  //     // return Math.atan2(this.y, this.x);
  //   }

  setDirection(direction: number) {
    let magnitude = this.getMagnitude();
    this.x = Math.cos(direction) * magnitude;
    this.y = Math.sin(direction) * magnitude;
  }

  //   toArray(): number[] {
  //     return [this.x, this.y, this.getDirection(), this.getMagnitude()];
  //   }

  toObject(): any {
    return {};
  }
}
