let cards;
let url;
let modal;

const findElements = () => {
  cards = document.querySelector('.js-fetch-cards');
  url = cards.dataset.fetchAllUrl;
  modal = document.querySelector('.modal__wrapper');
};

// тут для того чтобы поменять статус одной карточки идет проход по всем карточкам. другой вариант - обращаться к конкретной карточке через дом
const changeCardStatus = (status, id) => {
  cards.childNodes.forEach((card) => {
    const assignCard = card;
    if (assignCard.id === id && status === 'отклонённые') {
      assignCard.dataset.status = 'отклонённые';
      assignCard.childNodes[assignCard.childNodes.length - 2].outerHTML = '';
      if (modal.childNodes[1]) {
        // полное погружение какое-то выходит. есть способы написать это менее ебано?
        modal.childNodes[1].childNodes[3].childNodes[9].innerHTML = '';
      }
      // очень ебаный способ менять расположение текста после удаления кнопок, но вместе с этим самый простой
      // другой способ который я вижу делается через 2 обертки и отрицательные маргины в одном из них, но это нагрузит верстку
      assignCard.childNodes[3].style.paddingTop = '60px';
      assignCard.style.display = 'none';
    } else if (assignCard.id === id && status === 'принятые') {
      assignCard.dataset.status = 'принятые';
      assignCard.childNodes[assignCard.childNodes.length - 2].outerHTML = '';
      if (modal.childNodes[1]) {
        modal.childNodes[1].childNodes[3].childNodes[9].innerHTML = '';
      }
      assignCard.childNodes[3].style.paddingTop = '60px';
      assignCard.style.display = 'none';
    }
  });
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
