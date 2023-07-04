import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { createContext } from 'react';
import UserStore from './store/UserStore';
import App from './App';


export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    user: new UserStore()
  }}>
    <App />
  </Context.Provider>

);
