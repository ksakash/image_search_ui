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
      const img_url_array = data.complement;
      console.log(img_url_array);
      addNewDoggo(divElement, img_url_array);
    })
    .catch(function(err) {
      console.error(err);
    });
});