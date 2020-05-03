<script>
    import {createEventDispatcher} from 'svelte';
    import {sanitizeString} from '../../utils/textFormating'

    const dispatch = createEventDispatcher();

    export let addr;

    let {Name, Category} = addr.item.properties


    function insert(text, index, value) {
        return text.substr(0, index) + value + text.substr(index);
    }

    function boldIndices(match) {
        let addedChar = 0;
        let text = match.value;
        match.indices.filter(index => index[1] - index[0] > 1).forEach(index => {
            text = insert(text, index[0] + addedChar, '<strong>')
            addedChar += 9
            text = insert(text, index[1] + addedChar, '</strong>')
            addedChar += 10
        })
        return text
    }

    $: {
        //bold matches
        addr.matches.map(match => {
            switch (match.key) {
                case 'properties.Name':
                    Name = boldIndices(match)
                    break;
                case 'properties.Category':
                    Category = boldIndices(match)
                    break;
                default:
                    break;
            }

        })
    }
</script>


<li on:click="{() => dispatch('set', addr)}">
    <div class="flex-search">
        <p class="has-text-grey has-text-right">{@html sanitizeString(Name)}
        <p>{@html sanitizeString(Category)}</p>
    </div>
</li>

<style>
    li {
        padding: 1rem;
    }

    li:hover {
        background-color: #f1f1f1;
    }

    .flex-search {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
</style>