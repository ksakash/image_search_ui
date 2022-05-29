const input = document.querySelector('.input-to-copy');

let placeholder_value = "no value";

input.addEventListener("keyup", function() {
  placeholder_value = input.value
});

function addNewDoggo(divElement, img_url_array) {

    while (divElement.firstChild) {
      divElement.removeChild(divElement.lastChild);
    }

    for(let i = 0; i < img_url_array.length; i++) {
      let img_url = img_url_array[i];
      const img = document.createElement("img");
      img.src = img_url;
      img.alt = "Prod images";
      img.title = "Prod images";
      const imgElement = document.createElement("div");
      imgElement.innerText = "img";
      const brkElement = document.createElement("br");
      imgElement.appendChild(brkElement);
      imgElement.appendChild(img);
      divElement.appendChild(imgElement);
    }

}

function clearQueryImage(divElement) {
  divElement.innerText = '';
  while (divElement.firstChild) {
    divElement.removeChild(divElement.lastChild);
  }
}

function addQueryImage(divElement, img_url) {
  divElement.innerText = "from_image";
  const brkElement = document.createElement("br");
  const img = document.createElement("img");
  img.src = img_url;
  img.alt = "Prod images";
  img.title = "Prod images";
  divElement.appendChild(brkElement);
  divElement.appendChild(img);
}

document.querySelector('.button-container').addEventListener('click', function(event) {
  var input_id = input.value;
  fetch("/complement", {
    method: 'POST',
    body: JSON.stringify({prod_id: input_id}),
    headers: {'Content-Type': 'application/json'}
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      const divElement = document.querySelector(".wrapper");
      const fromElement = document.querySelector(".query-image");
      const img_url_array = data.complement;
      console.log(img_url_array);
      clearQueryImage(fromElement);
      addNewDoggo(divElement, img_url_array);
    })
    .catch(function(err) {
      console.error(err);
    });
});

document.querySelector('.random-button').addEventListener('click', function(event) {
  fetch("/complement")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      const divElement = document.querySelector(".wrapper");
      const from_img_url = data.from_img;
      const fromElement = document.querySelector(".query-image");
      const img_url_array = data.to_img;
      console.log(img_url_array);
      addQueryImage(fromElement, from_img_url);
      addNewDoggo(divElement, img_url_array);
    })
    .catch(function(err) {
      console.error(err);
    });
});