import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './utils/reportWebVitals';
import { Root } from './Root';
import './index.scss';

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// function sendToAnalytics(metric) {
//   const body = JSON.stringify(metric);
//   const url = "https://example.com/analytics";

//   // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
//   if (navigator.sendBeacon) {
//     navigator.sendBeacon(url, body);
//   } else {
//     fetch(url, { body, method: "POST", keepalive: true });
//   }
// }

reportWebVitals();
