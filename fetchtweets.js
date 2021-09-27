const fetch = require("node-fetch")
require('dotenv').config();
// export BEARER_TOKEN='xxx'; curl -s "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=ponsfrilus&count=5" -H "Authorization: Bearer $BEARER_TOKEN"  | jq '.[].text' | wc -l

module.exports = async function fetchtweets(options) {

    let defaultoptions = {
        number: 4, // Max is 499
        username: "Azecko1",
        userid: "1007693204962136064"
    }
    let opt = {...defaultoptions, ...options}

    //console.debug(`---------------------------------------\n  username → @${opt.username}\n---------------------------------------`)

    const response = await fetch(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${opt.username}&count=${opt.number}`, { 
        method: 'get', 
        headers:{'Authorization': `Bearer ${process.env.TWITTER_API}`}
    })
    const tweets = await response.json();

    let data  = []
    for (let tweet of tweets) {
        let currentTweet = {
            title: `Tweet by <a href="https://twitter.com/@${tweet.user.screen_name}" target="_blank">${tweet.user.screen_name}</a>`,
            subtitle: `<a href="https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}" target="_blank">${tweet.text}</a>`,
            url: `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`,
            image: `https://logosmarken.com/wp-content/uploads/2020/04/Twitter-Zeichen-2010%E2%80%932012.jpg`,
            visual: `Twitter logo`,
            created_at: tweet.created_at
        }
        data.push(currentTweet)
    }
    return data
}