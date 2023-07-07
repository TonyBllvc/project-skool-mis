import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import TimeTableDetails from '../../Components/TimeTableDetails';
import { useSchoolContext } from '../../hooks/useSchoolContext';
import Loading from '../assets/Loading';
import TimeTableForm from '../../Components/TimeTableForm';

const TimeTable = () => {

    const [toggle, setToggle] = useState(false);
    // const [school, setSchool ] = useState('')
    const { school, dispatch } = useSchoolContext()
    useEffect(() => {
        const fetchTimeTable = async () => {
            const res = await fetch('/api/time/get_time_table')
            const json = await res.json()

            if (!res.ok) {
                return console.log(json.error)
            }

            if (res.ok) {
                // setSchool(json)
                dispatch({ type: 'SET_DATA', payload: json })
                console.log('correct')

                // dispatch({ type: 'PICK_ID', payload: id[0]._id })
            }
        }
        fetchTimeTable()

    }, [])

    // useEffect(() => {
    //     const fetchTimeTable = async () => {
    //         const res = await fetch('/api/school/fetch/')
    //         const json = await res.json()

    //         if (!res.ok) {
    //             return console.log(json.error)
    //         }

    //         if (res.ok) {
    //             // setSchool(json)
    //             dispatch({ type: 'SET_DATA', payload: json })
    //             console.log('correct')

    //             // dispatch({ type: 'PICK_ID', payload: id[0]._id })
    //         }
    //     }
    //     fetchTimeTable()

    // }, [])

    return (
        <div className='overscroll-contain'>
            <div className='w-full font-mono font-bold text-lg'>

                {/* the top section */}
                <div className='w-full mb-9 flex flex-row justify-start align-middle text-center items-center'>

                    <h1 className="text-gray-500 font-mono font-semibold">
                        Computer Science
                    </h1>

                </div>


                <button onClick={() => setToggle(toggle)}> Fill Form </button>
                {!toggle &&
                    <div className='mt-7'>
                        <TimeTableForm />
                    </div>
                }

                <div className="mt-12 ">
                    {/* This would have model schema created */}
                    <h2 className="text-green-600 font-mono font-bold text-2xl">
                        The Time-Table
                    </h2>
                </div>


                {/* The chat table */}
                <div className="mt-2">

                    <div className="w-full">
                        {/* The table for filling */}
                        <div className="mt-2">
                            <div className="w-full">

                                {/* Table with contents */}
                                {school ? (
                                    <div className='mt-7'>
                                        <div className="mt-1 bg-slate-300 w-full grid grid-cols-4 py-3 px-2 mb-2">
                                            <div className="mx-1 flex justify-start items-center">
                                                Day
                                            </div>
                                            <div className="mx-1 flex justify-start items-center">
                                                Course
                                            </div>
                                            <div className="mx-1 flex justify-start items-center">
                                                Starts
                                            </div>
                                            <div className="mx-1 flex justify-start items-center">
                                                Ends
                                            </div>
                                        </div>
                                        {school && school.map(school => (
                                            <TimeTableDetails school={school} key={school._id} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className='mt-10 bg-white'>
                                        <Loading />
                                    </div>
                                )}
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

export default TimeTable
