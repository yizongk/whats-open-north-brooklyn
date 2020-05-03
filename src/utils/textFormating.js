import DOMPurify from 'dompurify'

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).trim();
}

export function formatPhoneNumber(phoneNumberString){
    //from maerics via https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        return '(' + match[1] + ')' + match[2] + '-' + match[3]
    }
    return phoneNumberString
}

export function sanitizeString(str = ''){
    return DOMPurify.sanitize(str)
}