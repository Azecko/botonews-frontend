const fetch = require("node-fetch")

module.exports = async function fetchhacker(options) {

    let defaultoptions = {
        number: 3, // Max is 499
    }
    let opt = {...defaultoptions, ...options}

    let data = []

    const allnumbers = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty');
    const body = await allnumbers.json();

    for (let i = 0; i != opt.number; i++) {
        var three = await fetch(`https://hacker-news.firebaseio.com/v0/item/${body[i]}.json?print=pretty`)
        var threebody = await three.json()

        var d = new Date(0)
        d.setUTCSeconds(threebody.time)

        let article = {
            title: threebody.title,
            subtitle: `Story score : ${threebody.score}<br>By : <a href="https://news.ycombinator.com/user?id=${threebody.by}" target="_blank">${threebody.by}</a>`,
            url: threebody.url,
            image: `https://findlogovector.com/wp-content/uploads/2019/10/y-combinator-logo-vector.png`,
            visual: `YCombinator Orange logo`,
            created_at: d
        }
        data.push(article)
    }

    return data
}
