<script>
    //if source is a link hyperlink lastUpdated, otherwise abbr if source isn't blank
    import {_} from 'svelte-i18n'
    import {getValidUrl} from '../../utils/getValidUrl'

    export let lastUpdated = ''
    export let source = ''


    $: sourceIsLink = source.includes('http')
</script>

<p class="has-text-grey-light">
    {#if sourceIsLink}
        <a href={getValidUrl(source)}>{$_('details.last_updated', {values: { lastUpdated } })}</a>
    {:else if source.trim().length > 0}
        <abbr title={source}>{$_('details.last_updated', {values: { lastUpdated } })}</abbr>
    {:else}
        {$_('details.last_updated', {values: { lastUpdated } })}
    {/if}
</p>

<style>
    a:link {
        color: #7297b6;
    }
</style>