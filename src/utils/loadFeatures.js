import getIcons from "./getIcons";

function loadFeatures(db) {
    const validFeatures = db.filter(feature => +feature.Longitude && +feature.Latitude)

    const openFeatures = validFeatures.filter(feature => {
        const status = feature.Status
        return status.toLowerCase().includes('open')
    })
    console.log(openFeatures[0])
    console.log(`${openFeatures.length} rows loaded.`)

    const features = openFeatures.map((feature, id) => {
        //generate icon
        const lnglat = [+feature.Longitude, +feature.Latitude]

        return {
            "type": "Feature",
            "properties": {
                ...feature, id
            },
            "geometry": {
                "type": "Point",
                "coordinates": lnglat
            }
        }
    })

    //find overlapped lnglat and move them slightly depending on order
    const lappedFeatures = features.map(feature => {
        const digits = 4
        const lnglat1 = feature.geometry.coordinates.slice();
        const lat1 = lnglat1[1].toFixed(digits);
        const lng1 = lnglat1[0].toFixed(digits);
        const overlapped = features.filter(otherFeatures => {
            const lnglat2 = otherFeatures.geometry.coordinates.slice();
            const lat2 = lnglat2[1].toFixed(digits);
            const lng2 = lnglat2[0].toFixed(digits);
            return lat1 === lat2 && lng1 === lng2
        })
        if (overlapped.length > 1) {
            //move depending on the index
            const index = overlapped.indexOf(feature)
            feature.geometry.coordinates = lnglat1.map(i => i + index * 0.00004)
        }
        return feature
    })

    //generate icons
    const iconFeatures = lappedFeatures.map(feature => {
        const latlng = feature.geometry.coordinates.slice().reverse()
        const icon = getIcons(feature.properties.Category, feature.properties['Sub-Category'], latlng)
        feature.properties.icon = icon;
        return feature
    })

    return iconFeatures
}

export default loadFeatures;

