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
// import ViewTimeTable from "./pages/component/ViewTimeTable";

export default function App() {
    const [toggle, setToggle] = useState(false)
    const { user, dispatch } = useAuthContext()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        } else {
            dispatch({ type: 'LOGOUT' })
        }
    }, [])

    // const renderRoutes = () => {
    //     if (!user) {
    //         return (
    //             <Routes>
    //                 <Route path="/" element={<Navigate to="/login" />} />
    //                 <Route path="/login" element={<LoginModal />} />
    //                 <Route path="/sign_up" element={<SignUpModal />} />
    //             </Routes>
    //         )
    //     } else{
    //         return (
    //             <div className="w-full bg-green-500 min-h-screen flex flex-row justify-center sm:justify-center p-0 m-0 ">
    //                 <div className="w-1/6 -ml-8 sm:ml-0 sm:w-1/5 flex relative z-0 sm:bg-transparent sm:z-0 sm:flex h-full overflow-y-hidden overscroll-none">
    //                     <NavBar />
    //                 </div>
    //                 <div className="w-5/6 sm:4/5 z-30 sm:mr-4 relative min-h-screen overflow-y-visible overscroll-contain bg-white shadow-md shadow-slate-800 mt-4 rounded-3xl mb-8">
    //                     <div className="rounded-lg h-full overflow-visible overscroll-y-auto mt-4 pt-2 mb-3 mx-2 px-2 sm:p-2 sm:mx-4">
    //                         <Routes>
    //                             <Route path="/" element={user ? <Navigate to={'/dashboard'} /> : <Navigate to={'/'} />} />
    //                             <Route path="/dashboard" element={user ? <DashBoard /> : <Navigate to={'/'} />} />
    //                             <Route path="/courses" element={user ? <CourseList /> : <Navigate to={'/'} />} />
    //                             <Route path="/student/:id/results" element={user ? <Student /> : <Navigate to={'/'} />} />
    //                             <Route path="/student/results" element={user.role === 'Student' ? <StudentPersonalResults /> : <Navigate to={'/'} />} />
    //                             <Route path="/students" element={user ? <StudentList /> : <Navigate to={'/'} />} />
    //                             <Route path="/sign_up" element={user ? <SignUpModal /> : <Navigate to={'/'} />} />
    //                             <Route path="/notice" element={user.role === 'Lecturer' ? <Notice /> : <Navigate to={'/'} />} />
    //                             <Route path="/chat" element={user.role === 'Lecturer' || user.role === 'Student' ? <Chat /> : <Navigate to={'/'} />} />

    //                             <Route path="/profile" element={user.role === 'Admin' ? <MyProfile /> : <Navigate to={'/'} />} />
    //                             <Route path="/settings" element={user ? <ChangePassword /> : <Navigate to={'/'} />} />

    //                             <Route path="/lecturers" element={user ? <LecturerList /> : <Navigate to={'/'} />} />

    //                             <Route path="/timetable" element={user ? <TimeTable /> : <Navigate to={'/'} />} />
    //                             <Route path="*" element={<NotFound />} />
    //                         </Routes>
    //                     </div>
    //                 </div>
    //             </div>
    //         )

    //     }
    // }
    // return (
    //     <BrowserRouter>
    //         {renderRoutes()}
    //         <Route path="*" element={<NotFound />} />
    //     </BrowserRouter>
    // );
    return (
        <div>
            <BrowserRouter>
                {/* <Routes>
                    <Route path="/" element={user ? <Navigate to={'/dashboard'} /> : <Navigate to={'/login'} />} />
                </Routes> */}


                {user &&
                    <div className="w-full bg-green-500 min-h-screen flex flex-row justify-center sm:justify-center p-0 m-0 ">
                        <div className="w-1/6 -ml-8 sm:ml-0 sm:w-1/5 flex relative z-0 sm:bg-transparent sm:z-0 sm:flex h-full overflow-y-hidden overscroll-none">
                            <NavBar />
                        </div>
                        <div className="w-5/6 sm:4/5 z-30 sm:mr-4 relative min-h-screen overflow-y-visible overscroll-contain bg-white shadow-md shadow-slate-800 mt-4 rounded-3xl mb-8">
                            <div className="rounded-lg h-full overflow-visible overscroll-y-auto mt-4 pt-2 mb-3 mx-2 px-2 sm:p-2 sm:mx-4">
                                <Routes>
                                    <Route path="/" element={user ? <Navigate to={'/dashboard'} /> : <Navigate to={'/'} />} />
                                    <Route path="/dashboard" element={<DashBoard />} />
                                    <Route path="/courses" element={user ? <CourseList /> : <Navigate to={'/'} />} />
                                    <Route path="/student/:id/results" element={user ? <Student /> : <Navigate to={'/'} />} />
                                    <Route path="/student/results" element={user.role === 'Student' ? <StudentPersonalResults /> : <Navigate to={'/'} />} />
                                    <Route path="/students" element={user ? <StudentList /> : <Navigate to={'/'} />} />
                                    <Route path="/sign_up" element={user ? <SignUpModal /> : <Navigate to={'/'} />} />
                                    <Route path="/notice" element={user.role === 'Lecturer' ? <Notice /> : <Navigate to={'/'} />} />
                                    <Route path="/chat" element={user.role === 'Lecturer' || user.role === 'Student' ? <Chat /> : <Navigate to={'/'} />} />

                                    <Route path="/profile" element={user.role === 'Admin' ? <MyProfile /> : <Navigate to={'/'} />} />
                                    <Route path="/settings" element={user ? <ChangePassword /> : <Navigate to={'/'} />} />

                                    <Route path="/lecturers" element={user ? <LecturerList /> : <Navigate to={'/'} />} />

                                    <Route path="/timetable" element={user ? <TimeTable /> : <Navigate to={'/'} />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </div>
                        </div>
                    </div>
                }
                {!user &&
                    <Routes>
                        <Route path="/" element={!user ? <Navigate to={'/login'} /> : <Navigate to={'/'} />} />
                        <Route path="/login" element={!user ? <LoginModal /> : <Navigate to={'/'} />} />
                        <Route path="/sign_up" element={!user ? <SignUpModal /> : <Navigate to={'/'} />} />
                    </Routes>
                }

            </BrowserRouter>
        </div>
    )
}




