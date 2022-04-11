import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = document.getElementById("root");
const container = ReactDOMClient.createRoot(root);

container.render(
  <Provider store={store}>
    <App />
  </Provider>
);
