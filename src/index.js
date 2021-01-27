import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import App from './js/App';

ReactDOM.render(<App/>, document.getElementById('root'));

module.hot.accept();
