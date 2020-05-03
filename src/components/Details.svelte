<script>
    import {_} from 'svelte-i18n'
    import {details} from '../stores'
    import HideWhenEmpty from './details/HideWhenEmpty.svelte'
    import MarkdownField from './details/MarkdownField.svelte'
    import LastUpdate from './details/LastUpdated.svelte'

    import {getValidUrl, getValidInstagram} from '../utils/getValidUrl'
    import {formatPhoneNumber} from '../utils/textFormating'
    import LastUpdated from "./details/LastUpdated.svelte";
</script>

{#if $details}
    <div class="content has-background-ter">
        <h4 class="is-4">{$details.Name}</h4>
        <p><strong>{$details.Category}</strong></p>
        <hr/>

        <HideWhenEmpty value={$details.Address}>
            <p><strong>{$_('details.address')}:</strong> {$details.Address}</p>
        </HideWhenEmpty>


        <HideWhenEmpty value={$details.Phone}>
            <p><strong>#:</strong> <a href="tel:{formatPhoneNumber($details.Phone)}"
                                      class="">{formatPhoneNumber($details.Phone)}</a></p>
        </HideWhenEmpty>

        <div class="field is-grouped margin">
            <HideWhenEmpty value={$details['Website/Social Media']}>
                <p><strong><a href="{getValidUrl($details['Website/Social Media'])}"
                              target="_blank">{$_('details.website')}</a></strong></p>
            </HideWhenEmpty>
        </div>

        <hr/>
        <HideWhenEmpty show={$details.Hours}>
            <h5 class="is-5">Hours</h5>
            <p>{$details['Hours']}</p>
        </HideWhenEmpty>

        <HideWhenEmpty show={$details['Special Accommodation Hours']}>
            <h5 class="is-5">Special Accommodation Hours</h5>
            <p>{$details['Special Accommodation Hours']}</p>
        </HideWhenEmpty>


        <div class="field is-grouped is-grouped-multiline">
            <div class="control">
                <div class="tags has-addons">
                    <span class="tag">{$_('details.takeout')}</span>
                    <span class="tag {$details['Pickup Offered'].toLowerCase().includes('yes') ? 'is-success' : 'is-white'}">
                        {$details['Pickup Offered']}
                    </span>
                </div>
            </div>


            <div class="control">
                <div class="tags has-addons">
                    <span class="tag">{$_('details.delivery')}</span>
                    <span class="tag {$details['Delivery Offered'].toLowerCase().includes('yes') ? 'is-success' : 'is-white'}">
                        {$details['Delivery Offered']}
                    </span>
                </div>
            </div>

        </div>

        <MarkdownField title={$_('details.notes')} content={$details['Notes']}/>

        {#if $details['Donate']  }
            <hr>
            <MarkdownField title="Donate" content={$details['Donate']}/>
        {/if}

        <hr>

        <LastUpdated lastUpdated={$details['Last Updated']} />

    </div>
{:else}
    <div class="content has-background-ter">
        <h4 class="is-4">{$_('details.click_on_a_point')}</h4>
    </div>
{/if}


<style>
    .content {
        padding: 0.5rem 0.5rem;
    }

    .margin p {
        margin-right: 1rem;
    }

    .support .tag {
        margin-right: 5px;
    }
</style>