<script>
    import {onMount} from 'svelte'
    import {_, locale} from 'svelte-i18n'
    import {data} from './stores'
    import 'bulma/css/bulma.css'
    import loadFeatures from './utils/loadFeatures'

    import Footer from './components/Footer.svelte'
    import MapView from './components/MapView.svelte'
    import LoadingIndicator from './components/LoadingIndicator.svelte'
    import Details from './components/Details.svelte'
    import Filters from './components/Filters.svelte'

    onMount(() => {
        (async () => {
            // Load data from csv's
            const text = await (await fetch('data/all.csv')).text()
            const rows = d3.csvParse(text)

            data.set({"type": "FeatureCollection", features: loadFeatures(rows)})
        })();
    })
</script>

<main>
    <div class="language-buttons">
        <button class="language-button" on:click={() => locale.set('en')}>English</button>
        <button class="language-button" on:click={() => locale.set('es')}>Español</button>
        <button class="language-button" on:click={() => locale.set('zh-Hans')}>简体</button>
        <button class="language-button" on:click={() => locale.set('zh-Hant')}>繁体</button>
    </div>
    <h3 class="title is-3">{$_('site_header.title')}</h3>
    <p class="is-6 subtitle">
        <strong>{$_('site_header.subtitle')}</strong>
    </p>
    <Filters/>
    <div class="panel">
        <div class="panel-left">
            {#if !$data}
                <LoadingIndicator/>
            {:else}
                <Details/>
            {/if}
        </div>
        <div class="panel-right">
            <MapView/>
        </div>
    </div>
    <Footer/>
</main>

<style>
    main {
        margin: 20px auto;
        max-width: 1500px;
        color: #444;
        padding: 0 25px;
    }

    @media only screen and (max-width: 768px) {
        main {
            padding: 0 35px !important;
        }

        .panel {
            min-height: 400px !important;
        }

        .panel-right {
            min-height: 400px !important;
        }
    }

    .panel {
        display: flex;
        flex-wrap: wrap;
        min-height: 550px;
    }

    .panel-left {
        flex: 1 1 300px;
        padding: 1rem;
    }

    .panel-right {
        flex: 1 1 398px;
        min-width: 200px;
        min-height: 550px;
    }

    :global(.is-1, .is-2, .is-3, .is-4, .is-5, .is-6, .is-7) {
        font-family: 'Merriweather', serif;
    }

    .info {
        padding: 0.5rem 1rem;
        margin-bottom: 1rem;
    }

    .language-buttons {
        /*display: none;*/
        margin-bottom: 1rem;
    }

    .language-button {
        /*display: inline-block;*/
        /*display: none;*/
        border: none;
        font-family: 'Merriweather', serif;
        font-size: 1rem;
        font-weight: 700;
        color: #3273dc;
        cursor: pointer;
    }


</style>
