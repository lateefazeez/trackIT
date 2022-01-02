import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextPropvider } from "./context/AuthContext"


ReactDOM.render(
  <React.StrictMode>
    <AuthContextPropvider>
      <App />
    </AuthContextPropvider>
  </React.StrictMode>,
  document.getElementById('root')
);
