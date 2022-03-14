/* eslint-disable camelcase */
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

const createModal = ({ in_reserve, image_url, name, type, gender, text }) => {
  return `
  <div class="modal">
    <div class="card ${in_reserve ? 'reserved' : ''} card--modal">
      <button class="close-button--modal"></button>
      ${
        in_reserve
          ? '<div class="reserved-img"><p class="reserved-announcement reserved-announcement--modal">В заповеднике</p></div>'
          : ''
      }
      <img src="${image_url}" class="card-img--modal">
      <h2 class="card-name ${
        in_reserve ? 'reserved-text' : ''
      } card-name--modal">${name}</h2>
      <p class="card-info ${
        in_reserve ? 'reserved-text' : ''
      } card-info--modal">${type}</p>
      <p class="card-info ${
        in_reserve ? 'reserved-text' : ''
      } card-info--modal">${gender}</p>
      <p class="card-info ${
        in_reserve ? 'reserved-text' : ''
      } card-text--modal">${text}</p>
      <div class="card-button-list--modal">
          <button class="card-button accept card-button--modal">Принять</button>
          <button class="card-button reject ${
            in_reserve ? 'reserved-button' : ''
          } card-button--modal">Отклонить</button>
      </div>
    </div>
  </div>`;
};

const closeButtonOnClick = (eventData) => {
  if (eventData.target.classList.contains('close-button--modal')) {
    document.body.removeChild(modalCard);
  }
};
const sunscribeCloseButton = () =>
  modalCard.addEventListener('click', closeButtonOnClick);

const renderModal = (cardData, error) => {
  const rawModalCard = createModal(cardData, error);
  cardList.insertAdjacentHTML('afterend', rawModalCard);
  findModalCard();
  sunscribeCloseButton();
};

// решил сделать просто вывод ошибки через алерт,
// тк не придумал, как можно еще выводить ошибку,
// чтоб не выглядело ебано
const errorHandler = (error) => {
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
