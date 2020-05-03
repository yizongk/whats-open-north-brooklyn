<script>
    import {createEventDispatcher} from 'svelte';
    import { _ } from 'svelte-i18n'

    const dispatch = createEventDispatcher();

    export let name = ''
    export let options = [];


    $: anyOptions = options.every(item => !item.selected)

    function resetOptionItems() {
        options.map(item => {
            item.selected = false;
            return item;
        })
        dispatch('update', options)
    }

    function toggleOptionItem(item) {
        item.selected = !item.selected;
        dispatch('update', options)
    }
</script>


<div class="filter-header"><h6 class="is-6">{name}:</h6>
    <button class="button is-small {anyOptions ? 'is-info' : ''}" on:click={resetOptionItems}>{$_('filters.options.any')}</button>
</div>
<div class="filter-container">
    {#each options as item, name}
        <button class="button is-small {item.selected ? 'is-info' : ''}"
                on:click={toggleOptionItem(item)}>{item.name}</button>
    {/each}
</div>

<style>
    .filter-header {
        display: flex;
        flex-direction: row;
        margin-bottom: 0.4rem;
    }

    .filter-header button {
        margin-left: 1rem;
    }

    .filter-container button {
        margin-right: 1rem;
        margin-bottom: 0.2rem;
    }

</style>