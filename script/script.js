import { FetchWrapper, buildQuery, buildView } from './functions.js'

const API = new FetchWrapper('https://api.punkapi.com/v2/beers?')

const selectEl = document.querySelector('select');
const formEl = document.querySelector('form');
const beerName = document.querySelector('#beer-name__input');
const article = document.querySelector('article');

const nextBtn = document.createElement("button")
nextBtn.textContent = 'Next page';

const prevBtn = document.createElement("button");
prevBtn.textContent = 'Prev page';

const params = {
  page: 1,
  per_page: 3,
}


formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  if(beerName.value !== "") params.beer_name = beerName.value;

  dry()
})

nextBtn?.addEventListener('click', () => {
  params.page += 1;

  dry()
})

prevBtn?.addEventListener('click', () => {
  if (params.page !== 1) {
    params.page -= 1;
  }

  dry()
})

selectEl.addEventListener('change', () => {
  params.per_page = selectEl.value;
  params.page = 1;
  
  dry()
})

const dry = async () => {
  buildView(await API.get(buildQuery(params)), params, nextBtn, prevBtn, article)
}
