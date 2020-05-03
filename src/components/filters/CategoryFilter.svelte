<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();

    export let name = ''
    export let categories = [];
    export let showAfter = 0;
    export let customColors = null;

    //have allCategories be true only if everything else is false
    $: allCategories = categories.every(item => !item.selected)

    function resetCategoryItems() {
        //remove all filters, when all button is clicked
        const updatedCategories = categories.map(item => {
            item.selected = false;
            return item;
        })
        dispatch('update', updatedCategories)
    }

    function toggleCategoryItem(selectedItem) {
        //select one category in the “Categories” section at a time
        // const updatedCategories = categories.map(item => {
        //     selectedItem.name === item.name ? item.selected = true : item.selected = false;
        //     return item;
        // })
        selectedItem.selected = !selectedItem.selected
        dispatch('update', categories)
    }

    function getCustomColor(name, type = 'selectedColor'){
        //check if CustomColor for the category exist
        const category = name.toLowerCase()
        if(category in customColors){
            return customColors[category][type]
        }else{
            type ===  'selectedColor' ? '#c7c7c7' : '#929292'
        }
    }

    function getBorderColor(item) {
        return `
            border-left: 7px solid ${getCustomColor(item.name, 'selectedColor')};
        `
    }


</script>


{#if categories.length > showAfter}
    <div class="filter-header"><h6 class="is-6">{name}:</h6>
        <button class="button is-small {allCategories ? 'is-info' : ''}" on:click={resetCategoryItems}>All</button>
    </div>

    <div class="filter-container">
        {#each categories as item, name}
            {#if customColors}
                <button class="button is-small {item.selected ? '' : 'is-light'}"
                        style={getBorderColor(item)}
                        on:click={toggleCategoryItem(item)}>{item.name}</button>
            {:else}
                <button class="button is-small {item.selected ? 'is-info' : ''}"
                        on:click={toggleCategoryItem(item)}>{item.name}</button>
            {/if}
        {/each}
    </div>
{/if}

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
        margin-right: 0.8rem;
        margin-bottom: 0.2rem;
    }
    .is-light{
        background-color: #efefef;
    }
</style>