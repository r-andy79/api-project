import Wrapper from './fetch-wrapper.js'

const API = new Wrapper('https://api.punkapi.com/v2/beers?')

const btnEl = document.querySelector('button');
const article = document.querySelector('article');
const formEl = document.querySelector('form');
const abv = document.querySelector('#abv');

let currentPageNumber = 1;
let prevPageNumber;

const getData = (endpoint => {
  API.get(endpoint)
    .then(data => {
      console.log(data)
      if (data.length > 0) {
        data.forEach(item => {
          insertData(item);
        })
        if(currentPageNumber === 1) {
          article.appendChild(nextBtn)
        } else {
          article.appendChild(prevBtn);
          article.appendChild(nextBtn);
        }

      } else if (data.length === 0) {
        article.insertAdjacentHTML('beforeend', `<p>No more beers to show :(. Please go back to the previous page</p>`)
        article.appendChild(prevBtn)
      }
    })
})


const buildQuery = (obj = {}) => {
  let searchParams = new URLSearchParams(obj);
  return searchParams.toString();
}


formEl.addEventListener('submit', event => {
  event.preventDefault();
  getData(buildQuery({}));
})


const nextBtn = document.createElement("button")
nextBtn.textContent = 'Next page';

const prevBtn = document.createElement("button");
prevBtn.textContent = 'Prev page';

// function inserting data to the website

const insertData = (item) => {
  article.insertAdjacentHTML(
    'beforeend',
    `<h2>${item.name}</h2>
      <p>Alcohol: <span>${item.abv}%</span>, IBU: <span>${item.ibu}</span></p>
      <p>${item.tagline}</p>
      <p>${item.description}</p>
      <p>It goes great with: ${item.food_pairing}</p>
    `
  )
}


btnEl.addEventListener('click', () => {
  article.innerHTML = "";
  getData(currentPageNumber)
})

nextBtn?.addEventListener('click', () => {
  article.innerHTML = "";
  getData(currentPageNumber + 1);
  currentPageNumber += 1;
})

prevBtn?.addEventListener('click', () => {
  article.innerHTML = "";
  if (currentPageNumber === 1) {
    prevPageNumber = currentPageNumber;
  } else {
    prevPageNumber = currentPageNumber - 1;
  }
  getData(prevPageNumber);
  currentPageNumber -= 1;
})