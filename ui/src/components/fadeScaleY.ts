export default function fadeScaleY(
  node: Element, {delay = 0, duration = 200, easing = (x: number) => x, baseScale = 0}
) {
  const o = +getComputedStyle(node).opacity
  const m = getComputedStyle(node).transform.match(/scaleY\(([0-9.]+)\)/)
  const s = m ? parseFloat(m[1]) : 1
  const is = 1 - baseScale

  return {
    delay,
    duration,
    css: (t: number) => {
      const eased = easing(t)
      return `opacity: ${eased * o}; transform: scaleY(${(eased * s * is) + baseScale})`
    }
  }
}
