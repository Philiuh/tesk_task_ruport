let unreservedCards;
let checkbox;

const shouldRun = () => document.querySelector('.menu-checkbox');

const findElements = () => {
  checkbox = document.querySelector('.menu-checkbox');
  unreservedCards = document.querySelectorAll('.card');
};

const hideCards = () => {
  unreservedCards.forEach((unreservedCard) => {
    const changedUnreservedCard = unreservedCard;
    changedUnreservedCard.style.display = 'none';
  });
};

const showCards = () => {
  unreservedCards.forEach((unreservedCard) => {
    const changedUnreservedCard = unreservedCard;
    changedUnreservedCard.style.display = 'flex';
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
