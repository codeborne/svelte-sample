<script lang="ts">
  import SampleSection from 'src/layout/SampleSection.svelte'

  const colorPalettes = [
    {
      name: 'Primary',
      shades: ['bg-primary-50', 'bg-primary-100', 'bg-primary-200', 'bg-primary-300', 'bg-primary-400', 'bg-primary-500', 'bg-primary-600', 'bg-primary-700', 'bg-primary-800', 'bg-primary-900', 'bg-primary-950'],
    },
    {
      name: 'Secondary',
      shades: ['bg-secondary-50', 'bg-secondary-100', 'bg-secondary-200', 'bg-secondary-300', 'bg-secondary-400', 'bg-secondary-500', 'bg-secondary-600', 'bg-secondary-700', 'bg-secondary-800', 'bg-secondary-900', 'bg-secondary-950'],
    },
    {
      name: 'Success',
      shades: ['bg-success-50', 'bg-success-100', 'bg-success-200', 'bg-success-300', 'bg-success-400', 'bg-success-500', 'bg-success-600', 'bg-success-700', 'bg-success-800', 'bg-success-900', 'bg-success-950'],
    },
    {
      name: 'Warning',
      shades: ['bg-warning-50', 'bg-warning-100', 'bg-warning-200', 'bg-warning-300', 'bg-warning-400', 'bg-warning-500', 'bg-warning-600', 'bg-warning-700', 'bg-warning-800', 'bg-warning-900', 'bg-warning-950'],
    },
    {
      name: 'Danger',
      shades: ['bg-danger-50', 'bg-danger-100', 'bg-danger-200', 'bg-danger-300', 'bg-danger-400', 'bg-danger-500', 'bg-danger-600', 'bg-danger-700', 'bg-danger-800', 'bg-danger-900', 'bg-danger-950'],
    },
  ]

  // Hex values kept in sync with global.css — used for WCAG contrast calculations
  const contrastPairs = [
    { name: 'Primary',   solid: { bg: '#2563eb', text: '#ffffff' }, soft: { bg: '#dbeafe', text: '#1e40af' } },
    { name: 'Secondary', solid: { bg: '#4b5563', text: '#ffffff' }, soft: { bg: '#f3f4f6', text: '#1f2937' } },
    { name: 'Success',   solid: { bg: '#059669', text: '#ffffff' }, soft: { bg: '#d1fae5', text: '#065f46' } },
    { name: 'Warning',   solid: { bg: '#d97706', text: '#ffffff' }, soft: { bg: '#fef3c7', text: '#92400e' } },
    { name: 'Danger',    solid: { bg: '#dc2626', text: '#ffffff' }, soft: { bg: '#fee2e2', text: '#991b1b' } },
  ]

  function linearize(c: number): number {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }

  function luminance(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b)
  }

  function contrastRatio(hex1: string, hex2: string): number {
    const l1 = luminance(hex1)
    const l2 = luminance(hex2)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100
  }

  function wcagBadge(ratio: number): { label: string; color: string } {
    if (ratio >= 7)   return { label: 'AAA', color: '#166534' }
    if (ratio >= 4.5) return { label: 'AA',  color: '#1d4ed8' }
    if (ratio >= 3)   return { label: 'AA Large', color: '#b45309' }
    return               { label: 'Fail', color: '#991b1b' }
  }
</script>

<SampleSection title="Usage"
               description="Colors are defined as semantic palettes rather than raw hues. Instead of referencing Tailwind's built-in colors directly (e.g. blue-500), use intent-based names: primary, secondary, success, warning, and danger. This makes the entire app rethemeable by changing values in one place (global.css) without touching any component code.">
</SampleSection>

<SampleSection title="Palettes">
  <p class="text-sm text-muted-foreground">Each palette provides 11 shades (50–950). Light shades (50–200) suit backgrounds and tints; mid shades (400–600) work for interactive elements; dark shades (700–950) are for text on light backgrounds.</p>
  {#each colorPalettes as palette}
    <div>
      <h6 class="mb-2">{palette.name}</h6>
      <div class="flex flex-wrap gap-2">
        {#each palette.shades as className}
          {@const shade = parseInt(className.split('-').pop() || '0')}
          {@const isDark = shade >= 600}
          <div class="inline-flex justify-center items-center w-20 h-20 rounded shadow-sm {className}">
            <div class="text-xs font-medium {isDark ? 'text-white' : 'text-gray-900 opacity-70'}">{shade}</div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</SampleSection>

<SampleSection title="Contrast & Accessibility">
  <p class="text-sm text-muted-foreground">
    WCAG 2.1 requires a contrast ratio of at least <strong>4.5:1</strong> for normal text (AA) and <strong>7:1</strong> for enhanced (AAA).
    For large text (18pt+ or 14pt bold) the AA threshold is <strong>3:1</strong>.
    The two most common pairings used in this project are the <em>solid</em> style (white text on the -600 shade)
    and the <em>soft</em> style (-800 text on the -100 shade).
  </p>

  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="text-left text-muted-foreground border-b">
          <th class="pb-2 pr-4 font-medium">Color</th>
          <th class="pb-2 pr-4 font-medium">Solid — white on -600</th>
          <th class="pb-2 pr-4 font-medium">Ratio</th>
          <th class="pb-2 pr-6 font-medium">Rating</th>
          <th class="pb-2 pr-4 font-medium">Soft — -800 on -100</th>
          <th class="pb-2 pr-4 font-medium">Ratio</th>
          <th class="pb-2 font-medium">Rating</th>
        </tr>
      </thead>
      <tbody>
        {#each contrastPairs as pair}
          {@const solidRatio = contrastRatio(pair.solid.bg, pair.solid.text)}
          {@const softRatio  = contrastRatio(pair.soft.bg,  pair.soft.text)}
          {@const solidBadge = wcagBadge(solidRatio)}
          {@const softBadge  = wcagBadge(softRatio)}
          <tr class="border-b last:border-0">
            <td class="py-3 pr-4 font-medium">{pair.name}</td>
            <td class="py-3 pr-4">
              <span class="px-3 py-1 rounded text-sm font-medium" style="background:{pair.solid.bg}; color:{pair.solid.text}">
                Sample text
              </span>
            </td>
            <td class="py-3 pr-4 tabular-nums">{solidRatio}:1</td>
            <td class="py-3 pr-6">
              <span class="px-2 py-0.5 rounded text-white text-xs font-semibold" style="background:{solidBadge.color}">{solidBadge.label}</span>
            </td>
            <td class="py-3 pr-4">
              <span class="px-3 py-1 rounded text-sm font-medium" style="background:{pair.soft.bg}; color:{pair.soft.text}">
                Sample text
              </span>
            </td>
            <td class="py-3 pr-4 tabular-nums">{softRatio}:1</td>
            <td class="py-3">
              <span class="px-2 py-0.5 rounded text-white text-xs font-semibold" style="background:{softBadge.color}">{softBadge.label}</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</SampleSection>
