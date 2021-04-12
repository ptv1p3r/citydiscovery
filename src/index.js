import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';

import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import common_pt from "./translations/pt/common.json";
import common_en from "./translations/en/common.json";
import users_pt from "./translations/pt/users.json";
import users_en from "./translations/en/users.json";

import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

import './index.css';

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: 'pt',                              // language to use
    resources: {
        en: {
            common: common_en,               // 'common' is our custom namespace
            users:  users_en
        },
        pt: {
            common: common_pt,
            users:  users_pt
        },
    },
});

ReactDOM.render(
  <React.StrictMode>
      <I18nextProvider i18n={i18next}>
          <Router>
              <App />
          </Router>
      </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
