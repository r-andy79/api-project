export const buildQuery = (obj = {}) => {
  let searchParams = new URLSearchParams(obj);
  console.log({searchParams});
  console.log({obj});
  return searchParams.toString();
}

export class FetchWrapper {
  constructor(baseURL) {
    this.baseURL = baseURL
  }
  get(endpoint) {
    return fetch(this.baseURL + endpoint, {
      headers: {
        "Content-Type": "application-json"
      }
    }).then(response => response.json())
  }
}


export const insertData = (item, article) => {
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
  return article
}


export const buildView = (data, params, nextBtn, prevBtn, article) => {
  article.innerHTML = "";

  if (data.length > 0) {
    data.forEach(item => {
      insertData(item, article);
    })
    if(params.page === 1) {
      article.appendChild(nextBtn)
    } else {
      article.appendChild(prevBtn);
      article.appendChild(nextBtn);
    }
  } else {
    article.insertAdjacentHTML('beforeend', `<p>No more beers to show :(. Please go back to the previous page</p>`)
    article.appendChild(prevBtn)
  }
}