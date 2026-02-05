export default Object.entries(import.meta.glob('./*.svg', {eager: true, query: '?raw', import: 'default'}))
  .map(([n, m]) => [n.replace('./', '').replace('.svg', ''), m]).toObject()
