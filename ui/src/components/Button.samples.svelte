<script lang="ts">
  import Button from 'src/components/Button.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  const sizes = ['lg', '', 'sm', 'xs'] as const
  const colors = ['primary', 'secondary', 'danger', 'warning', 'success'] as const
  const variants = ['solid', 'soft', 'outlined', 'ghost'] as const

  let isLoading = $state(false)
</script>

<SampleSection title="Usage"
               description="Use with props like color, size, variant, and icon. Buttons support loading states, custom click handlers, and can be circular for icon-only displays. Use the label prop or slot content for button text.">
</SampleSection>

<SampleSection title="Sizes and variants">
  <div class="common-grid sm:grid-cols-4">
    {#each sizes as size}
      <div class="flex flex-col gap-6">
        <h4>Size {size || 'default'}</h4>
        {#each colors as color}
          <div class="grid gap-2">
            {#each variants as variant}
              <Button label="{color} {variant}" {color} {size} {variant}/>
            {/each}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</SampleSection>

<SampleSection title="Icons and loading states">
  <div class="common-grid sm:grid-cols-4">
    {#each sizes as size}
      <div class="flex flex-col gap-6">
        <Button label="With icon" {size} icon="link-external"/>
        <Button label="Loading" {size} loading/>
        <Button
          {size}
          icon="chevron-right"
          onclick={() => (isLoading = !isLoading)}
          loading={isLoading}
        >
          {#if isLoading}
            Loading
          {:else}
            Click to load
          {/if}
        </Button>

        <div>
          <Button {size} icon="copy" title="Icon only"/>
        </div>

        <div class="flex gap-2">
          {#each variants as variant}
            <Button icon="x" {size} {variant} circular title="Circular"/>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</SampleSection>
