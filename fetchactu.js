const fetch = require("node-fetch")

module.exports = async function fetchactu(options) {
    let defaultoptions = {
        lang: "en",
        number: 3, // Max is 100
    }
    // Merge default option with passed option (passed option will overwrite defaultoptions)
    let opt = {...defaultoptions, ...options}
    
    const response = await fetch(`https://actu.epfl.ch/api/v1/channels/1/news/?lang=${opt.lang}&limit=${opt.number}`)
    const body = await response.json()

    let data  = []
    for (let i = 0; i != opt.number; i++) {
        let article = {
            title: body.results[i].title,
            subtitle: body.results[i].subtitle,
            url: body.results[i].news_url,
            image: body.results[i].thumbnail_url,
            visual: body.results[i].visual_description,
            created_at: body.results[i].publish_date
        }
        data.push(article)
    }
    return data
}