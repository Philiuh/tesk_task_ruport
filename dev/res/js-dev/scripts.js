import polyfills from 'polyfills/polyfills';
import renderCards from 'cards/renderCards';
import filterCards from 'filter/filterCards';
import selectCards from 'filter/selectCards';
import renderModal from 'modal/renderModal';

polyfills();
renderCards().then(() => {
  filterCards();
  selectCards();
  renderModal();
});
