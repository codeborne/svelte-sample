<script lang="ts">
  import {fly} from 'svelte/transition'
  import {mockEmails, mockEmailNotifications, mockEmailSender} from './mockEmails'
  import Button from 'src/components/Button.svelte'
  import Icon from 'src/icons/Icon.svelte'

  const onClose = (emailNotification: any) => {
    mockEmailNotifications.closeMockEmailNotification(emailNotification)
  }
</script>️

<div class="z-50 fixed mt-4 mr-4 top-0 right-0">
  {#each $mockEmailNotifications as notification}
    <div class="mb-2" transition:fly={{x: 100}}>
      <div class="flex items-start p-4 text-gray-700 bg-white rounded-lg shadow-xl w-[380px] border-l-4">
        <div class="pr-3">
          <Icon name="mail" />
        </div>
        <div class="flex items-start space-x-2">
          <div>
            <div class="font-bold">{mockEmailSender}</div>
            <div>{mockEmails.find(x => x.slug === notification.slug)?.subject}</div>
            <a target="_blank" href={'/emails/' + notification.slug} class="text-link !font-bold" on:click={ () => onClose(notification) }>View mock email</a>
          </div>
        </div>
        <Button icon="x"
                title="Close"
                circular
                class="ml-auto -my-1.5 -mx-1.5"
                on:click={() => onClose(notification)}
        />
      </div>
    </div>
  {/each}
</div>
