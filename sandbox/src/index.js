import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const nums = [1,2,3,4,5,6]
const squared = nums.map(function(item){
  return item * item
})
console.log(squared)

const names =["alice" ,"bob", "charlie", "danielle"]
const upperCase = names.map(function(name){
  return name[0].toUpperCase() + name.slice(1)
})
console.log(upperCase)

const te = ["A", "B", "C"]
const elements = te.map(mon => {
  return `<p>${mon}</p>`
})
console.log(elements)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
