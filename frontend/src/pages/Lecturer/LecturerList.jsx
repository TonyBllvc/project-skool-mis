import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";

const LecturerList = () => {

    const navigate = useNavigate()
    
  return (
        <div className='overscroll-contain'>
            <div className='w-full font-mono font-bold text-lg'>

                {/* the top section */}
                <div className='w-full mb-9 flex flex-row justify-start align-middle text-center items-center'>
                    <h1 className="text-gray-500 font-mono font-semibold">
                        Computer Science
                    </h1>
                    <div className="flex items-end mx-2 justify-end">
                        <BiRightArrowAlt className="text-gray-500 font-mono text-lg font-semibold" />
                    </div>
                    {/* This would have model schema created */}
                    <h2 className="text-blue-600 font-mono font-semibold"> 
                    Lecturers </h2>
                </div>

                <button onClick={() => { navigate(-1) }} className=' flex flex-row justify-start text-black hover:text-red-700 text-center items-center align-bottom '>
                    <BiArrowBack className=" mr-1 font-mono text-center text-lg font-semibold" /> Back
                </button>

                <div className="mt-9 ">
                    {/* This would have model schema created */}
                    <h2 className="text-gray-500 font-mono font-bold text-xl">
                        List of all Lecturers
                    </h2>
                </div>

                {/* The chat table */}
                <div className="mt-2">

                    <div className="w-full">
                        {/* The table for filling */}
                        <div className="mt-2">
                            <div className="w-full">
                                {/* Table with contents */}
                                <div className="mt-10 bg-white grid grid-cols-2 rounded-lg shadow-lg hover:shadow-slate-800 py-4 px-3 mb-4">
                                    <div className="mx-10 flex justify-start items-center">
                                        <h2 className="text-slate-600 pl-2 text-base"> 
                                        Dr. Mr Njoku Okoro Emeka 
                                        </h2>
                                    </div>
                                    <div className="mx-10 flex justify-end items-center">
                                        <Link to='/master_view_lecturers/id' className="py-1 px-4 bg-blue-600 text-base text-white hover:bg-blue-700 rounded-md shadow-lg shadow-slate-300" > View Details </Link>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* <StudentList /> */}
                    {/* { results && <StudentList recordsUpload={results}  /> } */}
                </div>
            </div>
        </div>

  )
}

export default LecturerList
