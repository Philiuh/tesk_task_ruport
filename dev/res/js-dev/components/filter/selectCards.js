import Choices from 'choices.js';

let element;
let select;
let cards;
let checkbox;
let pageTitle;

const optionsStatus = {
  incoming: {
    label: 'Входящие медведи',
    key: 'входящие',
  },
  accepted: {
    label: 'Принятые медведи',
    key: 'принятые',
  },
  rejected: {
    label: 'Отклонённые медведи',
    key: 'отклонённые',
  },
};

const selectedOption = {
  [optionsStatus.accepted.label]: optionsStatus.accepted,
  [optionsStatus.incoming.label]: optionsStatus.incoming,
  [optionsStatus.rejected.label]: optionsStatus.rejected,
};

const shouldRun = () => document.querySelector('.menu__select');

const findElements = () => {
  cards = document.querySelectorAll('.card');
  checkbox = document.querySelector('.menu__checkbox');
  pageTitle = document.querySelector('.menu__text');
  element = document.querySelector('.menu__select');
  select = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    allowHTML: true,
    removeItems: true,
  });
};

function removeSelectedOption(optionStatus) {
  select.removeActiveItems();

  const restOptions = Object.values(optionsStatus)
    .map((option) => Object.values(option))
    .flat()
    .filter((option) => option.includes('медведи') && option !== optionStatus);

  select.setChoices(
    [
      { value: restOptions[0], label: restOptions[0] },
      { value: restOptions[1], label: restOptions[1] },
    ],
    'value',
    'label',
    true
  );
}

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

function onChoiceChange(option) {
  removeSelectedOption(option.label);
  changeCardsVisibility(option.key);
}

const chooseSelectElement = (event) => {
  onChoiceChange(selectedOption[event.detail.choice.value]);
};

const subscribeSelect = () => {
  select.setChoices(
    [
      {
        value: optionsStatus.accepted.label,
        label: optionsStatus.accepted.label,
      },
      {
        value: optionsStatus.rejected.label,
        label: optionsStatus.rejected.label,
      },
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
