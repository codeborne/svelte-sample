<script>
  import RangeSlider from 'src/forms/RangeSlider.svelte'
  import Sample from 'src/samples/Sample.svelte'

  let range = 33
</script>

<Sample title="Range slider">
  <div class="w-64 mx-auto">
    <RangeSlider label="RangeSlider" min={10} max={40} bind:value={range}/>
  </div>
</Sample>
