import { Vector } from "../utils/vector";
import {
  AABB,
  regularPolygon,
  Circle,
  Line,
  Box2D,
  Ray,
  RayCastResult,
} from "../primitives";

const IntersectionDetector = {
  PointOnLine(point: Vector, line: Line): boolean {
    let dy = line.end.y - line.start.y;
    let dx = line.end.x - line.start.x;

    if (dx == 0) {
      return point.x == line.start.x;
    }

    let m = dy / dx;

    let b = line.end.y - m * line.end.x;

    return point.y == m * point.x + b;
  },

  pointInCircle(point: Vector, circle: Circle): boolean {
    let circleCenter = circle.getCenter();
    // let centerToPoint = new Vector2f(point).sub(circleCenter);
    let centerToPoint = point.subtract(circleCenter);

    return centerToPoint.Squaring() <= circle.radius * circle.radius; //crear método Squaring para elevar al cuadrado
  },

  pointInAABB(point: Vector, aabb: AABB) {
    let min = aabb.getMin();
    let max = aabb.getMax();

    return (
      point.x <= max.x &&
      min.x <= point.x &&
      point.y <= max.y &&
      min.y <= point.y
    );
  },
  pointInBox2D(point: Vector, box2D: Box2D): boolean {
    //Implementar
    let pointCopy = new Vector(point.x, point.y);
    let boxCenter = box2D.rigidBody.position;
    let boxRotation = box2D.rigidBody.rotation;

    pointCopy.rotate(boxRotation, boxCenter);

    let min = box2D.getMin();
    let max = box2D.getMax();

    return (
      pointCopy.x <= max.x &&
      min.x <= pointCopy.x &&
      pointCopy.y <= max.y &&
      min.y <= pointCopy.y
    );
  },

  lineAndCircle(line: Line, circle: Circle): boolean {
    if (
      this.pointInCircle(line.start, circle) ||
      this.pointInCircle(line.end, circle)
    ) {
      return true;
    }

    // let ab = new Vector2f(line.getEnd()).sub(line.getStart()); //Implementar .sub
    let ab = line.end.subtract(line.start);
    let circleCenter = circle.getCenter();
    // let centerToLineStart = new Vector2f(circleCenter).sub(line.getStart());
    let centerToLineStart = circleCenter.subtract(line.start);
    let t = centerToLineStart.dotProduct(ab) / ab.dotProduct(ab); //Implementar .dot dot(vector){ return x * vector.x + y * vector.y}

    if (t < 0 || t > 1) {
      return false;
    }

    // let closestPoint = new Vector2f(line.getStart()).add(ab.mul(t)); //Implementar add y mul => suma y multiplicación de vectores
    let closestPoint = line.start.add(ab.multiply(t));

    return this.pointInCircle(closestPoint, circle);
  },

  CircleAndLine(circle: Circle, line: Line): boolean {
    return this.lineAndCircle(line, circle);
  },

  CircleAndCircle(c1: Circle, c2: Circle): boolean {
    // let vecBetweenCenters = new Vector2f(C1.getCenter()).sub(c2.getCenter());
    let vecBetweenCenters = c1.getCenter().subtract(c2.getCenter());
    // let radiSum = c1.getRadius() + c2.getRadius();
    let radiSum = c1.radius + c2.radius;

    return vecBetweenCenters.Squaring() <= radiSum * radiSum;
  },

  CircleAndAABB(circle: Circle, AABB: AABB): boolean {
    let min = AABB.getMin();
    let max = AABB.getMax();

    // let closestPointToCircle = new Vector2f(circle.getCenter());
    let closestPointToCircle = circle.getCenter();
    if (closestPointToCircle.x < min.x) {
      closestPointToCircle.x = min.x;
    } else if (closestPointToCircle.x > max.x) {
      closestPointToCircle.x = max.x;
    }

    if (closestPointToCircle.y < min.y) {
      closestPointToCircle.y = min.y;
    } else if (closestPointToCircle.y > max.y) {
      closestPointToCircle.y = max.y;
    }

    // let circleToAABB = new Vector2f(circle.getCenter()).sub(
    let circleToAABB = circle.getCenter().subtract(closestPointToCircle);
    // return circleToAABB.Squared() <= circle.getRadius() * circle.getRadius();
    return circleToAABB.Squaring() <= circle.radius * circle.radius;
  },

  AABBAndCircle(box: AABB, circle: Circle): boolean {
    return this.CircleAndAABB(circle, box);
  },

  CircleAndBox2D(circle: Circle, Box2D: Box2D) {
    //Implementar
  },

  AABBAndAABB(b1: AABB, b2: AABB) {
    //Implementar
  },

  AABBAndBox2D(AABB: AABB, b: Box2D) {
    //Implementar
  },

  lineAndAABB(line: Line, aabb: AABB) {
    if (
      this.pointInAABB(line.start, aabb) ||
      this.pointInAABB(line.end, aabb)
    ) {
      return true;
    }

    let unitVector = line.end.subtract(line.start);
    unitVector.normalize();
    unitVector.x = unitVector.x != 0 ? 1 / unitVector.x : 0;
    unitVector.y = unitVector.y != 0 ? 1 / unitVector.y : 0;

    let min = aabb.getMin();
    min.subtractFrom(line.start);
    min.multiplyByVector(unitVector);

    let max = aabb.getMax();
    max.subtractFrom(line.start);
    max.multiplyByVector(unitVector);

    let tmin = Math.max(Math.min(min.x, max.x), Math.min(min.y, max.y));
    let tmax = Math.min(Math.max(min.x, max.x), Math.max(min.y, max.y));

    if (tmax < 0 || tmin > tmax) {
      return false;
    }

    let t = tmin < 0 ? tmax : tmin;
    return t > 0 && t * t < line.lengthSquared();
  },

  lineAndBox2D(line: Line, box2D: Box2D) {
    //Implementar
    let angle = -box2D.rigidBody.rotation;
    let boxCenter = box2D.rigidBody.position;

    let lineStartCopy = new Vector(line.start.x, line.start.y);

    lineStartCopy.rotate(angle, boxCenter);

    let lineEndCopy = new Vector(line.end.x, line.end.y);
    lineEndCopy.rotate(angle, boxCenter);

    let lineCopy = new Line(lineStartCopy, lineEndCopy);

    let aabb = new AABB(box2D.getMin(), box2D.getMax());

    return this.lineAndAABB(lineCopy, aabb);
  },

  //Raycast

  RaycastCircle(circle: Circle, ray: Ray, result: RayCastResult | null) {
    RayCastResult.reset(result);

    let originToCircle = circle.getCenter().subtract(ray.origin);
    let radiusSquared = circle.radius * circle.radius;
    let originToCircleSquared = originToCircle.Squaring();

    let a = originToCircle.dotProduct(ray.direction);
    let bSq = originToCircleSquared - a * a;
    if (radiusSquared - bSq < 0) {
      return false;
    }
    let f = Math.sqrt(radiusSquared - bSq);
    let t = 0;

    if (originToCircleSquared < radiusSquared) {
      t = a + f;
    } else {
      t = a - f;
    }

    if (result != null) {
      let point = ray.origin.add(ray.direction.multiply(t));
      let normal = point.subtract(circle.getCenter());
      normal.normalize();

      result.init(point, normal, true, t);
    }

    return true;
  },

  RaycastAABB(aabb: AABB, ray: Ray, result: RayCastResult | null) {
    RayCastResult.reset(result);

    let unitVector = ray.direction;
    unitVector.normalize(); //Implementar normalize
    unitVector.x = unitVector.x != 0 ? 1 / unitVector.x : 0;
    unitVector.y = unitVector.y != 0 ? 1 / unitVector.y : 0;

    let min = aabb.getMin();

    min.subtractFrom(ray.origin);
    min.multiplyByVector(unitVector);

    let max = aabb.getMax();

    max.subtractFrom(ray.origin);
    max.multiplyByVector(unitVector);

    let tmin = Math.max(Math.min(min.x, max.x), Math.min(min.y, max.y));
    let tmax = Math.min(Math.max(min.x, max.x), Math.max(min.y, max.y));

    if (tmax < 0 || tmin > tmax) {
      return false;
    }

    let t = tmin < 0 ? tmax : tmin;
    let hit = t > 0;
    if (!hit) {
      return false;
    }

    if (result != null) {
      let point = ray.origin.add(ray.direction.multiply(t));
      let normal = ray.origin.subtract(point);
      normal.normalize();

      result.init(point, normal, true, t);
    }

    return true;
  },

  RaycastBox2D(box: Box2D, ray: Ray, result: RayCastResult | null) {
    RayCastResult.reset(result);

    let size = box.halfSize;
    let xAxis = new Vector(1, 0);
    let yAxis = new Vector(0, 1);

    xAxis.rotate(-box.rigidBody.rotation); // rotate the axis around (0,0)
    yAxis.rotate(-box.rigidBody.rotation);

    let p = box.rigidBody.position.subtract(ray.origin);

    let f = new Vector(
      xAxis.dotProduct(ray.direction),
      yAxis.dotProduct(ray.direction)
    );

    let e = new Vector(xAxis.dotProduct(p), yAxis.dotProduct(p));

    let tArr = [0, 0, 0, 0];

    for (let i = 0; i < 2; i++) {
      if (Math.abs(f.get(i)) > 0.00001) {
        if (-e.get(i) - size.get(i) > 0 || -e.get(i) + size.get(i) < 0) {
          return false;
        }

        f.setComponent(i, 0.00001);
      }

      tArr[i * 2 + 0] = (e.get(i) + size.get(i)) / f.get(i);
      tArr[i * 2 + 1] = (e.get(i) - size.get(i)) / f.get(i);
    }

    let tmin = Math.max(Math.min(tArr[0], tArr[1]), Math.min(tArr[2], tArr[3]));
    let tmax = Math.min(Math.max(tArr[0], tArr[1]), Math.max(tArr[2], tArr[3]));

    let t = tmin < 0 ? tmax : tmin;
    let hit = t > 0;
    if (!hit) {
      return false;
    }

    if (result != null) {
      let point = ray.origin.add(ray.direction.multiply(t));
      let normal = ray.origin.subtract(point);

      normal.normalize();

      result.init(point, normal, true, t);
    }
  },
};

export default IntersectionDetector;
