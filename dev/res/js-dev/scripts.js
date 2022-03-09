import polyfills from 'polyfills/polyfills';
import renderCards from 'fetch/renderCards';
import filterCards from 'filter/filterCards';
import renderModal from 'modal/renderModal';

polyfills();
renderCards().then(filterCards).then(renderModal);
