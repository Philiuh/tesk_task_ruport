import Choices from 'choices.js';

let element;
let select;
let cards;
let options;
let checkbox;
let pageTitle;
const selectOptions = [];

const shouldRun = () => document.querySelector('.menu__select');

const findElements = () => {
  cards = document.querySelectorAll('.card');
  checkbox = document.querySelector('.menu__checkbox');
  options = document.querySelectorAll('.menu__option');
  pageTitle = document.querySelector('.menu__text');
  for (let i = 0; i < options.length; i += 1) {
    selectOptions.push(options[i].value);
  }
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

const changePageTitle = (selectStatus) => {
  if (selectStatus !== 'входящие') {
    pageTitle.innerHTML = `${
      selectStatus[0].toUpperCase() + selectStatus.slice(1)
    } медведи`;
  } else pageTitle.innerHTML = 'Поступившие заявки';
};

const changeCardsVisibility = (cardStatus) => {
  if (checkbox.checked) {
    cards.forEach((card) => {
      const assignCard = card;
      if (
        !(assignCard.dataset.status === cardStatus) ||
        !assignCard.classList.value.includes('card--reserved')
      ) {
        assignCard.style.display = 'none';
      } else assignCard.style.display = 'flex';
    });
  } else
    cards.forEach((card) => {
      const assignCard = card;
      if (!(assignCard.dataset.status === cardStatus)) {
        assignCard.style.display = 'none';
      } else assignCard.style.display = 'flex';
    });
  changePageTitle(cardStatus);
};

const chooseSelectElement = (event) => {
  switch (event.detail.choice.value) {
    // incoming
    case selectOptions[0]:
      removeSelectedOption(selectOptions[0]);
      changeCardsVisibility('входящие');
      break;
    // taken
    case selectOptions[1]:
      removeSelectedOption(selectOptions[1]);
      changeCardsVisibility('принятые');
      break;
    // dismissed
    case selectOptions[2]:
      removeSelectedOption(selectOptions[2]);
      changeCardsVisibility('отклонённые');
      break;
    default:
      break;
  }
};

const subscribeSelect = () => {
  select.setChoices(
    [
      { value: selectOptions[1], label: selectOptions[1] },
      { value: selectOptions[2], label: selectOptions[2] },
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
