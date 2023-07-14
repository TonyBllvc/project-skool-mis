import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useLecturerContext } from '../../hooks/useLecturerContext';
import { Box, Button, Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react';
import Loading from '../assets/Loading';
import LecturersListDetails from '../../Components/LecturersListDetails';

const LecturerList = () => {
    const [toggle, setToggle] = useState(false);
    // const [school, setSchool ] = useState('')
    const { lecturer, dispatch } = useLecturerContext()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLecturer = async () => {
            const res = await fetch('/api/lecturer/lecturer_list')
            const json = await res.json()

            if (!res.ok) {
                return console.log(json.error)
            }

            if (res.ok) {
                dispatch({ type: 'SET_DATA', payload: json })
            }
        }
        fetchLecturer()

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
                        Lecturers </h2>

                </div>
                <div className='mb-8'>
                    <button onClick={() => { navigate(-1) }} className=' flex flex-row justify-start text-black hover:text-red-700 text-center items-center align-bottom '>
                        <BiArrowBack className=" mr-1 font-mono text-center text-lg font-semibold" /> Back
                    </button></div>
{/* 
                <Button type='button' value='List' fontSize={['14px', '16px', '18px']} variant='outline' color='green.400' onClick={() => setToggle(!toggle)} >
                    Fill Form
                    {!toggle &&
                        <FaChevronDown className='ml-2 font-normal text-xs' />
                    }
                    {toggle &&
                        <FaChevronUp className='ml-2 font-normal text-xs' />
                    }
                </Button> */}

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
                            The Lecturer List
                        </h2>
                    </div>

                    <div className="w-full">

                        <div className="mt-2">
                            <div className="w-full">

                                {/* Table with contents */}
                                {lecturer ? (
                                    <div className='mt-7'>
                                        <TableContainer>
                                            <Table>
                                                <Thead w='100%' backgroundColor='blue.400'>
                                                    <Tr display='flex' width='100%' justifyContent='space-around' px={6} backgroundColor='yellow.200'>
                                                        <Th width={['120px', '100%', '15%']} display='flex' justifyContent='center' fontSize={['9', '12', '14']}  overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                                                            <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces' >
                                                                S/N
                                                            </Box>
                                                        </Th>
                                                        <Th width={['150px', '100%', '85%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                                                            <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces' display='flex' justifyContent='start' >
                                                                Name
                                                            </Box>
                                                        </Th>
                                                    </Tr>
                                                </Thead>
                                                {lecturer && lecturer.map((lecturer, index) => (
                                                    <LecturersListDetails lecturer={lecturer} index={index} key={index} />
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

export default LecturerList