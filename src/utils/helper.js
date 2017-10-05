export function formatMoney(n, currency) {
    return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}


export default {
    formatMoney:formatMoney
}