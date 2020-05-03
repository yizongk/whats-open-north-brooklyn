<script>
    import marked from 'marked';
    import DOMPurify from 'dompurify'

    export let title = ''
    export let content = ''
    export let isEmpty = content.trim().length === 0

</script>

{#if isEmpty }

{:else}
    <p><strong>{title}: </strong>{@html DOMPurify.sanitize(marked(content))}</p>
{/if}