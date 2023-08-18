export const samples = Object.entries(import.meta.glob('src/**/*.samples.svelte', {eager: true}))
  .map(([p, f]) => [p.replace('/src/', '').replace('.samples.svelte', ''), f])
  .toObject()
