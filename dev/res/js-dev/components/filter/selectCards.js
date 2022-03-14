import Choices from 'choices.js';

const shouldRun = () => 1;

const findElements = () => {
  const element = document.querySelector('.menu__select');
  const select = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    classNames: {
      focusState: '',
    },
  });
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
};
