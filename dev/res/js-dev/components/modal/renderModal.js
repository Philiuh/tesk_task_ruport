/* eslint-disable camelcase */
let url;
let cardList;
let modalCardContainer;
let modalCard;

const shouldRun = () => document.querySelector('.card');

const findElements = () => {
  cardList = document.querySelector('.js-fetch-cards');
  modalCardContainer = document.querySelector('.modal__background');
  modalCard = document.querySelector('.modal__wrapper');
  url = cardList.dataset.fetchOneUrl;
};

const fetchCard = async (id) =>
  fetch(url + id)
    .then((response) => response.json())
    .then((json) => json.data);

const createModal = ({ in_reserve, image_url, name, type, gender, text }) => {
  return `
  <div class="${
    in_reserve ? 'card--reserved reserved reserved--modal' : 'card'
  } modal" >
    <img class="card__img modal__img" src="${image_url}" />
    <div class="modal__container">
      <h2 class="card__name modal__name">${name}</h2>
      <p class="card__info modal__info">${type}</p>
      <p class="card__info modal_info">${gender}</p>
      <p class="card__info modal__text">${text}</p>
      <div class="card__button-list modal__button-list">
        <button class="card__button modal__button accept">Принять</button>
        <button class="card__button modal__button reject">Отклонить</button>
      </div>
    </div>
  </div>`;
};

const closeButtonOnClick = (eventData) => {
  if (eventData.target.classList.contains('modal__close-button')) {
    modalCard.innerHTML = '';
    modalCardContainer.style.visibility = 'hidden';
  }
};
const sunscribeCloseButton = () =>
  modalCardContainer.addEventListener('click', closeButtonOnClick);

const renderModal = (cardData) => {
  const rawModalCard = createModal(cardData);
  modalCard.insertAdjacentHTML('afterbegin', rawModalCard);
  modalCardContainer.style.visibility = 'visible';
  sunscribeCloseButton();
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

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  subscribeModal();
};
