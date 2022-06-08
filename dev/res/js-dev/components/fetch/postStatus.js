let cards;
let url;

const findElements = () => {
  cards = document.querySelector('.js-fetch-cards');
  url = cards.dataset.fetchAllUrl;
  cards = [...cards.childNodes];
};

const changeCardStatus = (status, id) => {
  const card = cards.find((item) => item.id === id);
  card.dataset.status = status;
  // удаление кнопок с карточки
  card.childNodes[card.childNodes.length - 2].outerHTML = '';
  const modalButtons = document.querySelector('.modal__button-list');
  if (modalButtons) {
    modalButtons.innerHTML = '';
  }
  // добавление отступа классу card__name в карточках
  card.childNodes[3].style.paddingTop = '60px';
  card.style.display = 'none';
};

function postStatus(id, action) {
  const data = {
    cardId: Number(id),
  };

  try {
    fetch(`${url}${action}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Ошибка: ', error);
  }
}

// только такой способ смог придумать без засовывания findElements внутрь другой функции
export const buttonOnClick = ({ target, path }) => {
  const card = path.find((cardArticle) => cardArticle.id);
  if (
    target.tagName === 'BUTTON' &&
    target.classList.contains('card__button--reject')
  ) {
    changeCardStatus('отклонённые', card.id);
    postStatus(card.id, 'reject-bear');
  } else if (
    target.tagName === 'BUTTON' &&
    target.className !== 'modal__close-button'
  ) {
    changeCardStatus('принятые', card.id);
    postStatus(card.id, 'resolve-bear');
  }
};

export default () => {
  findElements();
};
