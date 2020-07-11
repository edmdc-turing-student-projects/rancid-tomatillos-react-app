import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('user'))
console.log(user)

const router = () => {
  return (user) ? ( <BrowserRouter><App user={ user }/></BrowserRouter>) :
    <BrowserRouter><App/></BrowserRouter>
}

ReactDOM.render(router(), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
