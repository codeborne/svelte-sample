<script lang="ts">
  import {navigate, t} from 'src/i18n'
  import MainPageLayout from 'src/layout/MainPageLayout.svelte'
  import Link from 'src/components/Link.svelte'
</script>

<MainPageLayout title={t.title}>
  Browse the <Link to="samples">samples</Link>.
</MainPageLayout>
