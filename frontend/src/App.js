import { BrowserRouter, Route, Routes, } from 'react-router-dom';
// import { FaList, FaTimes } from 'react-icons/fa'
import { BsList } from 'react-icons/bs';
import NotFound from './pages/NotFound';
import NavBar from './Layout/NavBar';
import TimeTable from './pages/component/TimeTable';
import DashBoard from './pages/DashBoard';
import CourseList from './pages/component/CourseList';
import { useEffect, useState } from 'react';
import Lecturer from './pages/component/StudentList'
import StudentList from './pages/component/StudentList';
import Student from './pages/component/Student';
import LecturerList from './pages/component/LecturersList';
import StudentDetails from './Components/StudentDetails';
import Home from './pages/Home';
// import { useStudentContext } from './hooks/useStudentContext';
// import { useLecturerContext } from './hooks/useLecturerContext';
// import { useCourseContext } from './hooks/useCourseContext';
import SignUpModal from './model/SignUpModal';
import LoginModal from './model/LoginModal';
import Notice from './pages/component/Notice';
import Chat from './pages/component/Chat';
// import ViewTimeTable from './pages/component/ViewTimeTable';

export default function App() {
  const [toggle, setToggle] = useState(false)

  return (
    <div>
      <BrowserRouter>
        {/* Before authentication */}
        {/* <Routes>
                <Route exact path='/' element={<Home /> } />
                <Route path='/sign_up' element={<SignUpModal />} />
                <Route path='/login' element={<LoginModal />} />
          
        </Routes> */}

        <div className="w-full bg-green-500 min-h-screen flex flex-row justify-center sm:justify-center p-0 m-0 ">
          <div className='sm:w-1/5 sm:hidden flex sm:overflow-y-hidden sm:overscroll-none'>
            {/* {!toggle &&
              <BsList onClick={() => setToggle(!toggle)} className='w-full flex mt-2 sm:hidden text-neutral-800 font-extrabold font-mono text-2xl ml-0.5' />
            } */}
          </div>
          {/* {toggle && */}
          <div className='w-1/6 -ml-8 sm:ml-0 sm:w-1/5 flex relative z-0 sm:bg-transparent sm:z-0 sm:flex h-full overflow-y-hidden overscroll-none'>
            <NavBar toggle={toggle} setToggle={setToggle} />
          </div>
          {/* } */}
          <div className='w-5/6 sm:4/5 z-30 sm:mr-4 relative min-h-screen overflow-y-visible overscroll-contain bg-white shadow-md shadow-slate-800 mt-4 rounded-3xl mb-8'>
            <div className="rounded-lg h-full overflow-visible overscroll-y-auto mt-4 pt-2 mb-3 mx-2 px-2 sm:p-2 sm:mx-4">
              <Routes>
                {/* <Route exact path='/' element={<Home /> } /> */}
                <Route exact path='/' element={<DashBoard />} />
                <Route path='/courses' element={<CourseList />} />
                <Route path='/student/:id/results' element={<Student />} />
                <Route path='/student/:id/results' element={<StudentDetails />} />
                <Route path='/students' element={<StudentList />} />
                
                {/* <Route path='/student_result_upload' element={<StudentListing /> } /> */}

                <Route path='/chat' element={<Chat /> } />
                <Route path='/notice' element={<Notice />} />

                <Route path='/lecturers' element={<LecturerList />} />

                <Route path='/timetable' element={<TimeTable />} />

                {/* Lost page */}
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </div>


        </div>
      </BrowserRouter>
    </div>
  )
}








// import React, { useState, useEffect } from 'react';
// import { socket } from './socket';
// import  ConnectionState  from './components/ConnectionState';
// import  ConnectionManager  from './components/ConnectionManager';
// import  MyForm  from './components/MyForm';

// export default function App() {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [fooEvents, setFooEvents] = useState([]);

//   useEffect(() => {
//     function onConnect() {
//       setIsConnected(true);
//     }

//     function onDisconnect() {
//       setIsConnected(false);
//     }

//     function onFooEvent(value) {
//       setFooEvents(previous => [...previous, value]);
//     }

//     socket.on('connect', onConnect);
//     socket.on('disconnect', onDisconnect);
//     socket.on('foo', onFooEvent);

//     return () => {
//       socket.off('connect', onConnect);
//       socket.off('disconnect', onDisconnect);
//       socket.off('foo', onFooEvent);
//     };
//   }, []);

//   return (
//     <div className="App">
//       <ConnectionState isConnected={ isConnected } />
//       {/* <Events events={ fooEvents } /> */}
//       <ConnectionManager />
//       <MyForm />
//     </div>
//   );
// }