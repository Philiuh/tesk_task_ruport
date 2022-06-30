import Choices from 'choices.js';

let selectContainer;
let select;
let cards;
let checkbox;
let pageTitle;

const optionsStatus = {
  incoming: {
    value: 'входящие',
    label: 'Входящие медведи',
  },
  accepted: {
    value: 'принятые',
    label: 'Принятые медведи',
  },
  rejected: {
    value: 'отклонённые',
    label: 'Отклонённые медведи',
  },
};

const selectedOption = {
  [optionsStatus.incoming.value]: optionsStatus.incoming,
  [optionsStatus.accepted.value]: optionsStatus.accepted,
  [optionsStatus.rejected.value]: optionsStatus.rejected,
};

const shouldRun = () => document.querySelector('.menu__select');

const findElements = () => {
  cards = document.querySelectorAll('.card');
  checkbox = document.querySelector('.menu__checkbox');
  pageTitle = document.querySelector('.menu__text');
  selectContainer = document.querySelector('.menu__select');
  select = new Choices(selectContainer, {
    searchEnabled: false,
    itemSelectText: '',
    allowHTML: true,
    removeItems: true,
  });
};

const filterChoices = (value) => {
  return Object.entries(optionsStatus)
    .flat()
    .filter((option) => option.value && option.value !== value);
};

const removeSelectedOption = (optionStatus) => {
  select.removeActiveItems();
  select.setChoices(filterChoices(optionStatus), 'value', 'label', true);
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

const onChoiceChange = (event) => {
  const option = selectedOption[event.detail.choice.value].value;
  removeSelectedOption(option);
  changeCardsVisibility(option);
};

const subscribeSelect = () => {
  select.setChoices(filterChoices('входящие'), 'value', 'label', true);
  selectContainer.addEventListener('choice', onChoiceChange);
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
  subscribeSelect();
};
