<script>
  import { Link, useParams } from 'svelte-navigator';
  import EmailLayout from '../emails/EmailLayout.svelte';
  import {mockEmails, mockEmailSender} from './mockEmails.ts'

  const params = useParams();

  $: selectedEmailSlug = $params.slug ? $params.slug : mockEmails[0].slug
  $: selectedEmail = mockEmails.find(x => x.slug === selectedEmailSlug)

  function getProps ({ isPartiallyCurrent }) {
    if (isPartiallyCurrent) {
      return {
        class: $$props.class + ' text-gray-800 hover:text-gray-800 bg-white group px-4 py-4 flex items-center text-sm  border-gray-100 dark:border-gray-800 ring-2 ring-inset ring-blue-600'
      };
    } else {
      return {
        class: $$props.class + 'text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-50-700 group px-4 py-4 flex items-center text-sm border-gray-100 dark:border-gray-800'
      }
    }
  }

</script>

<div class="sm:h-screen bg-gray-50 p-6 md:py-20 md:px-20 w-full text-black relative">
  <div class="fixed inset-0 flex -z-0 from-gray-200 to-gray-100 bg-gradient-to-bl"></div>
  <div
      class="relative min-w-0 flex-1 flex-wrap border-gray-100 dark:border-gray-800 xl:flex bg-white rounded-lg sm:overflow-hidden shadow-xl">
    <div class="col-span-12 bg-gray-50 py-3 px-4 w-full border-b border-gray-100 dark:border-gray-800 flex justify-between">
      <strong class="text-muted font-bold">System e-mails</strong>
      <div>
        <Link to="/" class="text-xs text-link">Close</Link>
      </div>
    </div>

    <aside class="border-gray-100 dark:border-gray-800 sm:w-96 bg-gray-50 border-r">
      <nav class="divide-y divide-gray-100">
        {#each mockEmails as email}
          <Link to={ '/emails/' + email.slug } {getProps}>
            <div class="w-full">
              <div class="flex items-center justify-between">
                <div>{mockEmailSender}</div>
                <div class="text-muted">13:46</div>
              </div>
              <div class="font-bold mt-1 text-gray-800">{email.subject}</div>
            </div>
          </Link>
        {/each}
      </nav>
    </aside>

    <div class="lg:col-span-8 bg-gray-100 flex-1">
      <div class="bg-white border-gray-100 dark:border-gray-800 px-5 py-5">
        <div class="flex items-center justify-between">
          <div>{mockEmailSender}</div>
          <div class="text-muted">13:46</div>
        </div>
        <div class="font-bold text-lg text-gray-800">{selectedEmail.subject}</div>
      </div>
      <div>

        <EmailLayout title={selectedEmail.title}
                     slug={selectedEmail.slug}
                     callToAction={selectedEmail.callToAction}
                     fallBackMessage={selectedEmail.fallbackMessage}
                     linkRoute={selectedEmail.linkRoute}>
          {#if selectedEmail.message}{@html selectedEmail.message}{/if}
        </EmailLayout>
      </div>
    </div>

  </div>
</div>
