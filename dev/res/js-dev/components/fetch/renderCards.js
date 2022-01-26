const renderCards = async () => {
  const url = document.querySelector('.js-fetch-cards').dataset.fetchUrl;
  const rawArticleList = await fetch(url)
    .then((response) => response.json())
    .then((commits) => commits.results.data);

  const articleList = rawArticleList.reduce((articles, article) => {
    return `${articles}
    <article class="card">
      <div class="card-data">
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
      </div>
    </article>
    `;
  }, []);

  const cards = document.querySelector('.js-fetch-cards');
  cards.insertAdjacentHTML('afterbegin', articleList);
};

export default renderCards;
