import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import DashBoardLecturer from './pages/Lecturer/DashBoard';
import NavBar from './Components/NavBar';
import DashBox from './pages/Lecturer/DashBox';
import LecturerList from './pages/Lecturer/LecturerList';
import DashBoard from './pages/Lecturer/DashBoard';
import TimeTable from './pages/Student/TimeTable';
import ViewTimeTable from './pages/component/ViewTimeTable';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="w-full min-h-screen flex flex-row justify-center sm:justify-center p-0 m-0 bg-green-500">
          <div className='w-1/5 hidden sm:flex h-full relative overflow-y-hidden overscroll-none'>
            <NavBar />
          </div>
          <div className='w-4/5 z-30 sm:mr-5 mr-1 relative min-h-screen overflow-y-visible overscroll-contain bg-white shadow-md shadow-slate-800 mt-4 rounded-3xl mb-8'>
            <div className="rounded-lg overflow-visible overscroll-y-auto mt-4 pt-2 mx-4 px-2 ">
              <Routes>
                <Route exact path='/' element={<DashBoard />} />
                <Route exact path='/lecturer_list' element={<LecturerList />} />


                <Route exact path='/timetable' element={<TimeTable />} />
                <Route exact path='/view_timetable' element={<ViewTimeTable
                />} />

                {/* Lost page */}
                <Route exact path='*' element={<NotFound />} />
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