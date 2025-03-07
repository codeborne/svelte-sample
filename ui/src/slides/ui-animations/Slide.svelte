<script lang="ts">
  export let topic: string = ''
  export let title: string = ''
</script>

<div class="grid border aspect-video
            [grid-template-columns:1fr_minmax(1fr,0)]
            [grid-template-rows:1fr]
            [grid-template-areas:'contents_examples']
">
  <div class="[grid-area:contents] space-y-4 p-10">
    <div>
      {#if topic}<div class="text-sm opacity-60">{topic}</div>{/if}
      <h1 class="text-2xl">{title}</h1>
    </div>
    <slot/>
  </div>


  {#if $$slots.example}
    <div class="bg-orange-50 p-10
            [grid-area:examples]">
      <slot name="example"/>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../global.css";

</style>
