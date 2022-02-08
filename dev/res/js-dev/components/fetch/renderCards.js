let cards;
let url;

const shouldRun = () => document.querySelector('.js-fetch-cards');

const findElements = () => {
  cards = document.querySelector('.js-fetch-cards');
  url = cards.dataset.fetchUrl;
};

const renderCards = (cardsData) => {
  const articleList = cardsData.reduce((articles, article) => {
    return `${articles}
    <article class="card">
      <img class="card-img" src="${article.image_url}" />
      <h2 class="card-name">${article.name}</h2>
      <p class="card-info">${article.type}</p>
      <p class="card-info">${article.gender}</p>
      <div class="card-button-list">
        <button class="card-button accept">Принять</button>
        <button class="card-button reject">Отклонить</button>
      </div>
    </article>
    `;
  }, []);
  cards.insertAdjacentHTML('afterbegin', articleList);
};

const fetchCards = async () => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => json.results.data);
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  fetchCards().then(renderCards);
};
