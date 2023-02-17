const icons = Object.entries(import.meta.glob('./*.svg', {eager: true, as: 'raw'})).map(([n, m]) => [n.replace('./', '').replace('.svg', ''), m]).toObject()
export default icons
