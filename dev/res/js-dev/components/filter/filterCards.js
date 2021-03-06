let cards;
let checkbox;
let select;

const shouldRun = () => document.querySelector('.menu__checkbox');

const findElements = () => {
  checkbox = document.querySelector('.menu__checkbox');
  cards = document.querySelectorAll('.card');
  select = document.querySelector('.menu__select');
};

const hideCards = () => {
  cards.forEach((card) => {
    const assignCard = card;
    if (!assignCard.classList.value.includes('card--reserved')) {
      assignCard.style.display = 'none';
    }
  });
};

const showCards = () => {
  cards.forEach((card) => {
    const assignCard = card;
    if (
      !assignCard.classList.value.includes('card--reserved') &&
      select.childNodes[0].value
        .toLowerCase()
        .includes(assignCard.dataset.status)
    ) {
      assignCard.style.display = 'flex';
    }
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
