<script lang="ts">
  import Card from 'src/components/Card.svelte'

  const sizes = ['xs', 'sm', 'md', 'lg'] as const
  let text = "Science fiction is any idea that occurs in the head and doesn't exist yet, but soon will, and will change everything for everybody, and nothing will ever be the same again. As soon as you have an idea that changes some small part of the world you are writing science fiction. It is always the art of the possible, never the impossible."

</script>

<h4>Cards</h4>
{#each sizes as size}
<Card title="Card title" {size}>
  {text}
</Card>
  {/each}


<h4 class="mt-4">Cards split to 2 columns</h4>
{#each sizes as size}
<Card title="Card title" {size} split>
  {text}
</Card>
  {/each}
