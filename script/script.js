const btnEl = document.querySelector('button');
const article = document.querySelector('article');


btnEl.addEventListener('click', () => {
  article.innerHTML = "";
  fetch('https://api.punkapi.com/v2/beers/random')
  .then(response => response.json())
  .then(data => {
    console.log(data[0]);
    article.insertAdjacentHTML(
      'afterbegin',
      `<h2>${data[0].name}</h2>
      <p>Alcohol: <span>${data[0].abv}%</span>, IBU: <span>${data[0].ibu}</span></p>
       <img src=${data[0].image_url}>
       <p>${data[0].tagline}</p>
       <p>${data[0].description}</p>
       <p>It goes great with: ${data[0].food_pairing}</p>
      `
      )
  })
})
