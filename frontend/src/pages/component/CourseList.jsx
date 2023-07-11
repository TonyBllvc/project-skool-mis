import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import TimeTableDetails from '../../Components/TimeTableDetails';
import Loading from '../assets/Loading';
import TimeTableForm from '../../Components/TimeTableForm';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Button, Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react';
import { useCourseContext } from '../../hooks/useCourseContext';
import CourseListDetails from '../../Components/CourseListDetails';

const CourseList = () => {
    const [toggle, setToggle] = useState(false);
    // const [school, setSchool ] = useState('')
    const navigate = useNavigate()
    const { course, dispatch } = useCourseContext()
    // const { school, dispatch } = useSchoolContext()

    useEffect(() => {
        const fetchTimeTable = async () => {
            const res = await fetch('/api/course/get_courses')
            const json = await res.json()

            if (!res.ok) {
                return console.log(json.error)
            }

            if (res.ok) {
                dispatch({ type: 'GET_COURSE', payload: json })
            }
        }
        fetchTimeTable()

    }, [])


    return (
        <div className='overscroll-contain'>
            <div className='w-full font-mono font-bold text-lg'>

                {/* the top section */}
                <div className='w-full mb-8 flex flex-row justify-start align-middle text-center items-center'>

                    <h1 className="text-gray-500 text-sm sm:text-lg font-mono font-semibold">
                        Computer Science
                    </h1>
                    <div className="flex items-end mx-2 justify-end">
                        <BiRightArrowAlt className="text-gray-500  text-sm sm:text-lg font-mono font-semibold" />
                    </div>
                    {/* This would have model schema created */}
                    <h2 className="text-green-600 text-sm sm:text-lg font-mono font-semibold"> 
                    Courses </h2>

                </div>
                <div className='mb-8'>
                    <button onClick={() => { navigate(-1) }} className=' flex flex-row justify-start text-black hover:text-red-700 text-center items-center align-bottom '>
                        <BiArrowBack className=" mr-1 font-mono text-center text-lg font-semibold" /> Back
                    </button></div>

                <Button type='button' value='List' fontSize={['14px', '16px', '18px']} variant='outline' color='green.400' onClick={() => setToggle(!toggle)} >
                    Fill Form
                    {!toggle &&
                        <FaChevronDown className='ml-2 font-normal text-xs' />
                    }
                    {toggle &&
                        <FaChevronUp className='ml-2 font-normal text-xs' />
                    }
                </Button>

                {/* The table for filling */}
                {toggle &&
                    <div className='mt-7'>
                        {/* <TimeTableForm /> */}
                    </div>
                }



                <div className="mt-2 px-2 sm:px-14 mb-14">

                    <div className="mt-12 ">
                        {/* This would have model schema created */}
                        <h2 className="text-green-600 font-mono font-bold text-2xl">
                            The Course List
                        </h2>
                    </div>

                    <div className="w-full">

                        <div className="mt-2">
                            <div className="w-full">

                                {/* Table with contents */}
                                {course ? (
                                    <div className='mt-7'>
                                        <TableContainer>
                                            <Table>
                                                <Thead w='100%' backgroundColor='blue.400'>
                                                    <Tr display='flex' w='100%' justifyContent='space-around' backgroundColor='yellow.200'>
                                                        <Th w='25%' display='flex' justifyContent='start'> Code </Th>
                                                        <Th w='50%' display='flex' justifyContent='start'> Code </Th>
                                                        <Th w='25%' display='flex' justifyContent='start'> Code </Th>
                                                    </Tr>
                                                </Thead>
                                                {course && course.map(course => (
                                                    <CourseListDetails course={course} key={course._id} />
                                                ))}
                                            </Table>
                                        </TableContainer>
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

export default CourseList