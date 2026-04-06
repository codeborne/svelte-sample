<script>
  import SampleSection from 'src/layout/SampleSection.svelte'
</script>

<SampleSection title="Headings" description="Often used with a dedicated Display font that is not the body font">
  <h1 class="font-display text-5xl font-semibold text-foreground">Heading 1 — The quick brown fox</h1>
  <h2 class="font-display text-4xl font-semibold text-foreground">Heading 2 — Jumps over the lazy dog</h2>
  <h3 class="font-display text-3xl font-medium text-foreground">Heading 3 — Pack my box with five</h3>
  <h4 class="font-display text-2xl font-medium text-foreground">Heading 4 — Dozen liquor jugs</h4>
  <h5 class="font-display text-xl text-foreground">Heading 5 — How vexingly quick</h5>
</SampleSection>

<SampleSection title="Body">
  <p class="font-body text-base text-foreground">Body — Regular paragraph text used throughout the app. Clean and
    highly readable at all sizes.</p>
  <p class="font-body text-sm text-muted-foreground">Small / Muted — Secondary text, descriptions, helper copy.</p>
  <p class="font-body text-xs uppercase tracking-[0.3em] text-primary">Label — Uppercase tracking for tags and
    labels.</p>
</SampleSection>

<SampleSection title="Links">
  <div class="flex flex-col gap-1">
    <div>
      <a href="/" class="text-link text-xs leading-none">Link - lg</a>
    </div>
    <div>
      <a href="/" class="text-link text-sm leading-none">Link</a>
    </div>
    <div>
      <a href="/" class="text-link leading-none">Link - sm</a>
    </div>
    <div>
      <a href="/" class="text-link text-lg  leading-none">Link - xs</a>
    </div>
  </div>
</SampleSection>

<SampleSection title="Font weights">
  <div class="font-normal">Normal</div>
  <div class="font-medium">Medium</div>
  <div class="font-semibold">Semibold</div>
  <div class="font-bold">Bold</div>
  <div class="font-extrabold">Extrabold</div>
</SampleSection>

<SampleSection title="Text colors">
  <div class="text-muted">Muted text - use for common text where you want some other text to stand out more</div>
</SampleSection>
