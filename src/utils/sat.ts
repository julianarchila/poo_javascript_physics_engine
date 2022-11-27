import { AABB, Box2D } from "../primitives";
import { Vector } from "./vector";

function getInterval(rect: AABB | Box2D, axis: Vector) {
  let result = new Vector(0, 0);

  let min = rect.getMin();
  let max = rect.getMax();

  let vertices: Array<Vector>;

  if (rect instanceof Box2D) {
    vertices = rect.getVertices();
  } else {
    vertices = [min, new Vector(max.x, min.y), max, new Vector(min.x, max.y)];
  }

  result.x = vertices[0].dotProduct(axis);
  result.y = result.x;

  for (let i = 0; i < vertices.length; i++) {
    let dot = vertices[i].dotProduct(axis);
    if (dot < result.x) {
      result.x = dot;
    }
    if (dot > result.y) {
      result.y = dot;
    }
  }

  return result;
}

function overlapOnAxis(b1: AABB | Box2D, b2: AABB | Box2D, axis: Vector) {
  let interval1 = getInterval(b1, axis);
  let interval2 = getInterval(b2, axis);

  if (interval1.x < interval2.x) {
    return interval1.y >= interval2.x;
  } else {
    return interval2.y >= interval1.x;
  }
}

export { overlapOnAxis, getInterval };
