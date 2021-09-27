const express = require('express');
const app = express();
const axios = require("axios");
const fetchactu = require("./fetchactu.js");
const jsdom = require("jsdom");
const fetchgo = require('./fetchgo.js');
const fetchhacker = require('./fetchhacker.js');
const fetchtweets = require('./fetchtweets.js');
const { debug } = require('request');
const { JSDOM } = jsdom

require('dotenv').config();

const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async></script>
    <title>Botonews</title>

    <script src="https://code.jquery.com/jquery-3.6.0.slim.min.js" integrity="sha256-u7e5khyithlIdTpu22PHhENmPcRdFiHRjhAuHcs05RI=" crossorigin="anonymous"></script>
  </head>
  <body>
    <button class="random-button">Randomize</button>
    <div class="vacation-cards">
      <section class="cards">
        <div class="row card-columns"></div>
      </section>
    </div>

    <script>
      $(".random-button").click(function(){
        console.log("Button clicked)
      });
    </script>
  </body>
</html>
`);

const $ = require("jquery")(dom.window);

app.use(express.static('public'))

const getNews = async () => {
  let actus = await fetchactu({ lang: "en", number: 4 })
  let golinks = await fetchgo({number : 4})
  let hackernews = await fetchhacker({number: 4})

  let tweetsceo = await fetchtweets({username: "php_ceo", userid: "2317524115", number: 4})
  let tweetshipster = await fetchtweets({username: "hipsterhacker", userid: "261546340", number: 4})
  let tweetsneckbeard = await fetchtweets({username: "neckbeardhacker", userid: "278523798", number: 4})

  //return [ ...tweetsneckbeard]
  return [...actus, ...golinks, ...hackernews, ...tweetsneckbeard, ...tweetshipster, ...tweetsceo]
}

const createArticleList = async (articles) => {
  articlesList = ''
  for (article of articles) {
    // console.debug(article.title || '');
    if (!article) { break; }

    var date = new Date(article.created_at)

    articlesList += `
    <div class="col-lg-3">
    <div class="card">
      <a href="${article.url || ''}" target="_blank">
          <img src="${article.image || ''}" class="card-img-top" alt="${article.visual}">
      </a>
      <div class="card-body">
        <h5 class="card-title">${article.title || ''}</h5>
        <p class="card-text">${article.subtitle || ''}</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">${date.toISOString()}</small>
      </div>
    </div>
  </div>
    `
  }
  return articlesList;
}

const getArticles = async (random=false) => {
  let articles = await getNews()
  if(random) {
    articles.sort( () => .5 - Math.random() );
  }
  return await createArticleList(articles)
}

app.get('/', async (req, res) => {
  let articlesList = await getArticles()
  $(".row").html(articlesList)
  res.send(dom.serialize())
})

app.get('/random', async (req, res) => {
    let articles = await getArticles(true)
    $(".row").html(articles)
    res.send(dom.serialize())
})

const server = app.listen(3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});