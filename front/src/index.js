import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import { Provider } from 'react-redux';
import store from './redux/store' ;
import toastr from 'toastr'
import "toastr/build/toastr.css"

import './style.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <Router />
        </Provider>
  </React.StrictMode>
);
