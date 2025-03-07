<script lang="ts">
  export let topic: string = ''
  export let title: string = ''
</script>

<div class="slide @container">
  <div class="slide-contents">
    <div>
      {#if topic}<div class="text-sm opacity-60">{topic}</div>{/if}
      <h1>{title}</h1>
    </div>
    <slot/>
  </div>


  {#if $$slots.example}
    <div class="examples">
      <slot name="example"/>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "../../global.css";

  .slide {
    @apply grid border aspect-video;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 'contents examples';
  }

  .slide-contents {
    grid-area: contents;
  }

  .examples {
    @apply bg-orange-50;
    grid-area: examples;
  }


  .slide-contents,
  .examples {
    @apply p-8 @lg:p-12 space-y-4 @lg:space-y-8;
  }

  .slide :global(h1) {
    @apply font-semibold
    @sm:text-2xl @md:text-3xl @lg:text-5xl;
  }

  .slide :global(p),
  .slide :global(li) {
    @apply leading-snug
    @sm:text-sm @md:text-lg @lg:text-xl @xl:text-2xl;
  }

  .slide :global(ul) {
    @apply list-disc;
  }

  .slide :global(ul li) {
    @apply ml-4;
  }

</style>
