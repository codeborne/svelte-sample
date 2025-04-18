<script lang="ts">
  import Icon from 'src/icons/Icon.svelte'
  import type {HTMLButtonAttributes} from 'svelte/elements'
  import type {Snippet} from 'svelte'

  const {
    icon = '',
    size = '',
    variant = 'solid',
    color = 'secondary',
    label = '',
    children,
    type = 'button',
    ...restProps
  }: {
    icon?: string
    size?: 'xs'|'sm'|''|'lg'
    variant?: 'solid'|'soft'|'outlined'|'ghost'
    color?: 'primary'|'secondary'|'warning'|'success'|'danger'
    label?: string,
    children?: Snippet;
  } & HTMLButtonAttributes = $props()

  const hasLabel = $derived(label || children)
</script>

<button {type} {...restProps} class="btn {size} {color} {variant} {icon ? 'inline-flex items-center' : ''} {restProps.class }" class:icon-only={icon && !hasLabel}>
  {#if icon}
    <Icon name={icon} {size} strokeWidth={size === 'xs' ? '2.5' : '2'}/>
  {/if}
  {#if hasLabel}
    <span class:ml-2={icon}>
      {#if children}
        {@render children()}
      {:else}
        {label}
      {/if}
    </span>
  {/if}
</button>

<style lang="postcss" global>
  @reference "./../global.css";

  .btn {
    @apply border border-transparent rounded-md text-center inline-flex
    focus:outline-hidden focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 justify-center py-2 px-4 text-sm font-medium;
  }

  .btn.primary.solid {
    @apply text-white hover:text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500/75;
  }

  .btn.primary.soft {
    @apply text-primary-800 bg-primary-100 hover:bg-primary-200 focus:ring-primary-200/75;
  }

  .btn.primary.outlined {
    @apply border-primary-500 text-primary-500 hover:border-primary-400 hover:text-primary-400;
  }

  .btn.primary.ghost {
    @apply text-primary-500 hover:bg-primary-100 hover:text-primary-800;
  }

  .btn.secondary.solid {
    @apply text-white hover:text-white bg-secondary-600 hover:bg-secondary-700 focus:ring-secondary-50/75;
  }

  .btn.secondary.soft {
    @apply text-secondary-800 bg-secondary-100 hover:bg-secondary-200 focus:ring-secondary-200/75;
  }

  .btn.secondary.outlined {
    @apply border-secondary-500 text-secondary-500 hover:border-secondary-400 hover:text-secondary-400;
  }

  .btn.secondary.ghost {
    @apply text-secondary-500 hover:bg-secondary-100 hover:text-secondary-800;
  }

  .btn.danger.solid {
    @apply text-white hover:text-white bg-danger-600 hover:bg-danger-700 focus:ring-danger-500/75;
  }

  .btn.danger.soft {
    @apply text-danger-800 bg-danger-100 hover:bg-danger-200 focus:ring-danger-200/75;
  }

  .btn.danger.outlined {
    @apply border-danger-500 text-danger-500 hover:border-danger-400 hover:text-danger-400;
  }

  .btn.danger.ghost {
    @apply text-danger-500 hover:bg-danger-100 hover:text-danger-800;
  }

  .btn.warning.solid {
    @apply text-white hover:text-white bg-warning-600 hover:bg-warning-700 focus:ring-warning-500/75;
  }

  .btn.warning.soft {
    @apply text-warning-800 bg-warning-100 hover:bg-warning-200 focus:ring-warning-200/75;
  }

  .btn.warning.outlined {
    @apply border-warning-500 text-warning-500 hover:border-warning-400 hover:text-warning-400;
  }

  .btn.warning.ghost {
    @apply text-warning-500 hover:bg-warning-100 hover:text-warning-800;
  }

  .btn.success.solid {
    @apply text-white hover:text-white bg-success-600 hover:bg-success-700 focus:ring-success-500/75;
  }

  .btn.success.soft {
    @apply text-success-800 bg-success-100 hover:bg-success-200 focus:ring-success-200/75;
  }

  .btn.success.outlined {
    @apply border-success-500 text-success-500 hover:border-success-400 hover:text-success-400;
  }

  .btn.success.ghost {
    @apply text-success-500 hover:bg-success-100 hover:text-success-800;
  }

  .btn.xs {
    @apply py-1 px-2 text-xs;
  }

  .btn.sm {
    @apply py-1.5 px-3;
  }

  .btn.lg {
    @apply py-3 px-4 font-semibold text-base;
  }

  .btn.icon-only {
    @apply px-2;
  }

  .btn.icon-only.sm {
    @apply px-1.5;
  }
</style>
