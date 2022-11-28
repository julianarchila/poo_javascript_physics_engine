import { AABB, Circle, Line, Box2D, Ray, regularPolygon } from "../primitives";
import { Vector } from "../utils/vector";

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
    // ray has a position and a direction
    // we need to draw a line from the position to the direction until it hits the edge of the canvas
    // draw a a little arrow at the end of the line

    // get the canvas dimensions
    let width = this.canvas!.width;
    let height = this.canvas!.height;

    // get the position and direction of the ray
    let position: Vector = ray.origin;
    let direction: Vector = ray.direction;

    // get the slope of the ray
    let slope = direction.y / direction.x;

    // get the y-intercept of the ray
    let y_intercept = position.y - slope * position.x;

    // get the x-intercept of the ray
    let x_intercept = position.x - position.y / slope;

    // get the x and y values of the end of the ray
    let x = 0;
    let y = 0;

    // if the ray is going up
    if (direction.y > 0) {
      // if the ray is going right
      if (direction.x > 0) {
        // if the ray hits the top first
        if (slope * width + y_intercept < height) {
          x = width;
          y = slope * width + y_intercept;
        } else {
          x = (height - y_intercept) / slope;
          y = height;
        }
      } else {
        // if the ray hits the top first
        if (slope * 0 + y_intercept < height) {
          x = 0;
          y = slope * 0 + y_intercept;
        } else {
          x = (height - y_intercept) / slope;
          y = height;
        }
      }
    }

    // if the ray is going down
    if (direction.y < 0) {
      // if the ray is going right
      if (direction.x > 0) {
        // if the ray hits the bottom first
        if (slope * width + y_intercept > 0) {
          x = width;
          y = slope * width + y_intercept;
        } else {
          x = -y_intercept / slope;
          y = 0;
        }
      } else {
        // if the ray hits the bottom first
        if (slope * 0 + y_intercept > 0) {
          x = 0;
          y = slope * 0 + y_intercept;
        } else {
          x = -y_intercept / slope;
          y = 0;
        }
      }
    }

    // draw the line
    let path = new Path2D();
    path.moveTo(position.x, position.y);
    path.lineTo(x, y);

    this.ctx!.strokeStyle = ray.style.color;
    this.ctx!.lineWidth = ray.style.stroke_width;

    this.ctx!.stroke(path);

    // draw the arrow
    let arrow = new Path2D();
    arrow.moveTo(x, y);
    arrow.lineTo(x - 10, y - 10);
    arrow.lineTo(x - 10, y + 10);
    arrow.lineTo(x, y);

    this.ctx!.fillStyle = ray.style.color;
    this.ctx!.fill(arrow);

    this.ctx!.lineWidth = ray.style.stroke_width;
    this.ctx!.strokeStyle = ray.style.stroke_color;
    this.ctx!.stroke(arrow);
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
