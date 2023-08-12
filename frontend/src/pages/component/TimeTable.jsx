import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import TimeTableDetails from '../../Components/TimeTableDetails';
import { useTimetableContext } from '../../hooks/useTimetableContext';
import Loading from '../assets/Loading';
import TimeTableForm from '../../Components/TimeTableForm';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Box, Button, Table, TableContainer, Th, Thead, Tr } from '@chakra-ui/react';
import { useAuthContext } from '../../hooks/useAuthContext';
import logoFav from '../../images/images_logo_fav.jpg'

// const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app';
const TimeTable = () => {

    const [toggle, setToggle] = useState(false);
    // const [timetable, setSchool ] = useState('')
    const { timetable, dispatch } = useTimetableContext()
    // const [ timetable, setTimetable] = useState([])
    const { user } = useAuthContext()

    useEffect(() => {
        document.title = 'Time-table'

        const faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.href = logoFav; // Replace with your favicon path
        document.head.appendChild(faviconLink);

        // Clean up when component unmounts
        return () => {
            document.head.removeChild(faviconLink);
        }
    }, [])

    useEffect(() => {
        const fetchTimeTable = async () => {
            const res = await fetch('https://my-project-mis-api.onrender.com/api/time/get_time_table', {
                // we need to send authorization headers(required for authorization)
                headers: {
                    // to output the bearer token 
                    // by user the ${user.token}
                    // this is then picked by the middleware in the backend that protects our routes
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await res.json()

            if (!res.ok) {
                return console.log(json.error)
            }

            if (res.ok) {
                dispatch({ type: 'SET_DATA', payload: json })
                // setTimetable(json)
                // console.log(te)
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

                {user.role === 'Admin' ? (
                    <div>
                        <Button type='button' value='List' fontSize={['11', '13', '15', '18']} variant='outline' color='green.400' onClick={() => setToggle(!toggle)} >
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
                                <TimeTableForm toggling={toggle} setToggling={setToggle} />
                            </div>
                        }
                    </div>
                ) : (
                    <>

                    </>
                )}

                <div className="mt-2 px-2 sm:px-3 mb-14">

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
                                {timetable ? (
                                    <div className='mt-7'>
                                        <TableContainer>
                                            <Table whiteSpace='break-spaces'>
                                                <Thead w='100%' backgroundColor='blue.400'>
                                                    <Tr display='flex' w='100%' justifyContent='space-around' backgroundColor='yellow.200'>
                                                        <Th width={['150px', '100%', '17%']} display='flex' justifyContent='space-around ' alignContent='center' fontSize={['9', '12', '14']}>
                                                            <Box width='100%' fontSize={['10', '11', '13', '16']} >
                                                                Day
                                                            </Box>
                                                        </Th>
                                                        <Th width={['150px', '100%', '26%']} display='flex' justifyContent='center' alignContent='center' overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                            <Box width='100%' fontSize={['10', '11', '13', '16']} >
                                                                Course Code
                                                            </Box>
                                                        </Th>
                                                        <Th width={['150px', '100%', '18%']} display='flex' justifyContent='space-around ' alignContent='center' overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>

                                                            <Box width='100%' fontSize={['10', '11', '13', '16']} >
                                                                Start
                                                            </Box>
                                                        </Th>
                                                        <Th width={['150px', '100%', '18%']} display='flex' justifyContent='space-around ' alignContent='center' overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                            <Box width='100%' fontSize={['10', '11', '13', '16']} >
                                                                End
                                                            </Box>
                                                        </Th>
                                                        {user.role === 'Admin' ? (
                                                            <Th width={['150px', '100%', '18%']} display='flex' justifyContent='space-around ' alignContent='center' overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                                <Box width='100%' fontSize={['10', '11', '13', '16']} >

                                                                </Box>
                                                            </Th>
                                                        ) : (
                                                            <>

                                                            </>
                                                        )}
                                                    </Tr>
                                                </Thead>

                                                {timetable && timetable.map(timetable => (
                                                    <TimeTableDetails timetable={timetable} key={timetable._id} />
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
