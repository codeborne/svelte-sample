export interface Graphics {
  color: string,
  offset: number
  angle: number
}

export class Circle {
  center: DOMPoint
  r: number

  constructor(center: DOMPoint, r: number) {
    this.center = center
    this.r = r
  }

  get x() {
    return this.center.x
  }

  get y() {
    return this.center.y
  }


  relative(absoluteLine: Line): Line {
    const m = new DOMMatrix().translate(-this.center.x, -this.center.y)
    return new Line(m.transformPoint(absoluteLine.a), m.transformPoint(absoluteLine.b))
  }

  absolute(relativeLine: Line): Line {
    const m = new DOMMatrix().translate(this.center.x, this.center.y)
    return new Line(m.transformPoint(relativeLine.a), m.transformPoint(relativeLine.b))
  }


  discriminant(dr: number, D: number): number {
    return Math.pow(this.r, 2.0) * Math.pow(dr, 2.0) - Math.pow(D, 2.0)
  }

  intersection(l: Line): DOMPoint[] {
    const sgn = (a: number): number => a < 0 ? -1 : 1
    const relativeLine = this.relative(l)
    const {D, dx, dy, dr} = relativeLine
    const desc = this.discriminant(dr, D)
    if (desc < 0) return []
    const dr2 = Math.pow(dr, 2.0)
    const lengthD = Math.sqrt(desc)
    const x1 = (D * dy + sgn(dy) * dx * lengthD) / dr2
    const y1 = (-D * dx + Math.abs(dy) * lengthD) / dr2

    const x2 = (D * dy - sgn(dy) * dx * lengthD) / dr2
    const y2 = (-D * dx - Math.abs(dy) * lengthD) / dr2
    const {a, b} = this.absolute(new Line(new DOMPoint(x1, y1), new DOMPoint(x2, y2)))
    if (desc === 0) return [a]
    return [a, b]
  }

  circleIntersection(c2: Circle) {
    let dx = c2.x - this.x
    let dy = c2.y - this.y
    const d = Math.sqrt(dx * dx + dy * dy)
    // Circles too far apart
    if (d > this.r + c2.r) {
      return []
    }
    // One circle completely inside the other
    if (d < Math.abs(this.r - c2.r)) {
      return []
    }
    dx /= d
    dy /= d
    const a = (this.r * this.r - c2.r * c2.r + d * d) / (2 * d)
    const px = this.x + a * dx
    const py = this.y + a * dy
    const h = Math.sqrt(this.r * this.r - a * a)
    const pA = new DOMPoint(px + h * dy, py - h * dx)
    if (d === this.r + c2.r) {
      return [pA]
    }
    const pB = new DOMPoint(px - h * dy, py + h * dx)
    return [pA, pB]
  }
}

export class Line {
  a: DOMPoint
  b: DOMPoint

  constructor(a: DOMPoint, b: DOMPoint) {
    this.a = a
    this.b = b
  }

  get dx(): number {
    return this.b.x - this.a.x
  }

  get dy(): number {
    return this.b.y - this.a.y
  }

  get dr(): number {
    return Math.sqrt(Math.pow(this.dx, 2.0) + Math.pow(this.dy, 2.0))
  }

  get D(): number {
    return this.a.x * this.b.y - this.b.x * this.a.y
  }

  betweenPoints(p: DOMPoint): boolean {
    return p.x >= Math.min(this.a.x, this.b.x) && p.x <= Math.max(this.a.x, this.b.x)
    && p.y >= Math.min(this.a.y, this.b.y) && p.y <= Math.max(this.a.y, this.b.y)
  }
}
