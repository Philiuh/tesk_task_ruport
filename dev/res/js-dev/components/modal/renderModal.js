/* eslint-disable camelcase */
let url;
let cardList;
let modalCardContainer;
let modalCard;
let closeButton;

const shouldRun = () => document.querySelector('.card');

const findElements = () => {
  cardList = document.querySelector('.js-fetch-cards');
  modalCardContainer = document.querySelector('.modal__container');
  modalCard = document.querySelector('.modal__wrapper');
  closeButton = document.querySelector('.modal__close-button');
  url = cardList.dataset.fetchOneUrl;
};

const fetchCard = (id) => {
  return fetch(url + id)
    .then((response) => response.json())
    .then((json) => json.data);
};

const createModal = ({ in_reserve, image_url, name, type, gender, text }) => {
  return `
  <div class="${
    in_reserve ? 'card--reserved reserved reserved--modal' : 'card'
  } modal" >
    <img class="card__img modal__img" src="${image_url}" />
    <div class="modal__inner">
      <h2 class="card__name modal__name">${name}</h2>
      <p class="card__info modal__info">${type}</p>
      <p class="card__info modal_info">${gender}</p>
      <p class="card__info modal__text">${text}</p>
      <div class="card__button-list modal__button-list">
        <button class="card__button modal__button">Принять</button>
        <button class="card__button--reject modal__button">Отклонить</button>
      </div>
    </div>
  </div>`;
};

const closeButtonOnClick = () => {
  modalCard.innerHTML = '';
  modalCardContainer.style.visibility = 'hidden';
};

const sunscribeCloseButton = () => {
  closeButton.addEventListener('click', closeButtonOnClick);
};

const renderModal = (cardData) => {
  const rawModalCard = createModal(cardData);
  modalCard.insertAdjacentHTML('afterbegin', rawModalCard);
  modalCardContainer.style.visibility = 'visible';
};

const errorHandler = (error) => {
  // eslint-disable-next-line no-alert
  alert(error);
};

const modalOnClick = ({ target, path }) => {
  if (target.tagName === 'BUTTON' || target.classList.contains('cards')) return;
  const card = path.find((cardArticle) => cardArticle.id);
  fetchCard(card.id).then(renderModal).catch(errorHandler);
};

const subscribeModal = () => cardList.addEventListener('click', modalOnClick);

const subscribe = () => {
  sunscribeCloseButton();
  subscribeModal();
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  subscribe();
};
