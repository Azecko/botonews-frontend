const fetch = require("node-fetch")
const parser = require("fast-xml-parser")

module.exports = async function fetchactu(options) {
    let defaultoptions = {
        number: 3, // Max is 30
    }
    // Merge default option with passed option (passed option will overwrite defaultoptions)
    let opt = {...defaultoptions, ...options}
    
    // 1. get data with fetch on go's feed
    const response = await fetch('https://go.epfl.ch/api/v1/aliases?orderby=created_at&sort=desc&per_page=10');
    const body = await response.json();

    // 2. process data with xml2js
    // var jsonObj = parser.parse(body)

    let data  = []
    for (let i = 0; i != opt.number; i++) {
        let article = {
            title: `https://go.epfl.ch/${body.data[i].alias}`,
            subtitle: `<a href="https://go.epfl.ch/${body.data[i].alias}" target="_blank"><b>https://go.epfl.ch/${body.data[i].alias}</b></a> previously was <a href="${body.data[i].url}" target="_blank"><b>${body.data[i].url}</b></a>.<br>It has <b>${body.data[i].clicks}</b> clicks.`,
            url: body.data[i].url,
            image: `https://go.epfl.ch/logo/GoEPFL_large_red_white.jpg`,
            visual: `Red go EPFL logo`,
            created_at: body.data[i].created_at
        }
        data.push(article)
    }
    return data
}