import Choices from 'choices.js';

let element;
let select;

const selectOptions = [
  'Входящие медведи',
  'Принятые медведи',
  'Отклонённые медведи',
];

const shouldRun = () => 1;

const findElements = () => {
  element = document.querySelector('.menu__select');
  select = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    allowHTML: true,
    removeItems: true,
  });
};

const removeSelectedOption = (selectedOption) => {
  select.removeActiveItems();
  const filteredArray = selectOptions.filter(
    (option) => option !== selectedOption
  );
  select.setChoices(
    [
      { value: filteredArray[0], label: filteredArray[0] },
      { value: filteredArray[1], label: filteredArray[1] },
    ],
    'value',
    'label',
    true
  );
};

const chooseSelectElement = (event) => {
  switch (event.detail.choice.value) {
    case selectOptions[0]:
      removeSelectedOption(selectOptions[0]);
      break;
    case selectOptions[1]:
      removeSelectedOption(selectOptions[1]);
      break;
    case selectOptions[2]:
      removeSelectedOption(selectOptions[2]);
      break;
    default:
      break;
  }
};

const subscribeSelect = () => {
  select.setChoices(
    [
      { value: 'Отклонённые медведи', label: 'Отклонённые медведи' },
      { value: 'Принятые медведи', label: 'Принятые медведи' },
    ],
    'value',
    'label',
    true
  );
  element.addEventListener('choice', chooseSelectElement);
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  subscribeSelect();
};
