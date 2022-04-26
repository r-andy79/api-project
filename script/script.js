import Wrapper from './fetch-wrapper.js'
import { buildQuery } from '../buildQuery.js';

const API = new Wrapper('https://api.punkapi.com/v2/beers?')

const btnEl = document.querySelector('button');
const article = document.querySelector('article');
const selectEl = document.querySelector('select');
const formEl = document.querySelector('form');
const beerName = document.querySelector('#beer-name__input');
const abvLevel = document.querySelector('#abv-level');

let prevPageNumber;

const getData = (endpoint => {
  API.get(endpoint)
    .then(data => {
      console.log(data)
      if (data.length > 0) {
        data.forEach(item => {
          insertData(item);
        })
        if(params.page === 1) {
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


const nextBtn = document.createElement("button")
nextBtn.textContent = 'Next page';

const prevBtn = document.createElement("button");
prevBtn.textContent = 'Prev page';

// function inserting data to the website

const insertData = (item) => {
  article.insertAdjacentHTML(
    'beforeend',
    `
    <div class="beer-card">
    <h2>${item.name}</h2>
      <p>Alcohol: <span>${item.abv}%</span>, IBU: <span>${item.ibu}</span></p>
      <p>${item.tagline}</p>
      <p>${item.description}</p>
      <p>It goes great with: ${item.food_pairing}</p>
    </div>
    `
  )
}

const params = {
  page: 1,
  per_page: 3,
}

formEl.addEventListener('submit', event => {
  event.preventDefault();
  params.beer_name = beerName.value;
  article.innerHTML = "";
  getData(buildQuery(params));
})

nextBtn?.addEventListener('click', () => {
  article.innerHTML = "";
  params.page += 1;
  getData(buildQuery(params));
})

prevBtn?.addEventListener('click', () => {
  article.innerHTML = "";
  if (params.page === 1) {
    prevPageNumber = params.page;
  } else {
    prevPageNumber = params.page - 1;
  }
  params.page = prevPageNumber;
  getData(buildQuery(params));
})

selectEl.addEventListener('change', () => {
  params.per_page = selectEl.value;
  console.log(params.per_page);
  params.page = 1;
  article.innerHTML = '';
  getData(buildQuery(params));
})