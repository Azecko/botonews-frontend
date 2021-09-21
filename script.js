const express = require('express');
const app = express();
const axios = require("axios");
const fetchactu = require("./fetchactu.js");
const jsdom = require("jsdom");
const fetchgo = require('./fetchgo.js');
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
    <title>Informations</title>
  </head>
  <body>
    <div class="vacation-cards">
      <section class="cards">
      </section>
    </div>   
  </body>
</html>
`);

const $ = require("jquery")(dom.window);

app.use(express.static('public'))

const getNews = async () => {
  let actus = await fetchactu({ lang: "en", number: 4 })
  // let tweets = await fetchtweet
  let golinks = await fetchgo({number : 4})

  return [...actus, ...golinks, /*...tweets*/]
}

const createArticleList = (articles) => {
  articlesList = ''
  for (article of articles) {
    // console.debug(article.title || '');
    if (!article) { break; }
    articlesList += `
      <article class="card">
        <a href="${article.url || ''}" target="_blank">
        <picture class="thumbnail">
            <img src="${article.image || ''}" alt="${article.visual || ''}">
        </picture>
        <div class="card-content">
            <h2>${article.title || ''}</h2>
            <p>${article.subtitle || ''}</p>
        </div>
        </a>
      </article>;`
  }
  return articlesList;
}

app.get('/', async (req, res) => {
  let articles = await getNews()
  let articlesList = createArticleList(articles)
  res.send(dom.serialize())
  $(".cards").html(articlesList)
})

const server = app.listen(3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});