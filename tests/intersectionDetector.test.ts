import { Line, AABB, Box2D } from "../src/primitives";
import IntersectionDetector from "../src/rigidBody/IntersectionDetector";
import { Vector } from "../src/utils/vector";

test("PointOnLine::: endpoints", () => {
  let line = new Line(new Vector(0, 0), new Vector(1, 1));
  let pointa = new Vector(0, 0);
  let r1 = IntersectionDetector.PointOnLine(pointa, line);
  expect(r1).toBe(true);

  let pointb = new Vector(1, 1);
  let r2 = IntersectionDetector.PointOnLine(pointb, line);
  expect(r2).toBe(true);
});

test("pointOnLine::: Vertical Line", () => {
  let line = new Line(new Vector(0, 0), new Vector(0, 4));
  let point = new Vector(0, 2);

  let r = IntersectionDetector.PointOnLine(point, line);
  expect(r).toBe(true);
});

test("pointOnLine::: Horizontal Line", () => {
  let line = new Line(new Vector(0, 0), new Vector(4, 0));
  let point = new Vector(2, 0);

  let r = IntersectionDetector.PointOnLine(point, line);
  expect(r).toBe(true);
});

test("lindeAndAABB::: line inside AABB", () => {
  let line = new Line(new Vector(0, 0), new Vector(1, 1));
  let aabb = new AABB(new Vector(0, 0), new Vector(2, 2));

  let r = IntersectionDetector.lineAndAABB(line, aabb);
  expect(r).toBe(true);
});

test("lindeAndAABB::: line outside AABB", () => {
  let line = new Line(new Vector(0, 1), new Vector(1, 4));
  let aabb = new AABB(new Vector(1, 1), new Vector(3, 3));

  let r = IntersectionDetector.lineAndAABB(line, aabb);
  expect(r).toBe(false);
});

test("lindeAndAABB::: line intersects AABB", () => {
  let line = new Line(new Vector(0, 1), new Vector(2, 2));
  let aabb = new AABB(new Vector(1, 1), new Vector(3, 3));

  let r = IntersectionDetector.lineAndAABB(line, aabb);
  expect(r).toBe(true);
});

test("lindeAndAABB::: line intersects AABB", () => {
  let line = new Line(new Vector(4, 4), new Vector(3.1, 3.1));
  let aabb = new AABB(new Vector(1, 1), new Vector(3, 3));

  let r = IntersectionDetector.lineAndAABB(line, aabb);
  expect(r).toBe(false);
});

// Line and box2D intersection tests

test("lineAndBox2D::: line inside box2D", () => {
  let line = new Line(new Vector(0, 0), new Vector(1, 1));
  let box2D = new Box2D(new Vector(0, 0), new Vector(2, 2));
  box2D.rigidBody.rotation = 30;

  let r = IntersectionDetector.lineAndBox2D(line, box2D);
  expect(r).toBe(true);
});
