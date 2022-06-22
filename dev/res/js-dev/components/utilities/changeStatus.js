let cards;

const findElements = () => {
  cards = [...document.querySelector('.js-fetch-cards').childNodes];
};

const changeCardStatus = (status, id) => {
  const card = cards.find((item) => item.id === id);
  card.dataset.status = status;
  card.classList.add('card--processed');
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.classList.add('modal--processed');
  }
  card.style.display = 'none';
};

export default (status, id) => {
  findElements();
  changeCardStatus(status, id);
};
