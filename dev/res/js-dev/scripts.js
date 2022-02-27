import polyfills from 'polyfills/polyfills';
import renderCards from 'fetch/renderCards';
import filterCards from 'filter/filterCards';

polyfills();
renderCards().then(filterCards);
