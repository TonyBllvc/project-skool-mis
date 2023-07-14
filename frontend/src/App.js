import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { FaList, FaTimes } from 'react-icons/fa'
import { BsList } from 'react-icons/bs';
import NotFound from './pages/NotFound';
import NavBar from './Components/NavBar';
import TimeTable from './pages/component/TimeTable';
import DashBoard from './pages/DashBoard';
import CourseList from './pages/component/CourseList';
import { useState } from 'react';
import Lecturer from './pages/component/StudentList'
import StudentList from './pages/component/StudentList';
import Student from './pages/component/Student';
import LecturerList from './pages/component/LecturersList';
// import ViewTimeTable from './pages/component/ViewTimeTable';

export default function App() {
  const [toggle, setToggle] = useState(false)

  return (
    <div>
      <BrowserRouter>
        <div className="w-full min-h-screen flex flex-row justify-center sm:justify-center p-0 m-0 bg-green-500">
          {/* <div className='sm:w-1/5 sm:hidden flex sm:overflow-y-hidden sm:overscroll-none'>
            {!toggle &&
              <BsList onClick={() => setToggle(!toggle)} className='bg-blue-900 w-full absolute mt-2  sm:hidden text-2xl ml-1.5' />
            }
            {toggle &&
              <FaTimes onClick={() => setToggle(!toggle)} className='sm:hidden sm:ml-2 sm:text-2xl sm:mt-4' />
            }
          </div> */}
          {/* {toggle && */}
            <div className='w-1/5 hidden absolute z-50 sm:flex h-full overflow-y-hidden overscroll-none'>
              <NavBar />
            </div>
          {/* } */}
          <div className='w-11/12 sm:4/5 z-30 sm:mr-4 mr-1 relative min-h-screen overflow-y-visible overscroll-contain bg-white shadow-md shadow-slate-800 mt-4 rounded-3xl mb-8'>
            <div className="rounded-lg overflow-visible overscroll-y-auto mt-4 pt-2 mb-3 mx-2 px-2 sm:p-2 sm:mx-4">
              <Routes>
                <Route exact path='/' element={<DashBoard />} />
                <Route path='/courses' element={<CourseList />} />
                <Route path='/student/:id' element={<Student />} />
                <Route path='/students' element={<StudentList />} />

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