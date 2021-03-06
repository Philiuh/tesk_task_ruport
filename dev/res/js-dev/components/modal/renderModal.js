import postStatus from '../fetch/postStatus';

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

/* eslint-disable camelcase */
const createModal = (
  { id, in_reserve, image_url, name, type, gender, text },
  { dataset }
) => {
  return `
  <div id=${id} class="
    card
    modal
    ${in_reserve ? 'card--reserved' : ''}
    ${dataset.status === 'входящие' ? '' : 'modal--processed'}
  ">
    <img class="card__img" src="${image_url}" />
    <div class="modal__inner">
      <h2 class="card__name">${name}</h2>
      <p class="card__info">${type}</p>
      <p class="card__info">${gender}</p>
      <p class="modal__description">${text}</p>
      <div class="modal__button-list">
        <button class="card__button modal__button">Принять</button>
        <button class="card__button card__button--reject modal__button">Отклонить</button>
      </div>
    </div>
  </div>`;
};
/* eslint-enable camelcase */

const closeButtonOnClick = () => {
  modalCard.innerHTML = '';
  modalCardContainer.style.visibility = 'hidden';
};

const renderModal = (cardData, card) => {
  const rawModalCard = createModal(cardData, card);
  modalCard.insertAdjacentHTML('afterbegin', rawModalCard);
  modalCardContainer.style.visibility = 'visible';
};

const errorHandler = (error) => {
  // eslint-disable-next-line no-alert
  alert(error);
};

const cardListOnClick = ({ target, path }) => {
  if (target.tagName === 'BUTTON' || target.classList.contains('cards')) return;
  const card = path.find((cardArticle) => cardArticle.id);
  fetchCard(card.id)
    .then((response) => renderModal(response, card))
    .catch(errorHandler);
};

const modalContainerOnClick = ({ target, path }) => {
  const card = path.find((cardArticle) => cardArticle.id);
  if (
    target.tagName === 'BUTTON' &&
    target.classList.contains('card__button--reject')
  ) {
    postStatus(card.id, 'reject-bear');
  } else if (
    target.tagName === 'BUTTON' &&
    target.className !== 'modal__close-button'
  ) {
    postStatus(card.id, 'resolve-bear');
  }
};

const subscribe = () => {
  closeButton.addEventListener('click', closeButtonOnClick);
  cardList.addEventListener('click', cardListOnClick);
  modalCardContainer.addEventListener('click', modalContainerOnClick);
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  subscribe();
};
