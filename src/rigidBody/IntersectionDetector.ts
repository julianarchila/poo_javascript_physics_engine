import { Vector } from "../utils/vector";
import { AABB, regularPolygon, Circle, Line, Box2D } from "../primitives";
const IntersectionDetector = {
  PointOnLine(point: Vector, line: Line): boolean {
    let dy = line.end.y - line.start.y;
    let dx = line.end.x - line.start.x;

    if (dx == 0) {
      // return JMath.compare(point.x, line.getStart().x);
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

  //Fix this:
  /*
   lineAndAABB(line: Line, aabb: AABB) {
    if (
      this.pointInAABB(line.start, aabb) ||
      this.pointInAABB(line.end, aabb)
    ) {
      return true;
    }

    // let unitVector = new Vector2f(line.getEnd()).sub(line.getStart());
    let unitVector = line.end.subtract(line.start);
    unitVector.normalize(); //Implementar normalize
    unitVector.x = unitVector.x != 0 ? 1 / unitVector.x : 0;
    unitVector.y = unitVector.y != 0 ? 1 / unitVector.y : 0;

    let min = aabb.getMin();
    min.subtract(line.start).mul(unitVector);
    let max = aabb.getMax();
    max.subtract(line.start).mul(unitVector);

    let tmin = Math.max(Math.min(min.x, max.x), Math.min(min.y, max.y));
    let tmax = Math.min(Math.max(min.x, max.x), Math.max(min.y, max.y));

    if (tmax < 0 || tmin > tmax) {
      return false;
    }

    let t = twin < 0 ? tmax : tmin;
    return t > 0 && t * t < line.Squaring();
  } */

  lineAndBox2D(line: Line, box2D: Box2D) {
    //Implementar
  },

  //Crear clase Ray2D y RaycastResult para el raycasting
  //Raycast
  // FIX THIS

  /* 
  RaycastCircle(circle: Circle, Ray2D: any, result: any) {
    RayCastResult.reset(result); // reset es un método de RayCastResult;

    // let originToCircle = new Vector2f(circle.getCenter()).sub(
    //   Ray2D.getOrigin()
    // );
    let originToCircle = circle.getCenter().subtract(Ray2D.getOrigin());
    // let radiusSquared = circle.getRadius() * circle.getRadius();
    let radiusSquared = circle.radius * circle.radius;
    // let originToCircleSquared = originToCircle.Squared();
    let originToCircleSquared = originToCircle.Squaring();

    let a = originToCircle.dotProduct(Ray2D.getDirection());
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
      // let point = new Vector2f(Ray2D.getOrigin()).add(
      //   new Vector2f(Ray2D.getDirection()).mul(t)
      // );
      let point = Ray2D.getOrigin().add(Ray2D.getDirection().multiply(t));
      // let normal = new Vector2f(point).sub(circle.getCenter());
      let normal = point.subtract(circle.getCenter());
      normal.normalize();

      result.init(point, normal, true); //Init es un método de RayCastResult
    }

    return true;
  } */

  // FIX THIS

  /*
  RaycastAABB(aabb: AABB, Ray2D: any, result: any) {
    RayCastResult.reset(result);

    let unitVector = Ray2D.getDirection();
    unitVector.normalize(); //Implementar normalize
    unitVector.x = unitVector.x != 0 ? 1 / unitVector.x : 0;
    unitVector.y = unitVector.y != 0 ? 1 / unitVector.y : 0;

    let min = aabb.getMin();
    min.subtract(Ray2D.getOrigin()).mul(unitVector);
    // let max = new Vector2f(aabb.getMax());
    let max = aabb.getMax();
    max.sub(Ray2D.getOrigin()).mul(unitVector);

    let tmin = Math.max(Math.min(min.x, max.x), Math.min(min.y, max.y));
    let tmax = Math.min(Math.max(min.x, max.x), Math.max(min.y, max.y));

    if (tmax < 0 || tmin > tmax) {
      return false;
    }

    let t = twin < 0 ? tmax : tmin;
    let hit = t > 0;
    if (!hit) {
      return false;
    }

    if (result != null) {
      // let point = new Vector2f(Ray2D.getOrigin()).add(
      //   new Vector2f(Ray2D.getDirection()).mul(t)
      // );
      let point = Ray2D.getOrigin().add(Ray2D.getDirection().multiply(t));
      // let normal = new Vector2f(Ray2D.getOrigin()).sub(point);
      let normal = Ray2D.getOrigin().subtract(point);
      normal.normalize();

      result.init(point, normal, true);
    }

    return true;
  }
  */

  RaycastBox2D(box: Box2D, Ray2D: any, result: any) {
    //Implementar
  },
};

export default IntersectionDetector;
