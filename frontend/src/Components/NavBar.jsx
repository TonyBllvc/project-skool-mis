import { Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineFolder, AiOutlineHome, AiOutlineInfoCircle, AiOutlineLock, AiOutlineUser } from 'react-icons/ai'
import { BiBookOpen } from 'react-icons/bi'
import { ImSwitch } from 'react-icons/im'
import { NavLink } from 'react-router-dom'
import logo from '../images/images-710.gif'

const NavBar = () => {

    return (
        <nav className="bg w-full h-full flex flex-col top-12 fixed overflow-hidden overscroll-none ">
            <div className=' pl-2 '>
                <div className='w-1/2 flex flex-row pl-5 items-center'>
                    {/* <NavLink> */}
                    <Image src={logo} borderRadius='none' bgPosition='center' boxSize='65px' w='70px' h='55px' alt='logo' />
                    <Text fontSize={24} color='white'> FUTO </Text>
                    {/* <img src={} alt='logo/> */}
                    {/* </NavLink> */}
                </div>
                {/* a hr across */}
                <hr className='w-11/12 my-4
                border-white'/>

                <nav>

                    <div>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineHome className=' text-2xl text-green-100 font-semibold pr-2' /> Dashboard
                            {/* <p className='text-white active:text-black hover:text-black h-full '>Dashboard</p> */}
                        </NavLink>
                        <NavLink to="/lecturer_list" className={({ isActive }) => isActive ? 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineFolder className=' text-2xl text-white font-semibold pr-2' /> Lecturers </NavLink>
                        <NavLink to="/student_list" className={({ isActive }) => isActive ? 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <BiBookOpen className=' text-2xl text-white font-semibold pr-2' />
                            Student
                        </NavLink>
                        <NavLink to="/timetable" className={({ isActive }) => isActive ? 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <BiBookOpen className=' text-2xl text-white font-semibold pr-2' />
                            Time-Table
                        </NavLink>
                        <NavLink to="/course" className={({ isActive }) => isActive ? 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineFolder className=' text-2xl text-white font-semibold pr-2' /> Notice</NavLink>
                        <NavLink to="/chat" className={({ isActive }) => isActive ? 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineInfoCircle className=' text-2xl text-white font-semibold pr-2' />
                            Chat
                        </NavLink>
                        {/* a hr across */}
                        <hr className='w-11/12 my-4
                    border-white'/>

                        <NavLink to="/my_profile" className={({ isActive }) => isActive ? 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineUser className=' text-2xl text-white font-semibold pr-2' /> My Profile</NavLink>
                        <NavLink to="/settings" className={({ isActive }) => isActive ? 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <AiOutlineLock className=' text-2xl text-white font-semibold pr-2' /> Settings</NavLink>
                        <hr className='w-11/12 my-4
                    border-white'/>
                        {/* A hr across */}

                        <NavLink to="/logout" className={({ isActive }) => isActive ? 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100 bg-zinc-800 bg-opacity-50 shadow-sm shadow-slate-700' : 'flex items-center justify-start  font-bold text-sm w-4/5 pl-6 py-3 my-3 rounded-l-3xl text-green-100'}>
                            <ImSwitch className=' text-2xl text-white font-semibold pr-2' />  Logout </NavLink>
                    </div>

                </nav>

            </div>
        </nav>
    )
}

export default NavBar
