import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import DashBoard from './pages/DashBoard';

export default function App(){
  return(
    <div>
    <BrowserRouter>
    <div>
      <div>
        <Routes>
          <Route exact path='/' element={ <Home /> } />
          <Route path='*' element={<NotFound />} />
          <Route path='/dashboard' element={<DashBoard />} />

        </Routes>
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