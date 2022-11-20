import { Vector } from "../utils/vector";
import { AABB, regularPolygon, Circle, Line } from "../primitives/index";
class IntersectionDetector {
  constructor() {}

  pointInLine(point: Vector, line: Line) {}

  pointInCircle(point: Vector, circle: Circle) {}

  pointInAABB(point: Array<number>, aabb: Circle) {}
  // pointInBox2d(point:Array<number>, box2d:) {}
  lineAndCircle(line: Line, circle: Circle) {}
  lineAndAABB(line: Line, aabb: AABB) {}
  // ...
}

export default IntersectionDetector;
