import { AABB, Circle, Line, Box2D, Ray, regularPolygon } from "../primitives";

class Renderer {
  ctx: CanvasRenderingContext2D | null = null;
  id: string;
  elements: Array<Line | Circle | AABB | Box2D | Ray | regularPolygon> = [];
  constructor(height: number, width: number, element: HTMLElement) {
    this.id = "canvas" + Math.floor(Math.random() * 1000000);

    // create a new canvas, and append it to the element
    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;

    canvas.id = this.id;

    if (canvas.getContext) {
      this.ctx = canvas.getContext("2d");
    }

    element.appendChild(canvas);
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
      circle.position.x,
      circle.position.y,
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
    // TO-DO: implement
  }

  _displayBox2D(box2d: Box2D) {
    // TO-DO: implement
  }

  _displayRay(ray: Ray) {
    // TO-DO: implement
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
}

export default Renderer;
