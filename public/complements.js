// document
//   .querySelector(".request-complement")
//   .addEventListener("click", function() {
//     fetch("/complement")
//       .then(function(res) {
//         return res.json();
//       })
//       .then(function(data) {
//         document.querySelector(".complement").innerText = data.complement;
//       })
//       .catch(function(err) {
//         console.error(err);
//       });
//   });


const input = document.querySelector('.input-to-copy');

let placeholder_value = "no value";

input.addEventListener("keyup", function() {
  placeholder_value = input.value
});

// document.querySelector('.button-container').addEventListener('click', function(event) {
//   alert(`The entered value is ${placeholder_value}`)
// });


function addNewDoggo(divElement, img_url_array) {
  // const promise = fetch(IMG_URL);
  // console.log('what the fuck is happening');
  // promise
  //   .then(function(response) {
  //     // const processingPromise = response.json();
  //     console.log('sdfgsdfsdfsd');
  //     return processingPromise;
  //   })
  //   .then(function(processedResponse) {
  //     // console.log('sdfsdfsfsdfdsfsdfdssdfsdfsd');
  //     const img = document.createElement("img");
  //     img.src = processedResponse.message;
  //     img.alt = "Prod images";
  //     divElement.appendChild(img);
  //   });
    // const img = document.createElement("img");
    // img.src = IMG_URL;
    // img.alt = "Prod images";

    while (divElement.firstChild) {
      divElement.removeChild(divElement.lastChild);
    }

    for(let i = 0; i < img_url_array.length; i++) {
      let img_url = img_url_array[i];
      const img = document.createElement("img");
      img.src = img_url;
      img.alt = "Prod images";
      divElement.appendChild(img);
    }



    // const img1 = document.createElement("img");
    // img1.src = IMG_URL;
    // img1.alt = "Prod images";

    // divElement.appendChild(img1);

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
      // document.querySelector(".complement").innerText = data.complement;
      const divElement = document.querySelector(".prod-image");
      const img_url_array = data.complement;
      console.log(img_url_array);
      addNewDoggo(divElement, img_url_array);
      // alert(`The entered value is ${data.complement}`);
    })
    .catch(function(err) {
      console.error(err);
    });
});