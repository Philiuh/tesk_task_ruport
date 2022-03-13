import Choices from 'choices.js';
import 'choices.js/src/styles/choices.scss';

let select;

const shouldRun = () => 1;

const findElements = () => {
  const element = document.querySelector('.menu-select');
  console.log(element);
  select = new Choices(element, {
    searchEnabled: false,
  });
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
};
