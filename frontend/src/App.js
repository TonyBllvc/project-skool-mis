import { BrowserRouter, Navigate, Route, Routes, } from "react-router-dom";
import NotFound from "./pages/NotFound";
import NavBar from "./Layout/NavBar";
import TimeTable from "./pages/component/TimeTable";
import DashBoard from "./pages/DashBoard";
import CourseList from "./pages/component/CourseList";
import { useEffect, useState } from "react";
import Lecturer from "./pages/component/StudentList"
import StudentList from "./pages/component/StudentList";
import Student from "./pages/component/Student";
import LecturerList from "./pages/component/LecturersList";
import SignUpModal from "./model/SignUpModal";
import LoginModal from "./model/LoginModal";
import Notice from "./pages/component/Notice";
import Chat from "./pages/component/Chat";
import { useAuthContext } from "./hooks/useAuthContext";
import StudentDetails from "./Components/StudentDetails";
import StudentPersonalResults from "./pages/component/StudentPersonalResults";
import MyProfile from "./pages/component/MyProfile";
import ChangePassword from "./pages/component/ChangePassword";
import Layout from "./Layout";
import logoFav from './images/images_logo.jpg'

import io from 'socket.io-client'
const ENDPOINT = 'http://localhost:5000';

var socket;
// import ViewTimeTable from "./pages/component/ViewTimeTable";

export default function App() {
    const [toggle, setToggle] = useState(false)
    const { user, dispatch } = useAuthContext()
    const [isActive, setIsActive] = useState("")
    // const []
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        } else {
            dispatch({ type: 'LOGOUT' })
            setIsActive(false)
        }

    }, [])

    // Add favicon link
    useEffect(() => {    
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.href = logoFav; // Replace with your favicon path
    document.head.appendChild(faviconLink);

    // Clean up when component unmounts
    return () => {
      document.head.removeChild(faviconLink);
    };})
    // useEffect(() => {
    // const runTime = () => {
    //     setInterval(() => {

    //         if (user) {
    //             socket = io(ENDPOINT)
    //             socket.emit("active", user)
    //             socket.on("active_user", (user_details) => {
    //                 setIsActive(JSON.stringify(user_details))
    //                 console.log(user_details)
    //             })
    //         } else {
    //             setIsActive('')

    //         }
    //     }, 8000);
    // }

    // runTime()
    // }, [])
    return (
        <div>
            <BrowserRouter>
                {/* <Routes>
                    <Route path="/" element={user ? <Navigate to={'/dashboard'} /> : <Navigate to={'/login'} />} />
                </Routes> */}
                {user && user._id ? (
                    <Layout>
                        <Routes>
                            <Route path="/" element={user ? <Navigate to={'/dashboard'} /> : <Navigate to={'/'} />} />
                            <Route path="/dashboard" element={user ? <DashBoard /> : <Navigate to={'/'} />} />
                            <Route path="/courses" element={user ? <CourseList /> : <Navigate to={'/'} />} />
                            <Route path="/student/:id/results" element={user ? <Student /> : <Navigate to={'/'} />} />
                            <Route path="/student/results" element={user.role === 'Student' ? <StudentPersonalResults /> : <Navigate to={'/'} />} />
                            <Route path="/students" element={user ? <StudentList /> : <Navigate to={'/'} />} />
                            {/* <Route path="/sign_up" element={user ? <SignUpModal /> : <Navigate to={'/'} />} /> */}
                            <Route path="/notice" element={user.role === 'Lecturer' ? <Notice /> : <Navigate to={'/'} />} />
                            <Route path="/chat" element={user.role === 'Lecturer' || user.role === 'Student' ? <Chat isActive={isActive} /> : <Navigate to={'/'} />} />

                            <Route path="/profile" element={user.role === 'Admin' ? <MyProfile /> : <Navigate to={'/'} />} />
                            <Route path="/settings" element={user ? <ChangePassword /> : <Navigate to={'/'} />} />

                            <Route path="/lecturers" element={user ? <LecturerList /> : <Navigate to={'/'} />} />

                            <Route path="/timetable" element={user ? <TimeTable /> : <Navigate to={'/'} />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Layout>
                ) : (!user || !user._id) ? (
                    <Routes>
                        <Route path="/" element={!user ? <Navigate to={'/login'} /> : <Navigate to={'/'} />} />
                        <Route path="/login" element={!user ? <LoginModal /> : <Navigate to={'/'} />} />
                        <Route path="/sign_up" element={!user ? <SignUpModal /> : <Navigate to={'/'} />} />
                    </Routes>
                ) : (
                    <>

                    </>
                )
                }

            </BrowserRouter>
        </div>
    )
}




