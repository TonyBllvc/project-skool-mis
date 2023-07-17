import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import TimeTableDetails from '../../Components/TimeTableDetails';
import { useSchoolContext } from '../../hooks/useSchoolContext';
import Loading from '../assets/Loading';
import TimeTableForm from '../../Components/TimeTableForm';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Box, Button, Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react';

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
                <div className='w-full mb-9 flex flex-row justify-space-around align-middle text-center items-center'>

                    <h1 className="text-gray-500  cursor-pointer text-sm sm:text-lg  font-mono font-semibold">
                        Computer Science
                    </h1>

                </div>


                <Button type='button' value='List' fontSize={['14px', '16px', '18px']} variant='outline' color='green.400' onClick={() => setToggle(!toggle)} >
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



                <div className="mt-2 px-2 sm:px-14 mb-14">

                    <div className="mt-12 ">
                        {/* This would have model schema created */}
                        <h2 className="text-green-600 text-base sm:text-2xl font-mono font-bold">
                            The Time-Table
                        </h2>
                    </div>

                    <div className="w-full">

                        <div className="mt-2">
                            <div className="w-full">

                                {/* Table with contents */}
                                {school ? (
                                    <div className='mt-7'>
                                        <TableContainer>
                                            <Table whiteSpace='break-spaces'>
                                                <Thead w='100%' backgroundColor='blue.400'>
                                                    <Tr display='flex' w='100%' justifyContent='space-around' backgroundColor='yellow.200'>
                                                        <Th width={['150px', '100%', '18%']} display='flex' justifyContent='space-around ' alignContent='center' fontSize={['9', '12', '14']}>
                                                            <Box width='100%'  >
                                                                Day
                                                            </Box>
                                                        </Th>
                                                        <Th width={['150px', '100%', '26%']} display='flex' justifyContent='center' alignContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                            <Box width='100%'  >
                                                                Course Code
                                                            </Box>
                                                        </Th>
                                                        <Th width={['150px', '100%', '18%']} display='flex' justifyContent='space-around ' alignContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>

                                                            <Box width='100%'  >
                                                                Start
                                                            </Box>
                                                        </Th>
                                                        <Th width={['150px', '100%', '18%']} display='flex' justifyContent='space-around ' alignContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                            <Box width='100%'  >
                                                                End
                                                            </Box>
                                                        </Th>
                                                    </Tr>
                                                </Thead>

                                                {school && school.map(school => (
                                                    <TimeTableDetails school={school} key={school._id} />
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

export default TimeTable
