console.log('%c HI', 'color: firebrick')


const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
let breedJson = {};
let breeds =[]


function getPuppy(url) {
  const puppyContainer = document.querySelector("#dog-image-container");
  const image = document.createElement("img");
  image.src = url;
  puppyContainer.appendChild(image);
}

function getBreed(breedEntered) {
  const breedLi = document.querySelector("#dog-breeds");
  const breed = document.createElement("li");
  breed.innerText = breedEntered;
  breed.addEventListener("click", (event) => {
    event.target.style.color = "pink";
  })
  breedLi.appendChild(breed)
}

function fetchImages() {
  fetch(imgUrl)
  .then(res => res.json())
  .then (data => {
    for (let imageUrl of data.message) {
      getPuppy(imageUrl);
    }
  });
}

function fetchBreeds() {
  fetch(breedUrl)
  .then (resp => resp.json())
  .then (data => {
    allBreeds = Object.keys(data.message);
    for ( let breed of allBreeds) {
      getBreed(breed)
    }
  });
}

function selected() {
  let breedLetter = document.querySelector("#breed-dropdown");
  breedLetter.addEventListener("change", (e) => {
    getBreed(breedJson);
    listedBreeds = document.querySelectorAll("li")
    removeList();
    let currentBreeds = [];
    listedBreeds.forEach((element) => {
      let startLetter = element.textContent.slice(0,1);
      if (startLetter === e.target.value){
        currentBreeds.push(element)
      }
    })
    const list = document.querySelector("#dog-breeds");
    currentBreeds.forEach(element => {
      list.append(element);
    })
  })
}

function removeList() {
  document.querySelectorAll("li").forEach(element => element.remove())
}

document.addEventListener("DOMContentLoaded", function() {
  fetchImages()
  fetchBreeds()
  selected()
})
