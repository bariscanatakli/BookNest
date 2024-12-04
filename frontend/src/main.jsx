import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { loginSuccess } from './redux/actions.js';

const checkToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch(loginSuccess(token));
  }
  return token
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App token = {checkToken()} />
    </Provider>
  </React.StrictMode>,
)

checkToken();

