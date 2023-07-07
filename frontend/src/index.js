import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import './css.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import { ChakraProvider } from '@chakra-ui/react'
import { TimeContextProvider } from './context/TimeContext';
import { SchoolContextProvider } from './context/SchoolContext';
import { CourseContextProvider } from './context/CourseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ChakraProvider>
    <SchoolContextProvider>
      <CourseContextProvider>
        <TimeContextProvider>
          <App />
        </TimeContextProvider>
      </CourseContextProvider>
    </SchoolContextProvider>
  </ChakraProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
