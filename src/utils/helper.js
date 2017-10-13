export function formatMoney(n, currency) {
    return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}
export function cleanSlug(str) {

    return str.replace(/[|&;$%@"<>()+,_-]/g, ' ').toLowerCase()
}
export function getRouteName(str) {

    let arr = str.split('/')
    return cleanSlug(arr[arr.length-1])
}


export default {
    formatMoney,
    getRouteName,
    cleanSlug
}

