const { match } = require("assert");
const express = require("express");
const path = require("path");

const complements = [
  "You like nice today",
  "That dress looks nice on you",
  "Have you been working out?",
  "You can do hard things",
  "You've gotten far in this course. You're really smart",
  "You're programming! How cool is that?",
  "I'm really proud of you",
  "You made this",
  "You've learned a lot of things, and that's pretty hard to do"
];

function getRandomComplement() {
  const randomIndex = Math.floor(Math.random() * complements.length);
  return complements[randomIndex];
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/complement", function(req, res) {
  res
    .json({
      complement: getRandomComplement()
    })
    .end();
});

const img_dict = require('./data/img.json');
console.log(img_dict);

const match_dict = require('./data/candidates.json');
console.log(match_dict);


app.post("/complement", function(req, res) {
  var prod_id = req.body.prod_id;
  const img_url_array = [];
  if (prod_id in match_dict) {
      to_ids = match_dict[prod_id];
      for(let i = 0; i < to_ids.length; i++) {
        to_id = to_ids[i];
        if (to_id in img_dict) {
          img_url_array.push(img_dict[to_id]);
        }
      }
  }

  console.log(img_url_array);
    res
    .json({
      complement: img_url_array
    })
    .end();
});

app.use("/public", express.static("./public"));

app.listen(3000);
console.log("listening on http://localhost:3000");