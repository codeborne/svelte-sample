<script lang="ts">
  import type { ComponentProps } from "svelte";
  import Badge from 'src/components/Badge.svelte'
  import Button from 'src/components/Button.svelte'


  type BadgeSize = ComponentProps<typeof Badge>["size"];

  const sizes: BadgeSize[] = ["xs", "sm", "", "lg"];
</script>

<div class="space-y-6">
  <h4 class="text-xl font-semibold">Regular badge</h4>

  {#each sizes as size}
    <div class="flex flex-col space-y-2">
      <h5 class="text-xs uppercase">Size {size || "default"}</h5>
      <div class="space-x-1">
        <Badge {size}>Primary</Badge>
        <Badge color="primary" {size}>Primary</Badge>
        <Badge color="success" {size}>Success</Badge>
        <Badge color="warning" {size}>Warning</Badge>
        <Badge color="danger" {size}>Danger</Badge>
      </div>
    </div>
  {/each}

  <h4 class="text-xl font-semibold">Badge with icon</h4>

  <p>
    Badge can have icons to better illustrate its meaning, when the content might not be descriptive enough.
    The icons can also improve intuitiveness especially with poor contrast situations or for people with color
    blindness.
  </p>

  {#each sizes as size}
    <div class="flex flex-col space-y-2">
      <h5 class="text-xs uppercase">Size {size || "default"}</h5>
      <div class="space-x-1">
        <Badge {size} icon="user">John Doe</Badge>
        <Badge {size} icon="check" color="success">Completed</Badge>
        <Badge {size} class="flex-row-reverse" icon="x">Icon in the end</Badge>
      </div>
    </div>
  {/each}

  <h4 class="text-xl font-semibold">Numeric badge</h4>

  {#each sizes as size}
    <div class="flex flex-col space-y-2">
      <h5 class="text-xs uppercase">Size {size || "default"}</h5>
      <div class="flex items-center space-x-2">
        <Button color="secondary" {size} class="gap-1">
          <span class="text-nowrap">In a button</span>
          <Badge variant="numeric" {size}>1</Badge>
        </Button>
        <Button color="secondary" {size} class="gap-1">
          <span class="text-nowrap">In a button</span>
          <Badge variant="numeric" color="warning" {size}>28</Badge>
        </Button>
        <Button color="secondary" {size} class="gap-1">
          <span class="text-nowrap">In a button</span>
          <Badge variant="numeric" color="success" {size}>888</Badge>
        </Button>
        <Button icon="notifications" {size} color="primary" class="circular relative">
          <Badge variant="numeric" color="danger" class="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3" {size}
          >8</Badge
          >
        </Button>
      </div>
    </div>
  {/each}
</div>
