<script>
    import { _ } from 'svelte-i18n'
    import {mapView, data, details} from '../stores'
    import SearchItem from './search/SearchItem.svelte'
    import Fuse from 'fuse.js'

    export let textSearch = ''
    let value = ''
    let searchAddrs = []
    let error = false
    let features = []
    let fuse = null

    $: if ($data && $data.features) {
        features = $data.features.sort((a, b) => a.properties.Name.localeCompare(b.properties.Name))
        fuse = new Fuse(features, {
            isCaseSensitive: false,
            includeMatches: true,
            minMatchCharLength: 1,
            threshold: 0.4,
            keys: [
                "properties.Name",
                "properties.Category",
            ]
        });
    }

    let markerLayer = null;

    function _set(addr) {
        //set value to clicked addr , then clear searchAddrs
        if (addr) value = addr.item.properties.Name
        searchAddrs = []
        const coords = addr.item.geometry.coordinates.slice().reverse() // reverse no side-effects
        $mapView.setView(coords, 18)
        details.set(addr.item.properties)

        //add marker to map
        if (!markerLayer) {
            markerLayer = L.circleMarker(coords, {
                radius: 15,
                fillColor: "#f7ff45",
                color: "#000",
                weight: 0,
                opacity: 1,
                fillOpacity: 0.8
            });
            markerLayer.addTo($mapView);
        } else {
            markerLayer.setLatLng(coords)
        }

    }

    function _search() {
        if (value.length > 1) {
            const matchedFeatures = fuse.search(value);
            searchAddrs = matchedFeatures.splice(0, 5)
        } else {
            searchAddrs = []
        }
        return true
    }
</script>

<form on:submit|preventDefault="{_set(searchAddrs[0])}">
    <div class="field is-horizontal">
        <div class="field-label is-normal">
            <label class="label">{$_('search.search_by_name')}</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control is-expanded">
                    <input
                            id="address"
                            placeholder="{$_('search.search_placeholder')}"
                            type="text"
                            name="address"
                            bind:value
                            autocomplete="off"
                            on:keyup="{() => {_search(); error = false;}}"
                            class="{!error ? 'input is-fullwidth' : 'input is-fullwidth is-danger'}"
                    />
                </div>
            </div>
            <button type="submit" class="button">{$_('search.search_button')}</button>
        </div>
    </div>

    {#if searchAddrs.length}
        <ul>
            {#each searchAddrs as addr (addr.refIndex)}
                <SearchItem {addr} on:set={({detail}) => _set(detail)}/>
            {/each}
        </ul>
    {/if}
<!--    {#if searchAddrs.length === 0 && value !== ''}-->
<!--        <p class="help is-danger">-->
<!--            {$_('search.no_addresses_found_error')}-->
<!--        </p>-->
<!--    {/if}-->

</form>

<style>
    form {
        margin-bottom: 1rem;
    }

    #address {
        width: 100%;
        padding: 5px 15px;
        box-sizing: border-box;
        margin-bottom: 5px;
    }

    input[type='submit'] {
        background-color: #6a6a6a;
        border: none;
        color: white;
        padding: 5px 10px;
        text-decoration: none;
        cursor: pointer;
    }

    ul {
        color: rgb(61, 61, 61);
        margin: 0px !important;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    }

    ::placeholder {
        color: #4d4d4d;
        font-weight: 300;
    }
</style>