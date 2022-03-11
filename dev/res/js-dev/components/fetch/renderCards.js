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
  class="card ${in_reserve ? 'reserved' : 'unreserved'}" >
    ${
      in_reserve
        ? '<div class="reserved-img"><p class="reserved-announcement">В заповеднике</p></div>'
        : ''
    }
    <img class="card-img" src="${image_url}" />
      <h2 class="card-name ${in_reserve ? 'reserved-text' : ''}">${name}</h2>
      <p class="card-info ${in_reserve ? 'reserved-text' : ''}">${type}</p>
      <p class="card-info ${in_reserve ? 'reserved-text' : ''}">${gender}</p>
    <div class="card-button-list">
      <button class="card-button accept">Принять</button>
      <button class="card-button reject ${
        in_reserve ? 'reserved-button' : ''
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
