let cards;
let url;

const findElements = () => {
  cards = [...document.querySelector('.js-fetch-cards').childNodes];
  url = document.querySelector('.js-fetch-cards').dataset.fetchAllUrl;
};

const changeCardStatus = (status, id) => {
  const card = cards.find((item) => item.id === id);
  card.dataset.status = status;
  card.classList.add('card--processed');
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.classList.add('modal--processed');
  }
  card.style.display = 'none';
};

export function postStatus(id, action) {
  const data = {
    cardId: Number(id),
  };
  try {
    fetch(`${url}${action}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(() => {
      changeCardStatus(
        action === 'reject-bear' ? 'отклонённые' : 'принятые',
        id
      );
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Ошибка: ', error);
  }
}

export default () => {
  findElements();
};
