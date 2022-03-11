import polyfills from 'polyfills/polyfills';
import renderCards from 'fetch/renderCards';
import filterCards from 'filter/filterCards';
import selectCards from 'filter/selectCards';

polyfills();
renderCards().then(() => {
  filterCards();
  selectCards();
});
