const express = require('express');
const app = express();

const axios = require("axios");

const jsdom = require("jsdom");
const { JSDOM } = jsdom

require('dotenv').config()

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

    <div class="vacation-cards"></div>
    
</body>
</html>
`);

const $ = require("jquery")(dom.window);

app.use(express.static('public'))

// site.com/controler/method/parametres
// app.get('/hello/:name', (req, res) => {
//     console.log(req.params)
//     res.send(`hello ${req.params.name}`);
//   });

  app.get('/', (req, res) => {
    
    res.send(dom.serialize())

    let titles = []
    let subtitles = []
    let thumbnails = []
    let visual_desc = []
    let news_urls = []
    
    let url = "https://actu.epfl.ch/api/v1/channels/1/news/?lang=en"
    axios({
      method:'get',
      url,
      })
      .then(function (response) {

          for (let i = 0; i != 3; i++) {
            
            titles.push(response.data.results[i].title)
            subtitles.push(response.data.results[i].subtitle)
            thumbnails.push(response.data.results[i].thumbnail_url)
            visual_desc.push(response.data.results[i].visual_description)
            news_urls.push(response.data.results[i].news_url)

          }

          $(".vacation-cards").html(`
            <section class="cards">
                 
                  <article class="card">
                        <a href="${news_urls[0]}" target="_blank">
                        <picture class="thumbnail">
                            <img src="${thumbnails[0]}" alt="${visual_desc[0]}">
                        </picture>
                        <div class="card-content">
                            <h2>${titles[0]}</h2>
                            <p>${subtitles[0]}</p>
                        </div>
                    </a>
                  </article>
                  <article class="card">
                        <a href="${news_urls[1]}" target="_blank">
                        <picture class="thumbnail">
                            <img src="${thumbnails[1]}" alt="${visual_desc[1]}">
                        </picture>
                        <div class="card-content">
                            <h2>${titles[1]}</h2>
                            <p>${subtitles[1]}</p>
                        </div>
                    </a>
                  </article>
                  <article class="card">
                        <a href="${news_urls[2]}" target="_blank">
                        <picture class="thumbnail">
                            <img src="${thumbnails[2]}" alt="${visual_desc[2]}">
                        </picture>
                        <div class="card-content">
                            <h2>${titles[2]}</h2>
                            <p>${subtitles[2]}</p>
                        </div>
                    </a>
                  </article>
 
                  
 
    </section>
    `)

      })
      .catch(function (error) {
          console.log(error);
      });



  })

const server = app.listen(3000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });