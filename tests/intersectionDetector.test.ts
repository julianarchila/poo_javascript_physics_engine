import { Line } from "../src/primitives";
import IntersectionDetector from "../src/rigidBody/IntersectionDetector";
import { Vector } from "../src/utils/vector";

test("PointOnLine::: endpoints", () => {
  let line = new Line(new Vector(0, 0), new Vector(1, 1), null);
  let pointa = new Vector(0, 0);
  let r1 = IntersectionDetector.PointOnLine(pointa, line);
  expect(r1).toBe(true);

  let pointb = new Vector(1, 1);
  let r2 = IntersectionDetector.PointOnLine(pointb, line);
  expect(r2).toBe(true);
});

test("pointOnLine::: Vertical Line", () => {
  let fakeContext = {
    stroke: jest.fn(),
  };

  let line = new Line(new Vector(0, 0), new Vector(0, 4), fakeContext);
  let point = new Vector(0, 2);

  let r = IntersectionDetector.PointOnLine(point, line);
  expect(r).toBe(true);
});

test("pointOnLine::: Horizontal Line", () => {
  let fakeContext = {
    stroke: jest.fn(),
  };

  let line = new Line(new Vector(0, 0), new Vector(4, 0), fakeContext);
  let point = new Vector(2, 0);

  let r = IntersectionDetector.PointOnLine(point, line);
  expect(r).toBe(true);
});
