const express = require("express");
const path = require("path");

const complements = [1,5,6];

function getRandomFromId() {
  const randomIndex = Math.floor(Math.random() * complements.length);
  return complements[randomIndex];
}

function getCandidates(prod_id) {
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
  return img_url_array;
}

const img_dict = require('./data/img.json');
// console.log(img_dict);

const match_dict = require('./data/candidates.json');
// console.log(match_dict);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/complement", function(req, res) {
  from_id = getRandomFromId();
  var from_img_url = undefined;
  if (from_id in img_dict) {
    from_img_url = img_dict[from_id];
  }
  to_img_array = getCandidates(from_id);
  res
    .json({
      from_img: from_img_url,
      to_img: to_img_array
    })
    .end();
});



app.post("/complement", function(req, res) {
  var prod_id = req.body.prod_id;
  var img_url_array = getCandidates(prod_id);
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