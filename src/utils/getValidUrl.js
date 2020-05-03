//from https://stackoverflow.com/questions/11300906/check-if-a-string-starts-with-http-using-javascript
export function getValidUrl(url = ""){
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, "");

    if(/^(:\/\/)/.test(newUrl)){
        return `http${newUrl}`;
    }
    if(!/^(f|ht)tps?:\/\//i.test(newUrl)){
        return `http://${newUrl}`;
    }

    return newUrl;
};

export function getValidInstagram(url = ""){
    const pattern = /(instagram\.com|Instagram.com)/;
    if(!pattern.test(url)) {
        return getValidUrl(`https://www.instagram.com/${url}`)
    }
    return getValidUrl(url)
}