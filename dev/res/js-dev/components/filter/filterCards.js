let unreservedCards;
let button;

const shouldRun = () => document.querySelector('.menu-checkbox');

const findElements = () => {
  button = document.querySelector('.menu-checkbox');
  unreservedCards = document.querySelectorAll('.unreserved');
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
  if (button.checked) {
    hideCards();
  } else {
    showCards();
  }
};

const subscribeFilter = () => {
  button.addEventListener('change', onChange);
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  subscribeFilter();
};
