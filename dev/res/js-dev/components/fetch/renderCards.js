let cards;

const shouldRun = () => document.querySelector('.js-fetch-cards');

const findElements = () => {
  cards = document.querySelector('.js-fetch-cards');
};

const renderCards = (cardsData) => {
  const articleList = cardsData.reduce((articles, article) => {
    return `${articles}
    <article class="card">
      <img class="card-img" src="${article.image_url}" />
      <div class="card-inner">
        <h1 class="card-name">${article.name}</h1>
        <h2 class="card-info">${article.type}</h2>
        <h2 class="card-info">${article.gender}</h2>
      </div>
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
  const url = cards.dataset.fetchUrl;
  const cardsData = await fetch(url)
    .then((response) => response.json())
    .then((json) => json.results.data);
  renderCards(cardsData);
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  fetchCards();
};
