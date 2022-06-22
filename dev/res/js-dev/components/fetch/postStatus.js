import changeCardStatus from '../utilities/changeStatus';

let url;

const findElements = () => {
  url = document.querySelector('.js-fetch-cards').dataset.fetchAllUrl;
};

const postStatus = (id, action) => {
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
};

export default (id, action) => {
  findElements();
  postStatus(id, action);
};
