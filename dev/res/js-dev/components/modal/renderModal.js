let cardList;
let url;
let modalCard;

const shouldRun = () => document.querySelector('.card');

const findElements = () => {
  cardList = document.querySelector('.js-fetch-cards');
  url = cardList.dataset.fetchOneUrl;
};

const findModalCard = () => {
  modalCard = document.querySelector('.modal');
};

const fetchCard = async (id) =>
  fetch(url + id)
    .then((response) => response.json())
    .then((json) => json.data);

const createModal = (cardData) => {
  return `
  <div class="modal">
    <div class="card ${cardData.in_reserve ? 'reserved' : ''} card--modal">
      <button class="close-button--modal"></button>
      ${
        cardData.in_reserve
          ? '<div class="reserved-img"><p class="reserved-announcement reserved-announcement--modal">В заповеднике</p></div>'
          : ''
      }
      <img src="${cardData.image_url}" class="card-img--modal">
      <h2 class="card-name ${
        cardData.in_reserve ? 'reserved-text' : ''
      } card-name--modal">${cardData.name}</h2>
      <p class="card-info ${
        cardData.in_reserve ? 'reserved-text' : ''
      } card-info--modal">${cardData.type}</p>
      <p class="card-info ${
        cardData.in_reserve ? 'reserved-text' : ''
      } card-info--modal">${cardData.gender}</p>
      <p class="card-info ${
        cardData.in_reserve ? 'reserved-text' : ''
      } card-text--modal">${cardData.text}</p>
      <div class="card-button-list--modal">
          <button class="card-button accept card-button--modal">Принять</button>
          <button class="card-button reject ${
            cardData.in_reserve ? 'reserved-button' : ''
          } card-button--modal">Отклонить</button>
      </div>
    </div>
  </div>`;
};

// норм ли засовывать document.body в переменную, или лучше обойтись без переменной?
const closeButtonOnClick = (eventData) => {
  if (eventData.target.classList.contains('close-button--modal')) {
    document.body.removeChild(modalCard);
  }
};
const sunscribeCloseButton = () =>
  modalCard.addEventListener('click', closeButtonOnClick);

const renderModal = (cardData) => {
  const rawModalCard = createModal(cardData);
  cardList.insertAdjacentHTML('afterend', rawModalCard);
  findModalCard();
  sunscribeCloseButton();
};

// в кэтче ловлю тут ошибку Uncaught (in promise) SyntaxError: Unexpected token < in JSON at position 0
// мне ее надо обрабатывать?
const modalOnClick = (eventData) => {
  if (
    eventData.target.tagName === 'BUTTON' ||
    eventData.target.classList.contains('cards')
  )
    return;
  const card = eventData.path.find((cardArticle) => cardArticle.id);
  fetchCard(card.id).then(renderModal).catch();
};

const subscribeModal = () => cardList.addEventListener('click', modalOnClick);

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  subscribeModal();
};
