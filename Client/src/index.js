import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import './index.css';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://mashatest.frontegg.com',
  clientId: 'efe1299b-9a3a-436a-8999-2d6919f40b41'
};

ReactDOM.render(
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
        <App />
    </FronteggProvider>,
    document.getElementById('root')
);