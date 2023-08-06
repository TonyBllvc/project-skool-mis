import { Image, } from '@chakra-ui/react'
import React, { } from 'react'
import { AiOutlineHome, AiOutlineInfoCircle, AiOutlineLock, AiOutlineUser } from 'react-icons/ai'
import { BsChatDots } from 'react-icons/bs'
import {  BiBookContent,  BiTimeFive } from 'react-icons/bi'
import { ImSwitch } from 'react-icons/im'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../images/images_logo.png'
import useLogout from '../hooks/auth/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const NavBar = () => {
    const { logout } = useLogout()
    const navigate = useNavigate()
    const { user } = useAuthContext()

    const handleLogout = () => {
        logout()

        navigate('/login')
    }

    return (
        <nav className="bg w-full sm:w-full flex flex-col top-12 relative overflow-hidden overscroll-none ">
            <div className=' w-full sm:pl-2 h-full flex flex-col justify-center'>
                <div className=' w-full sm:w-1/2 flex flex-row pl-5 items-center'>
                    {/* <NavLink> */}
                    {/* <Image src={logo} borderRadius='none' bgPosition='center' boxSize='65px' display={['none', 'flex', 'flex']} w={['70%', '75%', '140px']} h={['40px', '42px', '45px']} alt='logo' /> */}
                    {/* <Text fontSize={24} color='white'> FUTO </Text> */}
                    {/* <img src={} alt='logo/> */}
                    {/* </NavLink> */}
                </div>
                {/* a hr across */}
                <hr className='w-11/12 my-4
                border-white'/>

                <nav>

                    <div>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'flex items-center justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 sm:rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center  justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineHome className=' text-2xl text-green-100 font-semibold pr-2' />
                            <p className='hidden sm:flex w-full'>
                                Dashboard
                            </p>
                            {/* <p className='text-white active:text-black hover:text-black h-full '>Dashboard</p> */}
                        </NavLink>
                        {/* <NavLink to="/lecturer_list" className={({ isActive }) => isActive ? 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineUser className=' text-2xl text-white font-semibold pr-2' />
                            Lecturers
                        </NavLink> */}
                        {/* <NavLink to="/student_result_upload" className={({ isActive }) => isActive ? 'flex items-center justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 sm:rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center  justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineUser className=' text-2xl text-white font-semibold pr-2' />
                            
                            <p className='hidden sm:flex'>
                            Student
                            </p>
                        </NavLink> */}
                        <NavLink to="/timetable" className={({ isActive }) => isActive ? 'flex items-center justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 sm:rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center  justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <BiTimeFive className=' text-2xl text-white font-semibold pr-2' />

                            <p className='hidden sm:flex'>
                                Time-Table
                            </p>
                        </NavLink>

                        { user.role === 'Student' ? (
                        <NavLink to="/student/results" className={({ isActive }) => isActive ? 'flex items-center justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 sm:rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center  justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <BiBookContent className=' text-2xl text-white font-semibold pr-2' />

                            <p className='hidden sm:flex'>
                                Results
                            </p>
                        </NavLink>
                        ) : (
                            <>

                            </>
                        )}

                        { user.role === 'Lecturer' || user.role === 'Student' ? (
                        <NavLink to="/chat" className={({ isActive }) => isActive ? 'flex items-center justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 sm:rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center  justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <BsChatDots className=' text-2xl text-white font-semibold pr-2' />

                            <p className='hidden sm:flex'>
                                Chat
                            </p>
                        </NavLink>
                        ) : (
                            <>

                            </>
                        )}
                        { user.role === 'Lecturer' ? (
                        <NavLink to="/notice" className={({ isActive }) => isActive ? 'flex items-center justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 sm:rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center  justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineInfoCircle className=' text-2xl text-white font-semibold pr-2' />

                            <p className='hidden sm:flex'>
                                Notice
                            </p>
                        </NavLink>
                        ) : (
                            <>
                                
                            </>
                        )}
                        {/* a hr across */}
                        <hr className='w-11/12 my-4
                    border-white'/>

                        <NavLink to="/my_profile" className={({ isActive }) => isActive ? 'flex items-center justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 sm:rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center  justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineUser className=' text-2xl text-white font-semibold pr-2' />

                            <p className='hidden sm:flex'>
                                My Profile
                            </p>
                        </NavLink>
                        <NavLink to="/settings" className={({ isActive }) => isActive ? 'flex items-center justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 sm:rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center  justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineLock className=' text-2xl text-white font-semibold pr-2' />

                            <p className='hidden sm:flex'>
                                Settings
                            </p>
                        </NavLink>

                        <NavLink to='/login' onClick={handleLogout} className='flex items-center  justify-center sm:justify-start  font-bold text-sm w-full pl-4 py-3 my-3 rounded-l-3xl text-green-100'>
                            <ImSwitch className=' text-2xl text-white font-semibold pr-2' />
                            <p className='hidden sm:flex'>
                                Logout
                            </p>
                        </NavLink>
                        <hr className='w-11/12 my-4
                    border-white'/>
                        {/* A hr across */}

                    </div>

                </nav>

            </div>
        </nav>
    )
}

export default NavBar
