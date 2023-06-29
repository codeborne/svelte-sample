<script lang="ts">
  import {Circle, Line} from 'src/graphical/graphics'

  export let radius = 50.0
  export let width = 10.0
  export let angle = 90.0
  export let offset: number = 0
  export let color: string


  function ring(radius: number, width: any) {
    const innerRadius = radius - width
    return `M 0 ${-radius}
A ${radius} ${radius} 0 1 0 0 ${radius}
A ${radius} ${radius} 0 1 0 0 ${-radius}
Z
M 0 ${-innerRadius}
A ${innerRadius} ${innerRadius} 0 1 1 0 ${innerRadius}
A ${innerRadius} ${innerRadius} 0 1 1 0 ${-innerRadius}
Z`
  }

  function sector(radius: number, width: any) {
    const innerRadius = radius - width
    const cornerRadius = width / 3
    const p = points(radius, width)
    const large = a(p[4]) - a(p[5]) > 180 ? 1 : 0

    return `M ${p[0].x} ${p[0].y}
  A ${radius} ${radius} 0 ${large} 0 ${p[1].x} ${p[1].y}
  A ${cornerRadius} ${cornerRadius} 0 0 0 ${p[2].x} ${p[2].y}
  L ${p[3].x} ${p[3].y}
  A ${cornerRadius} ${cornerRadius} 0 0 0 ${p[4].x} ${p[4].y}
  A ${innerRadius} ${innerRadius} 0  ${large} 1 ${p[5].x} ${p[5].y}
  A ${cornerRadius} ${cornerRadius} 0 0 0 ${p[6].x} ${p[6].y}
  L ${p[7].x} ${p[7].y}
  A ${cornerRadius} ${cornerRadius} 0 0 0 ${p[0].x} ${p[0].y}
  `
  }

  function points(radius: number, width: any): DOMPoint[] {
    const innerRadius = radius - width
    const cornerRadius = Math.min(width / 3, (angle / 180 * Math.PI * innerRadius / 3))
    const p1 = new DOMPoint(0, radius)
    const p4 = new DOMPoint(0, innerRadius)
    const rM = new DOMMatrix().rotate(-angle)
    const m = new DOMMatrix().translate(cornerRadius, 0)

    const l2 = new Line(m.transformPoint(new DOMPoint(0, 0)), m.transformPoint(p1))

    const c1 = new Circle(new DOMPoint(0.0, 0.0), radius)
    const c2 = new Circle(new DOMPoint(0.0, 0.0), innerRadius)

    const a1 = c2.intersection(l2).filter(p => l2.betweenPoints(p)).first()
    console.log(a(a1) > angle / 2 ? 'Recalculate radius' : 'OK')

    const a3 = new DOMPoint(0, innerRadius + cornerRadius)
    const a4 = new DOMPoint(0, radius - cornerRadius)
    const a5 = c1.intersection(l2).filter(p => l2.betweenPoints(p)).first()
    const a6 = rM.transformPoint(new DOMPoint(-a5.x, a5.y))
    const a7 = rM.transformPoint(new DOMPoint(p1.x, p1.y - cornerRadius))
    const a8 = rM.transformPoint(new DOMPoint(p4.x, p4.y + cornerRadius))
    const a9 = rM.transformPoint(new DOMPoint(-a1.x, a1.y))
    return [a5, a6, a7, a8, a9, a1, a3, a4,]
  }

  $: d = angle >= 360.0 ? ring(radius, width) : sector(radius, width)

  function a(p: DOMPoint): number {
    return ((Math.PI * 2 + Math.atan2(p.x, p.y)) % (Math.PI * 2)) / Math.PI * 180
  }

</script>
<g transform="rotate({-offset})">
  <path {d} fill={color} stroke="none"></path>
</g>
