import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = document.getElementById("root");
const container = ReactDOMClient.createRoot(root);

// Need to wrap element around DndProvider component to use the drag-and-drop feature.
container.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
);
