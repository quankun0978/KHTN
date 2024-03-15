import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { DASHBOARD } from '@/router/routes';
import RootApp from '@/RootApp';
import '@/config/ensureBasename';

import 'antd/dist/reset.css';
import '@/css/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={DASHBOARD}>
    <RootApp />
  </BrowserRouter>
);
