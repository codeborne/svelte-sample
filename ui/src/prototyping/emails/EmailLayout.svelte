<script lang="ts">
  import Logo from 'src/layout/Logo.svelte'
  import {emailLegalText} from 'src/prototyping/emails/mockEmails'
  import Link from 'src/components/Link.svelte'

  export let linkRoute: string
  export let title: string
  export let callToAction: string
  export let fallBackMessage: string | undefined
</script>

<!--
Use svelte-mail or similar tool to render e-mails to bullet proof markup
https://github.com/ls-age/svelte-mail
-->

<div class="max-w-[480px] mx-auto p-6">
  <Logo />
</div>

<div class="max-w-[480px] mx-auto">

  <div class="p-6 border">

    {#if title}
      <h1 class="text-xl mb-3">
        {title}
      </h1>
    {/if}

    <div class="mb-5">
      <slot/>
    </div>

    <div>
      {#if callToAction}
        <Link to={linkRoute ? linkRoute : '#'}
              class="btn primary solid lg w-full rounded-full!">
          {callToAction}
        </Link>
      {/if}
      {#if fallBackMessage}
        <div style="margin-top: 12px; font-size: 13px; color: #512b2b;">{@html fallBackMessage}</div>
      {/if}
    </div>

  </div>

  <div class="text-xs text-muted p-6">
    {emailLegalText}
  </div>
</div>
