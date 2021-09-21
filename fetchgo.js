const fetch = require("node-fetch")
const parser = require("fast-xml-parser")

module.exports = async function fetchactu(options) {
    let defaultoptions = {
        number: 3, // Max is 30
    }
    // Merge default option with passed option (passed option will overwrite defaultoptions)
    let opt = {...defaultoptions, ...options}
    
    // 1. get data with fetch on go's feed
    const response = await fetch('https://go.epfl.ch/feed');
    const body = await response.text();

    // 2. process data with xml2js
    var jsonObj = parser.parse(body)

    let data  = []
    for (let i = 0; i != opt.number; i++) {
        let article = {
            title: jsonObj.feed.entry[i].title,
            subtitle: jsonObj.feed.entry[i].summary.split('<hr />')[0],
            url: jsonObj.feed.entry[i].link,
            image: `https://go.epfl.ch/logo/GoEPFL_large_red_white.jpg`,
            // visual: body.results[i].visual_description,
        }
        data.push(article)
    }
    return data
}