<script>
    import {onMount} from 'svelte'
    import {mapView, data, details, filters} from '../stores'
    import { _ } from 'svelte-i18n'

    let container
    let map
    let layer
    let zoomed = false

    function generateLayer(data, filter = () => true) {
        return L.geoJSON(data, {
            pointToLayer: feature => feature.properties.icon,
            onEachFeature: (feature, layer) => {
                const {Name, Category} = feature.properties
                layer.bindPopup(`<p><strong>${Name}</strong></p><p>${Category}</p>`)
                layer.on('click', () => details.set(feature.properties))
            },
            filter
        })
    }

    onMount(() => {
        const maxZoom = 20
        const minZoom = 13
        const bounds = L.latLngBounds([40.770,-74.000], [40.674, -73.89]);
        const attribution = '<a href="https://carto.com/">Carto</a> | <a href="https://www.openstreetmap.org/copyright">OSM</a> |  <a href="https://mapicons.mapsmarker.com/">Map Icons Collection</a>'


        map = L.map(container, {maxZoom, minZoom}).setView([40.7165, -73.9477], 13.6)
        // map.scrollWheelZoom.disable()

        L.tileLayer(
                'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/light_all/{z}/{x}/{y}{r}.png',
                {maxZoom, minZoom, bounds, attribution}
        ).addTo(map)

        //add map to store
        mapView.set(map)
    })

    $: if (map && $data) {
        layer = generateLayer($data).addTo(map);
        // if(!zoomed){
        //     //zoom to layer on first load
        //     map.fitBounds(layer.getBounds())
        //     zoomed = true
        // }
    }

    $: {
        if (map && layer) {
            //update layer when filter functions changes
            map.removeLayer(layer);
            layer = generateLayer($data, feature => $filters.every(filter => filter(feature))).addTo(map);
            layer.addTo(map);
        }
    }


    function scrollTop(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }


</script>

<div class="map-container">
    <div id="map" bind:this="{container}"></div>
    <button class="button is-rounded" on:click={scrollTop}>{$_('map.top')}</button>

</div>

<style>
    .map-container {
        width: 100%;
        height: 100%;
    }

    #map {
        width: 100%;
        height: 100%;
    }

    .button {
        display: none;
        position: fixed;
        right: 35px;
        bottom: 1rem;
        z-index: 1001;
    }

    @media only screen and (max-width: 768px) {
        .button {
            display: block;
        }
    }

    :global(.awesome-marker i) {
        font-size: 4px;
    }
</style>