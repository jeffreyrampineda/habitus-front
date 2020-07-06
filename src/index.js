import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import createStore from './store/configureStore';
import './custom.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = JSON.parse('{}');

const urlParams = new URLSearchParams(window.location.search);
const currentUrl = urlParams.get('url');

ReactDOM.render(
  <React.StrictMode>
    <Root store={createStore(initialState)} currentUrl={currentUrl}/>
  </React.StrictMode>,
  document.getElementById('root')
);
