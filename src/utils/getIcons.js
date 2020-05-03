import ICONS from './icons'

const defaultIconOptions = {
    shadowUrl: './icons/shadow.png',
    iconSize:     [28.8, 33.3], // size of the icon
    shadowSize:   [45.9 ,33.3], // size of the shadow
    iconAnchor:   [15, 25], // point of the icon which will correspond to marker's location
    shadowAnchor: [15, 25],  // the same for the shadow
    popupAnchor:  [0, -14] // point from which the popup should open relative to the iconAnchor
}

const CUSTOM_ICONS = ICONS.map(icon => {
    return {
        overallcategory: icon[0],
        subcategory: icon[1],
        iconName: icon[2],
        icon: L.icon({
            iconUrl: `./icons/${icon[2]}.png`,
            ...defaultIconOptions
        })
    }
})

export default function(overall, sub, latlng){
    const icon = iconLookup(overall, sub)
    return L.marker(latlng, {icon})
}



function iconLookup(overall, sub){
    let iconMatch = null;

    const overall_lower = overall.trim().toLowerCase();
    const sub_lower = sub.trim().toLowerCase()

    const match = CUSTOM_ICONS.find(icon => icon.overallcategory === overall_lower && icon.subcategory === sub_lower)

    if(match){
        return match.icon
    }

    //default icons
    if(!iconMatch){
        switch(overall_lower){
            case 'bike shops':
                return L.icon({
                    iconUrl: './icons/bike.png',
                    ...defaultIconOptions
                })
            case 'hardware store':
                return L.icon({
                    iconUrl: './icons/tools.png',
                    ...defaultIconOptions
                })
            case 'pet supplies':
                return L.icon({
                    iconUrl: './icons/pets.png',
                    ...defaultIconOptions
                })
            case 'shipping services/post office':
                return L.icon({
                    iconUrl: './icons/truck.png',
                    ...defaultIconOptions
                })
            case 'restaurant':
                return L.icon({
                    iconUrl: './icons/restaurant.png',
                    ...defaultIconOptions
                })
            case 'grocery store - supermarket':
                return L.icon({
                    iconUrl: './icons/supermarket.png',
                    ...defaultIconOptions
                })
            case 'grocery store':
                return L.icon({
                    iconUrl: './icons/grocery.png',
                    ...defaultIconOptions
                })
            case 'bar':
                return L.icon({
                    iconUrl: './icons/bar.png',
                    ...defaultIconOptions
                })
            case 'health and wellness':
                return L.icon({
                    iconUrl: './icons/firstaid.png',
                    ...defaultIconOptions
                })
            case 'pharmacy':
                return L.icon({
                    iconUrl: './icons/drugstore.png',
                    ...defaultIconOptions
                })
            case 'laundromat':
                return L.icon({
                    iconUrl: './icons/laundromat.png',
                    ...defaultIconOptions
                })
            default:
                return L.icon({
                    iconUrl: './icons/blank.png',
                    ...defaultIconOptions
                })
        }
    }
}