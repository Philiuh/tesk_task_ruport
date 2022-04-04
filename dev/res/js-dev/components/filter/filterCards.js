let cards;
let checkbox;

const shouldRun = () => document.querySelector('.menu-checkbox');

const findElements = () => {
  checkbox = document.querySelector('.menu-checkbox');
  cards = document.querySelectorAll('.card');
};

const hideCards = () => {
  cards.forEach((card) => {
    const assignCard = card;
    if (assignCard.className === 'card') assignCard.style.display = 'none';
  });
};

const showCards = () => {
  cards.forEach((card) => {
    const assignCard = card;
    if (assignCard.className === 'card') assignCard.style.display = 'flex';
  });
};

const onChange = () => {
  if (checkbox.checked) {
    hideCards();
  } else {
    showCards();
  }
};

const subscribeFilter = () => {
  checkbox.addEventListener('change', onChange);
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  subscribeFilter();
};
