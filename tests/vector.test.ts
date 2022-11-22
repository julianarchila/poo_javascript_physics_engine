import { Vector } from "../src/utils/vector";

test("Vector unitVectorFromDirection", () => {
  let vector = Vector.unitVectorFromDirection(0);
  expect(vector.x).toBe(1);
  expect(vector.y).toBe(0);
});

test("Vector getMagnitude", () => {
  let vector = new Vector(3, 4);
  expect(vector.getMagnitude()).toBe(5);
});
