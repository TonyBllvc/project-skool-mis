import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import TimeTableDetails from '../../Components/TimeTableDetails';
import { useSchoolContext } from '../../hooks/useSchoolContext';
import Loading from '../assets/Loading';
import TimeTableForm from '../../Components/TimeTableForm';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Button } from '@chakra-ui/react';

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
                dispatch({ type: 'SET_DATA', payload: json })
            }
        }
        fetchTimeTable()

    }, [])


    return (
        <div className='overscroll-contain'>
            <div className='w-full font-mono font-bold text-lg'>

                {/* the top section */}
                <div className='w-full mb-9 flex flex-row justify-start align-middle text-center items-center'>

                    <h1 className="text-gray-500 font-mono font-semibold">
                        Computer Science
                    </h1>

                </div>


                <Button type='button' value='List' variant='outline' color='green.400' onClick={() => setToggle(!toggle)} >
                    Fill Form
                    {!toggle &&
                        <FaChevronDown className='ml-2 font-normal text-sm' />
                    }
                    {toggle &&
                        <FaChevronUp className='ml-2 font-normal text-sm' />
                    }
                </Button>

                {/* The table for filling */}
                {toggle &&
                    <div className='mt-7'>
                        <TimeTableForm />
                    </div>
                }



                <div className="mt-2 px-14 mb-14">

                    <div className="mt-12 ">
                        {/* This would have model schema created */}
                        <h2 className="text-green-600 font-mono font-bold text-2xl">
                            The Time-Table
                        </h2>
                    </div>

                    <div className="w-full">

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
