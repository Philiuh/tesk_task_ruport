import polyfills from 'polyfills/polyfills';
import renderCards from 'fetch/renderCards';
import filterCards from 'filter/filterCards';
import selectCards from 'filter/selectCards';
import renderModal from 'modal/renderModal';

polyfills();
renderCards().then(() => {
  filterCards();
  selectCards();
  renderModal();
});
