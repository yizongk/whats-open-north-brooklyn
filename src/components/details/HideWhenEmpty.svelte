<script>
    const EMPTY_VALUES = ['none']
    export let value = '';
    export let show = false;
    $: isEmpty = value.trim().length === 0 || EMPTY_VALUES.includes(value.trim().toLowerCase());

</script>

{#if !isEmpty || show}
    <slot></slot>
{/if}