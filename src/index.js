import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout';
import './index.css';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './redux/store';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
