import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { TimeContextProvider } from './context/TimeContext';
import { TimetableContextProvider } from './context/TimetableContext';
import { CourseContextProvider } from './context/CourseContext';
import { StudentContextProvider } from './context/StudentContext';
import { LecturerContextProvider } from './context/LecturerContext';
import { StudentDetailsContextProvider } from './context/StudentDetailsContext';
import { StudentInfoContextProvider } from './context/StudentInfoContext';
import { NoticeContextProvider } from './context/NoticeContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ChakraProvider>
    <AuthContextProvider>
      <TimetableContextProvider>
        <CourseContextProvider>
          <TimeContextProvider>
            <LecturerContextProvider>
              <StudentContextProvider>
                <StudentDetailsContextProvider>
                  <StudentInfoContextProvider>
                    <NoticeContextProvider>
                      <App />
                    </NoticeContextProvider>
                  </StudentInfoContextProvider>
                </StudentDetailsContextProvider>
              </StudentContextProvider>
            </LecturerContextProvider>
          </TimeContextProvider>
        </CourseContextProvider>
      </TimetableContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();