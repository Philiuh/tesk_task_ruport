/* eslint-disable camelcase */
let cards;
let url;

const shouldRun = () => document.querySelector('.js-fetch-cards');

const findElements = () => {
  cards = document.querySelector('.js-fetch-cards');
  url = cards.dataset.fetchAllUrl;
};

const createCards = (
  articles,
  { id, in_reserve, name, image_url, type, gender }
) => {
  return `${articles}
    <article id='${id}'
    class="${in_reserve ? 'card--reserved reserved' : 'card'}" >
      <img class="card__img" src="${image_url}" />
      <h2 class="card__name">${name}</h2>
      <p class="card__info">${type}</p>
      <p class="card__info">${gender}</p>
      <div class="card__button-list">
        <button class="card__button accept">Принять</button>
        <button class="card__button reject">Отклонить</button>
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
