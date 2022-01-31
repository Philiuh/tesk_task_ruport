let unreservedCards;
let button;

const shouldRun = () => document.querySelector('.menu-checkbox');

const findElements = () => {
  unreservedCards = document.querySelectorAll('.unreserved');
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  button = document.querySelector('.menu-checkbox');
  button.addEventListener('change', function filterCards() {
    findElements();
    if (this.checked) {
      for (let i = 0; i < unreservedCards.length; i += 1) {
        unreservedCards[i].style.display = 'none';
      }
    } else {
      for (let i = 0; i < unreservedCards.length; i += 1) {
        unreservedCards[i].style.display = 'flex';
      }
    }
  });
};
