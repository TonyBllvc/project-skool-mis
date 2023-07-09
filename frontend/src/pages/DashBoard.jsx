import React, { useEffect, useState } from 'react'
import { AiOutlineFolder } from 'react-icons/ai'
import { BiBookOpen } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import DashBox from './Lecturer/DashBox'

const DashBoard = () => {
    useEffect(() => {
        document.title = 'Master Authentication Page'
    }, [])


    return (
        <div className='overscroll-contain overflow-visible'>
            <div className='w-full font-mono font-bold text-lg'>
                <DashBox />
                {/* Pass a logic here for both students and lecturers */}
            </div>
        </div>


    )
}

export default DashBoard
