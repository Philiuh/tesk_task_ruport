import Choices from 'choices.js';

let select;

const shouldRun = () => 1;

const findElements = () => {
  //   select = Choices(document.querySelector('.menu-select'), options);
  select = new Choices(document.getElementsByClassName('.'), {
    callbackOnCreateTemplates(strToEl) {
      const { classNames } = this.config;
      const { itemSelectText } = this.config;
      return {
        item(classNames, data) {
          return strToEl(
            `\
            <div\
              class="${String(classNames.item)} ${String(
              data.highlighted
                ? classNames.highlightedState
                : classNames.itemSelectable
            )}"\
              data-item\
              data-id="${String(data.id)}"\
              data-value="${String(data.value)}"\
              ${String(data.active ? 'aria-selected="true"' : '')}\
              ${String(data.disabled ? 'aria-disabled="true"' : '')}\
              >\
              <span style="margin-right:10px;">🎉</span> ${String(data.label)}\
            </div>\
          `
          );
        },
        choice(classNames, data) {
          return strToEl(
            `\
            <div\
              class="${String(classNames.item)} ${String(
              classNames.itemChoice
            )} ${String(
              data.disabled
                ? classNames.itemDisabled
                : classNames.itemSelectable
            )}"\
              data-select-text="${String(itemSelectText)}"\
              data-choice \
              ${String(
                data.disabled
                  ? 'data-choice-disabled aria-disabled="true"'
                  : 'data-choice-selectable'
              )}\
              data-id="${String(data.id)}"\
              data-value="${String(data.value)}"\
              ${String(data.groupId > 0 ? 'role="treeitem"' : 'role="option"')}\
              >\
              <span style="margin-right:10px;">👉🏽</span> ${String(data.label)}\
            </div>\
          `
          );
        },
      };
    },
  });
};

export default () => {
  if (!shouldRun()) {
    return;
  }
  findElements();
};
