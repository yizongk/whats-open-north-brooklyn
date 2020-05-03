<script>
    import {_} from 'svelte-i18n'
    import {data, filters} from '../stores'
    import GeneralSearch from './GeneralSearch.svelte'
    import {capitalizeFirstLetter} from '../utils/textFormating'
    import CategoryFilter from './filters/CategoryFilter.svelte'
    import OptionFilter from './filters/OptionFilter.svelte'

    const customColors = {
        'restaurant': {
            selectedColor: '#2637cc',
            color: '#575B85'
        },
        'laundromat': {
            selectedColor: '#ffc01f',
            color: 'rgba(255,192,31,0.42)'
        },
        'grocery store': {
            selectedColor: '#1aa139',
            color: 'rgba(26,161,57,0.58)'
        },
        'grocery store - supermarket': {
            selectedColor: '#1aa139',
            color: 'rgba(26,161,57,0.58)'
        },
        'health and wellness': {
            selectedColor: '#cc1619',
            color: 'rgba(204,22,25,0.51)'
        },
        'pharmacy': {
            selectedColor: '#f0575e',
            color: 'rgba(240,87,94,0.59)'
        },
        'bar': {
            selectedColor: '#1eb0a9',
            color: 'rgba(30,176,169,0.46)'
        },
        'hardware store': {
            selectedColor: '#508eba',
            color: 'rgba(80,142,186,0.71)'
        },
        'bike shops': {
            selectedColor: '#508eba',
            color: 'rgba(80,142,186,0.71)'
        },
        'pet supplies': {
            selectedColor: '#508eba',
            color: 'rgba(80,142,186,0.71)'
        },
        'shipping services/post office': {
            selectedColor: '#508eba',
            color: 'rgba(80,142,186,0.71)'
        },
        'other': {
            selectedColor: '#8e8e8e',
            color: 'rgba(142,142,142,0.5)'
        }
    }

    let overallCategoryItems = []
    let subCategoryItems = []
    let textSearch = '' //todo - add textSearch filter

    $: {
        //init filters
        if ($data && $data.features.length > 0) {
            const categories = new Set($data.features.map(feature => feature.properties.Category))
            //sort by customColors's order
            const order = Object.keys(customColors)
            const unique = Array.from(categories).map(item => [order.indexOf(item.toLowerCase().trim()), item])
                    .sort((a,b) => a[0] - b[0]).map(arr => capitalizeFirstLetter(arr[1]))
            overallCategoryItems = unique.filter(item => item.length > 0).map(item => ({
                name: item,
                selected: false
            }))

        }
    }


    // //update subCategories
    // $: {
    //     if ($data && overallCategoryItems.length > 0) {
    //         const overallCategory = overallCategoryItems.find(item => item.selected);
    //         if (overallCategory) {
    //             //get subCategories for the selected overallCategory
    //             const subCategories = $data.features.filter(feature => capitalizeFirstLetter(feature.properties.overallcategory) === overallCategory.name)
    //                     .map(feature => capitalizeFirstLetter(feature.properties.subcategory))
    //             //filter for unique items
    //             const unique = Array.from(new Set(subCategories)).sort()
    //             subCategoryItems = unique.filter(item => item.length > 0).map(item => ({
    //                 name: item,
    //                 selected: false
    //             }))
    //         } else {
    //             subCategoryItems = []
    //         }
    //     }
    // }

    let optionItems = [
        {
            name: $_('filters.options.takeout'),
            selected: false,
            filter: feature => feature.properties["Pickup Offered"].toLowerCase().includes('yes')
        },
        {
            name: $_('filters.options.delivery'),
            selected: false,
            filter: feature => feature.properties["Delivery Offered"].toLowerCase().includes('yes')
        }
    ]


    //function to generate filters
    $: {
        const overallCategoryFilter = (feature) => {
            const filterItems = overallCategoryItems.filter(item => item.selected);
            if (filterItems.length) {
                return filterItems.map(item => item.name).includes(capitalizeFirstLetter(feature.properties.Category))
            }
            return true;

        }

        // const subCategoryFilter = (feature) => {
        //     const filterItems = subCategoryItems.filter(item => item.selected);
        //     if (filterItems.length) {
        //         return filterItems.map(item => item.name).includes(capitalizeFirstLetter(feature.properties.subcategory))
        //     }
        //     return true;
        //
        // }

        const optionFilter = (feature) => {
            const filterItems = optionItems.filter(item => item.selected);
            if (filterItems.length > 0) {
                return filterItems.every(item => item.filter(feature))
            }
            return true;
        }

        filters.set([overallCategoryFilter, optionFilter]) // to re-add subCategoryFilter
    }


</script>

<GeneralSearch {textSearch}/>

<CategoryFilter name={$_('filters.categories')} categories={overallCategoryItems}
                on:update={e => overallCategoryItems = e.detail} {customColors}/>

<!--<br>-->

<!--<CategoryFilter name={$_('filters.subcategories')} categories={subCategoryItems} showAfter={1}-->
<!--                on:update={e => subCategoryItems = e.detail}/>-->

<br>

<OptionFilter name={$_('filters.options.title')} options={optionItems} on:update={e => optionItems = e.detail}/>

<br>
