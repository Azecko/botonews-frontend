const express = require('express');
const app = express();
const fs = require("fs")

const jsdom = require("jsdom");
const { JSDOM } = jsdom

const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <title>Document</title>
</head>
<body>

    <div class="centered"></div>
    
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
    $(".centered").html(`
            <section class="cards">
                 
                  <article class="card">
                        <a href="#">
                        <picture class="thumbnail">
                            <img src="http://www.abbeyjfitzgerald.com/wp-content/uploads/2017/02/image-example-03.jpg" alt="A dinosaur wearing an aluminium jacket">
                        </picture>
                        <div class="card-content">
                            <h2>Vacation Image 03</h2>
                            <p>Viral engagement anti-pattern back of the net, for meeting assassin horsehead offer. Loop back design thinking drop-dead date. </p>
                        </div>
                    </a>
                  </article>
 
                  
 
    </section>
    `)
  })

const server = app.listen(8080, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });