import React, { useEffect, useState } from 'react'
import { AiOutlineFolder } from 'react-icons/ai'
import { BiBookOpen } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { useTimeContext } from '../../hooks/useTimeContext'

const DashBoard = () => {
    useEffect(() => {
      document.title = 'Master Authentication Page'
    }, [])
    
    const { time } = useTimeContext()

    return (
        <div className='overscroll-contain overflow-visible'>
            <div className='w-full font-mono font-bold text-lg'>

                {/* the top section */}
                <div className='w-full mb-10'>
                    <h1 className='text-xl sm:text-2xl font-serif font-semibold text-green-500'>
                        { time }, Master Admin 
                    </h1>
                </div>

                {/* The upper contents */}
                <div>
                    {/* work on the grid functionality */}
                    <div className='grid lg:grid-cols-2 gap-10 mb-3'>

                        {/* Cards go here*/}

                        {/* card one */}
                        <div className='w-full p-2 bg-white rounded overflow-hidden shadow-lg relative  hover:shadow-slate-800'>
                            <NavLink to='/master_view_lecturers'>
                                <div className='w-full flex flex-row my-2'>
                                    <div className='w-1/2 flex items-start justify-start '>
                                        <AiOutlineFolder className='text-3xl text-lime-400 ' />
                                    </div>
                                    <div className='w-1/2 flex justify-end '>
                                        <div className='py-0.5 px-2 bg-lime-400 flex justify-center rounded-md shadow-lg cursor-pointer hover:shadow-slate-200 active:bg-green-600'>
                                            <h3 className='text-white text-base sm:text-lg' > Lecturers </h3>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='py-1' >
                                        <h2 className='font-mono'> 0 </h2>
                                    </div>
                                    <div className='py-1' >
                                        <h6 className='font-sans text-sm font-normal'> Assigned here</h6>
                                    </div>
                                </div>
                            </NavLink>
                        </div>


                        {/* card two */}
                        <div className='w-full p-2 bg-white rounded overflow-hidden shadow-lg relative hover:shadow-slate-800'>
                            <NavLink to='/master_student_page'>
                                <div className='w-full flex flex-row my-2'>
                                    <div className='w-1/2 flex items-start justify-start '>
                                        <BiBookOpen className='text-3xl text-blue-700 ' />
                                    </div>
                                    <div className='w-1/2 flex justify-end '>
                                        <div className='py-0.5 px-2 bg-blue-700 flex justify-center rounded-md shadow-lg cursor-pointer hover:shadow-slate-200 active:bg-blue-800'>
                                            <h3 className='text-white text-base sm:text-lg' > Students </h3>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='py-1' >
                                        <h2 className='font-mono'> 0 </h2>
                                    </div>
                                    <div className='py-1' >
                                        <h6 className='font-sans text-sm font-normal'> Assigned here</h6>
                                    </div>
                                </div>
                            </NavLink>
                        </div>

                        {/* card three */}
                        <div className='w-full p-2 bg-white rounded overflow-hidden shadow-lg relative  hover:shadow-slate-800'>
                            <div>
                                <div className='w-full flex flex-row my-2'>
                                    <div className='w-1/2 flex  items-start justify-start '>
                                        <BiBookOpen className='text-3xl text-orange-500 ' />
                                    </div>
                                    <div className='w-1/2 flex justify-end '>
                                        <div className='py-0.5 px-2 bg-orange-500 flex justify-center rounded-md shadow-lg cursor-pointer hover:shadow-slate-200 active:bg-orange-600'>
                                            <h3 className='text-white text-base sm:text-lg' > Course </h3>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='py-1' >
                                        <h2 className='font-mono'> 0 </h2>
                                    </div>
                                    <div className='py-1' >
                                        <h6 className='font-sans text-sm font-normal'> Assigned here</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* card four */}
                        <div className='w-full p-2 bg-white rounded overflow-hidden shadow-lg relative  hover:shadow-slate-800'>
                            <div>
                                <div className='w-full flex flex-row my-2'>
                                    <div className='w-1/2 flex items-start justify-start '>
                                        <BiBookOpen className='text-3xl text-blue-400 ' />
                                    </div>
                                    <div className='w-1/2 flex justify-end '>
                                        <div className='py-0.5 px-2 bg-blue-400 flex justify-center rounded-md shadow-lg cursor-pointer hover:shadow-slate-200 active:bg-blue-500'>
                                            <h3 className='text-white text-base sm:text-lg' > Activity </h3>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div className='py-1' >
                                        <h2 className='font-mono'> 0 </h2>
                                    </div>
                                    <div className='py-1' >
                                        <h6 className='font-sans text-sm font-normal'> Assigned here</h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    
                <div className='w-full bg-white relative top-7 my-5 pt-3'>
                    Write up goe here
                </div>
                </div>
            </div>
        </div>


    )
}

export default DashBoard
