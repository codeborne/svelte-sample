<script lang="ts">
  import EmailLayout from '../emails/EmailLayout.svelte'
  import {mockEmails, mockEmailSender} from './mockEmails'
  import Link from 'src/components/Link.svelte'

  export let slug = ''

  $: selectedEmailSlug = slug ?? mockEmails[0].slug
  $: selectedEmail = mockEmails.find(x => x.slug === selectedEmailSlug)!
</script>

<div class="sm:h-screen bg-gray-50 p-6 md:py-20 md:px-20 w-full text-black relative">
  <div class="fixed inset-0 flex -z-0 from-gray-200 to-gray-100 bg-linear-to-bl"></div>
  <div
    class="relative min-w-0 flex-1 flex-wrap border-gray-100 xl:flex bg-white rounded-lg sm:overflow-hidden shadow-xl">
    <div class="col-span-12 bg-gray-50 py-3 px-4 w-full border-b border-gray-100 flex justify-between">
      <strong class="text-muted font-bold">System e-mails</strong>
      <div>
        <Link to="" class="text-xs text-link">Close</Link>
      </div>
    </div>

    <aside class="border-gray-100 sm:w-96 bg-gray-50 border-r">
      <nav class="divide-y divide-gray-100">
        {#each mockEmails as email}
          <Link to="emails/{email.slug}"
                class="{$$props.class} text-inherit hover:text-inherit group p-4 flex items-center text-sm  border-gray-100 {email.slug === slug ? 'bg-primary-50' : 'bg-white'}">
            <div class="w-full">
              <div class="flex items-center justify-between">
                <div>{mockEmailSender}</div>
                <div class="text-muted">13:46</div>
              </div>
              <div class="font-bold mt-1 text-inherit">{email.subject}</div>
            </div>
          </Link>
        {/each}
      </nav>
    </aside>

    {#if selectedEmail}
      <div class="lg:col-span-8  flex-1">
        <div class="bg-white border-gray-100 p-5 border-b">
          <div class="flex items-center justify-between">
            <div>{mockEmailSender}</div>
            <div class="text-muted">13:46</div>
          </div>
          <div class="font-bold text-lg text-inherit">{selectedEmail.subject}</div>
        </div>
        <div>

          <EmailLayout title={selectedEmail.title}
                       callToAction={selectedEmail.callToAction}
                       fallBackMessage={selectedEmail.fallbackMessage}
                       linkRoute={selectedEmail.linkRoute}>
            <!--{#if selectedEmail.message}{@html selectedEmail.message}{/if}-->
          </EmailLayout>
        </div>
      </div>
    {/if}
  </div>
</div>
