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

// const img_dict = {
//   1: "https://m.media-amazon.com/images/I/61cK588k49L._SY606_.jpg",
//   2: "https://m.media-amazon.com/images/I/61cK588k49L._SY606_.jpg",
//   3: "https://m.media-amazon.com/images/I/61cK588k49L._SY606_.jpg",
//   4: "https://m.media-amazon.com/images/I/61cK588k49L._SY606_.jpg",
//   5: "https://m.media-amazon.com/images/I/61cK588k49L._SY606_.jpg",
//   6: "https://m.media-amazon.com/images/I/61cK588k49L._SY606_.jpg",
//   7: "https://m.media-amazon.com/images/I/61cK588k49L._SY606_.jpg",
//   8: "https://m.media-amazon.com/images/I/61cK588k49L._SY606_.jpg",
//   9: "https://m.media-amazon.com/images/I/61cK588k49L._SY606_.jpg",
//   10: "https://m.media-amazon.com/images/I/61cK588k49L._SY606_.jpg"
// };

// const match_dict = {
//   1: [2, 3, 4],
//   5: [6, 7, 8],
//   6: [9, 10]
// };

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

// fetch("./data/data.json")
// .then(response => {
//    return response.json();
// })
// .then(jsondata => console.log(jsondata));

// const config = require('./data/data.json');
// console.log(config);

const img_dict = require('./data/img.json');
console.log(img_dict);

const match_dict = require('./data/candidates.json');
console.log(match_dict);


app.post("/complement", function(req, res) {
  var prod_id = req.body.prod_id;
  // let img_url = 'Not valid option';
  const img_url_array = [];
  if (prod_id in match_dict) {
      to_ids = match_dict[prod_id];
      for(let i = 0; i < to_ids.length; i++) {
        to_id = to_ids[i];
        if (to_id in img_dict) {
          img_url_array.push(img_dict[to_id]);
        }
      }
      // img_url = img_dict[prod_id];
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