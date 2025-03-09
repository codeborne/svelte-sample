<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import {setContext} from 'svelte'
  import {type MapOptions} from 'leaflet'
  import L from 'leaflet';

  export let map: L.Map | null = null;

  setContext('map', () => map)

  const voyagerTileLayers = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'

  const defaultMapSettings: MapOptions = {
    preferCanvas: false,
    zoom: 12,
    maxZoom: 18,
    minZoom: 3,
    zoomControl: false,
    zoomAnimation: true,
    fadeAnimation: true,
    maxBounds: L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180)),
  };


  function initMap(container: HTMLElement) {
    map = L.map(container, defaultMapSettings).setView([59.437, 24.745], 16);

    L.tileLayer(voyagerTileLayers, { noWrap: true }).addTo(map);

    return {
      destroy: () => {
        map?.remove();
        map = null;
      },
    };
  }

</script>

<div class="map" use:initMap>
  {#if map}
    <slot/>
  {/if}
</div>

<style lang="postcss">
  @reference "../../global.css";

  .map {
    @apply absolute inset-0;
  }
</style>
