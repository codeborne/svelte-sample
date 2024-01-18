<script>
  import Logo from 'src/layout/Logo.svelte'
  import {emailLegalText} from 'src/prototyping/emails/mockEmails'
  import {Link} from 'svelte-navigator'

  export let linkRoute
  export let title
  export let callToAction
  export let fallBackMessage
</script>

<html lang="et">
<body class="bg-white">

<!--
Use svelte-mail or similar tool to render e-mails to bullet proof markup
https://github.com/ls-age/svelte-mail
-->

<div class="bg-primary-100">
  <div class="max-w-[480px] mx-auto p-6">
    <Logo />
  </div>
</div>

<div class="max-w-[480px] mx-auto">

  <div class="bg-white p-6 border-x border-b border-gray-100 dark:border-gray-800">

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
              class="btn primary solid lg w-full !rounded-full">
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

</body>
</html>
