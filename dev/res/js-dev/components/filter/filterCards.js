let unreservedCards;
let button;

const shouldRun = () => document.querySelector('.menu-checkbox');

const findElements = () => {
  button = document.querySelector('.menu-checkbox');
  unreservedCards = document.querySelectorAll('.unreserved');
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  button.addEventListener('change', function filterCards() {
    if (this.checked) {
      unreservedCards.forEach((unreservedCard) => {
        // eslint-disable-next-line no-param-reassign
        unreservedCard.style.display = 'none';
      });
    } else {
      unreservedCards.forEach((unreservedCard) => {
        // eslint-disable-next-line no-param-reassign
        unreservedCard.style.display = 'flex';
      });
    }
  });
};
