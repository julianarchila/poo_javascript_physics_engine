class Style {
  color: string = "white";
  stroke_color: string = "black";
  stroke_width: number = 1;

  constructor(color?: string, stroke_color?: string, stroke_width?: number) {
    this.color = color || this.color;
    this.stroke_color = stroke_color || this.stroke_color;
    this.stroke_width = stroke_width || this.stroke_width;
  }

  static reset(style: Style | null) {
    if (style != null) {
      style.color = "white";
      style.stroke_color = "black";
      style.stroke_width = 1;
    }
  }

  serialize() {
    return {
      color: this.color,
      stroke_color: this.stroke_color,
      stroke_width: this.stroke_width,
    };
  }
}

export default Style;
