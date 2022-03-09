let cards;
let url;

const shouldRun = () => document.querySelector('.js-fetch-cards');

const findElements = () => {
  cards = document.querySelector('.js-fetch-cards');
  url = cards.dataset.fetchAllUrl;
};

const createCards = (articles, article) => {
  return `${articles}
  <article id='${article.id}'
  class="card ${article.in_reserve ? 'reserved' : 'unreserved'}" >
    ${
      article.in_reserve
        ? '<div class="reserved-img"><p class="reserved-announcement">В заповеднике</p></div>'
        : ''
    }
    <img class="card-img" src="${article.image_url}" />
      <h2 class="card-name ${article.in_reserve ? 'reserved-text' : ''}">${
    article.name
  }</h2>
      <p class="card-info ${article.in_reserve ? 'reserved-text' : ''}">${
    article.type
  }</p>
      <p class="card-info ${article.in_reserve ? 'reserved-text' : ''}">${
    article.gender
  }</p>
    <div class="card-button-list">
      <button class="card-button accept">Принять</button>
      <button class="card-button reject ${
        article.in_reserve ? 'reserved-button' : ''
      }">Отклонить</button>
    </div>
  </article>`;
};

const renderCards = (cardsData) => {
  return new Promise((resolve) => {
    const articleList = cardsData.reduce(createCards, []);
    cards.insertAdjacentHTML('afterbegin', articleList);
    resolve();
  });
};

const fetchCards = async () => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => json.results.data);
};

export default async () => {
  if (!shouldRun()) {
    return Promise.reject();
  }
  findElements();
  return fetchCards().then(renderCards);
};
