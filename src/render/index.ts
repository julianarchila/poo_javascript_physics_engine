import {
  AABB,
  Circle,
  Line,
  Box2D,
  Ray,
  regularPolygon,
  RayCastResult,
} from "../primitives";
import { Vector } from "../utils/vector";
import IntersectionDetector from "../rigidBody/IntersectionDetector";

class Renderer {
  ctx: CanvasRenderingContext2D | null = null;
  id: string;
  canvas: HTMLCanvasElement | null = null;
  elements: Array<Line | Circle | AABB | Box2D | Ray | regularPolygon> = [];
  constructor(height: number, width: number, element: HTMLElement) {
    this.id = "canvas" + Math.floor(Math.random() * 1000000);

    // create a new canvas, and append it to the element
    this.canvas = document.createElement("canvas");
    this.canvas.height = height;
    this.canvas.width = width;

    this.canvas.id = this.id;

    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }

    element.appendChild(this.canvas);
  }

  addElement(element: Line | Circle | AABB | Box2D | Ray | regularPolygon) {
    this.elements.push(element);
  }

  _displayLine(line: Line) {
    let path = new Path2D();
    path.moveTo(line.start.x, line.start.y);
    path.lineTo(line.end.x, line.end.y);
    this.ctx!.strokeStyle = line.style.color;
    this.ctx!.lineWidth = line.style.stroke_width;

    this.ctx!.stroke(path);
  }

  _displayCircle(circle: Circle) {
    let path = new Path2D();
    path.arc(
      circle.getCenter().x,
      circle.getCenter().y,
      circle.radius,
      0,
      2 * Math.PI
    );

    this.ctx!.fillStyle = circle.style.color;
    this.ctx!.fill(path);

    this.ctx!.lineWidth = circle.style.stroke_width;
    this.ctx!.strokeStyle = circle.style.stroke_color;
    this.ctx!.stroke(path);
  }

  _displayAABB(aabb: AABB) {
    let path = new Path2D();
    let min = aabb.getMin();
    let max = aabb.getMax();

    path.moveTo(min.x, min.y);
    path.lineTo(max.x, min.y);
    path.lineTo(max.x, max.y);
    path.lineTo(min.x, max.y);
    path.lineTo(min.x, min.y);

    this.ctx!.fillStyle = aabb.style.color;
    this.ctx!.fill(path);

    this.ctx!.lineWidth = aabb.style.stroke_width;
    this.ctx!.strokeStyle = aabb.style.stroke_color;
    this.ctx!.stroke(path);
  }

  _displayBox2D(box2d: Box2D) {
    let path = new Path2D();
    let vertices = box2d.getVertices();

    path.moveTo(vertices[0].x, vertices[0].y);
    path.lineTo(vertices[1].x, vertices[1].y);
    path.lineTo(vertices[2].x, vertices[2].y);
    path.lineTo(vertices[3].x, vertices[3].y);
    path.lineTo(vertices[0].x, vertices[0].y);

    this.ctx!.fillStyle = box2d.style.color;
    this.ctx!.fill(path);

    this.ctx!.lineWidth = box2d.style.stroke_width;
    this.ctx!.strokeStyle = box2d.style.stroke_color;
    this.ctx!.stroke(path);
  }

  _displayRay(ray: Ray) {
    // draw the ray and iterate over the elements, if it colides with any, draw the intersection point and stop there

    let collisionPoints = [];

    for (let i = 0; i < this.elements.length; i++) {
      let element = this.elements[i];

      if (element instanceof Circle) {
        let result: RayCastResult = new RayCastResult();

        IntersectionDetector.RaycastCircle(element, ray, result);

        if (result.hit) {
          collisionPoints.push(result.point);
        }
      } else if (element instanceof AABB) {
        let result: RayCastResult = new RayCastResult();
        IntersectionDetector.RaycastAABB(element, ray, result);

        if (result.hit) {
          collisionPoints.push(result.point);
        }
      } else if (element instanceof Box2D) {
        let result: RayCastResult = new RayCastResult();
        IntersectionDetector.RaycastBox2D(element, ray, result);
        if (result.hit) {
          collisionPoints.push(result.point);
        }
      }
    }

    // find the closest point
    let closestPoint = ray.origin;
    let minDistance = Infinity;

    for (let i = 0; i < collisionPoints.length; i++) {
      let point = collisionPoints[i];
      let distance = Vector.distance(ray.origin, point);

      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    }

    // draw the ray until the closest point, if there is no closest point, draw it until the end of the canvas

    let path = new Path2D();
    path.moveTo(ray.origin.x, ray.origin.y);
    // path.lineTo(closestPoint.x, closestPoint.y);

    if (closestPoint.x === ray.origin.x && closestPoint.y === ray.origin.y) {
      // draw the ray until the end of the canvas
      let end = new Vector(
        ray.origin.x + ray.direction.x * 1000,
        ray.origin.y + ray.direction.y * 1000
      );
      path.lineTo(end.x, end.y);
    } else {
      path.lineTo(closestPoint.x, closestPoint.y);
    }

    this.ctx!.strokeStyle = ray.style.color;
    this.ctx!.lineWidth = ray.style.stroke_width;

    this.ctx!.stroke(path);

    // draw the intersection point
    let intersectionPath = new Path2D();
    intersectionPath.arc(closestPoint.x, closestPoint.y, 1, 0, 2 * Math.PI);
  }

  _displayRegularPolygon(rp: regularPolygon) {
    const apothem = (Math.PI * 2) / rp.sides;
    let path = new Path2D();
    for (let i = 0; i < rp.sides + 1; i++) {
      path.lineTo(
        rp.x + rp.length * Math.cos(apothem * i),
        rp.y + rp.length * Math.sin(apothem * i)
      );
      // this.vertex.push(this.x,this.y);  Agregar si se necesitan todos los vertices de la figura
    }
    this.ctx!.fillStyle = rp.style.color;
    this.ctx!.fill(path);
    this.ctx!.lineWidth = rp.style.stroke_width;
    this.ctx!.stroke(path);
  }

  display() {
    this.clear();
    this.elements.forEach((element) => {
      if (element instanceof Line) {
        this._displayLine(element);
      } else if (element instanceof Circle) {
        this._displayCircle(element);
      } else if (element instanceof AABB) {
        this._displayAABB(element);
      } else if (element instanceof Box2D) {
        this._displayBox2D(element);
      } else if (element instanceof Ray) {
        this._displayRay(element);
      } else if (element instanceof regularPolygon) {
        this._displayRegularPolygon(element);
      }
    });
  }

  clear() {
    this.ctx!.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
  }
}

export default Renderer;
