import React, { useEffect, useState } from 'react'
import { AiOutlineFolder } from 'react-icons/ai'
import { BiBookOpen } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import DashBox from './component/DashBox'

const DashBoard = () => {
    useEffect(() => {
        document.title = 'Dashboard page'
    }, [])


    return (
        <div className='overscroll-contain overflow-visible'>
            <div className='w-full font-mono font-bold text-lg mb-14 '>
                <DashBox />
                {/* Pass a logic here for both students and lecturers */}
            </div>
        </div>


    )
}

export default DashBoard
