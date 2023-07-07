
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import { useEffect, useState } from 'react';


const ViewTimeTable = () => {
    const navigate = useNavigate()
    // const { idDetail, dispatch } = useTableContext()

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
                        TimeTable </h2>
                </div>

                <button onClick={() => { navigate(-1) }} className=' flex flex-row justify-start text-black hover:text-red-700 text-center items-center align-bottom '>
                    <BiArrowBack className=" mr-1 font-mono text-center text-lg font-semibold" /> Back
                </button>
                <div>

                    {/* Table with contents */}
                    {
                        {/* idDetail */}
                     ? (
                        <div className='mt-7'>
                            {/* {idDetail && idDetail.map(data => (
                                <ViewTimeDetails idDetails={data}/>
                            ))} */}
                        </div>
                    ) : (
                        <div className='mt-10 bg-white'>
                            <p className='mx-10'>
                                Nothing to display
                            </p>
                        </div>
                    )}


                </div>
            </div>
        </div>


    )
}

export default ViewTimeTable
