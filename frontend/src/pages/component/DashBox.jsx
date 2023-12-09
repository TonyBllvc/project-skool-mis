import React, { useEffect, useState } from 'react'
import { AiOutlineFolder } from 'react-icons/ai'
import { BiBookOpen } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { useTimeContext } from '../../hooks/useTimeContext'
import { Box, Text } from '@chakra-ui/react'
import { useStudentContext } from '../../hooks/useStudentContext'
import { useLecturerContext } from '../../hooks/useLecturerContext'
import { useCourseContext } from '../../hooks/useCourseContext'
import { useNoticeContext } from '../../hooks/useNoticeContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import NoticeBoard from '../../Components/NoticeBoard'

// const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app';
const DashBox = () => {
    const { time } = useTimeContext()
    // get list of students
    const { student } = useStudentContext()
    const { lecturer } = useLecturerContext()
    const { course } = useCourseContext()
    const { notice, dispatch } = useNoticeContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchNotice = async () => {
            const res = await fetch('https://project-skool-mis-api.vercel.app/notice/get_notice', {
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
                dispatch({ type: 'GET_DATA', payload: json })
            }
        }
        fetchNotice()

    }, [])


    return (
        <div>
            {/* the top section */}
            <div className='w-full mb-10'>
                <h1 className='text-lg sm:text-2xl cursor-pointer font-serif font-semibold text-green-500'>
                    {time}, {user.surname} {user.first_name}
                </h1>
            </div>

            {/* The upper contents */}
            <div>
                {/* work on the grid functionality */}
                <div className='grid lg:grid-cols-2 gap-10 mb-3'>

                    {/* Cards go here*/}

                    {/* card one */}
                    {user.role === 'Lecturer' ? (
                        <>

                        </>
                    ) : (
                        <div className='w-full p-2 bg-white rounded overflow-hidden shadow-lg relative  hover:shadow-slate-800'>
                            <NavLink to='/lecturers'>
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
                                        <h2 className='font-mono'> {lecturer && lecturer.length}  </h2>
                                    </div>
                                    <div className='py-1' >
                                        <h6 className='font-sans text-sm font-normal'> Assigned here</h6>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )}


                    {/* card two */}
                    {user.role === "Student" ? (
                        <>

                        </>
                    ) : (
                        <div className='w-full p-2 bg-white rounded overflow-hidden shadow-lg relative hover:shadow-slate-800'>
                            <NavLink to='/students'>
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
                                        <h2 className='font-mono'> {student && student.length}  </h2>
                                    </div>
                                    <div className='py-1' >
                                        <h6 className='font-sans text-sm font-normal'> Assigned here</h6>
                                    </div>
                                </div>
                            </NavLink>
                        </div>

                    )}
                    {/* card three */}
                    <div className='w-full p-2 bg-white rounded overflow-hidden shadow-lg relative hover:shadow-slate-800'>
                        <NavLink to='/courses'>
                            <div className='w-full flex flex-row my-2'>
                                <div className='w-1/2 flex  items-start justify-start '>
                                    <BiBookOpen className='text-3xl text-orange-500 ' />
                                </div>
                                <div className='w-1/2 flex justify-end '>
                                    <div className='py-0.5 px-2 bg-orange-500 flex justify-center rounded-md shadow-lg cursor-pointer hover:shadow-slate-200 active:bg-orange-600'>
                                        <h3 className='text-white text-base sm:text-lg' > Courses </h3>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div className='py-1' >
                                    <h2 className='font-mono'> {course && course.length} </h2>
                                </div>
                                <div className='py-1' >
                                    <h6 className='font-sans text-sm font-normal'> Assigned here</h6>
                                </div>
                            </div>
                        </NavLink>
                    </div>

                    {/* card four */}
                    {user.role === 'Student' || user.role === 'Lecturer' ? (
                        <>

                        </>
                    ) : (
                        <div className='w-full p-2 bg-white rounded overflow-hidden shadow-lg relative hover:shadow-slate-800'>
                            <NavLink>
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
                                        <h2 className='font-mono'>
                                            {notice && notice.length}
                                        </h2>
                                    </div>
                                    <div className='py-1' >
                                        <h6 className='font-sans text-sm font-normal'> Assigned here</h6>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )}

                </div>
            </div>

            <Box width='100%' mt='55px' display='flex' flexDirection='column' justifyContent='space-between' overflowY='hidden' h='100%'  >
                <Box ml='5px' height='7%' >
                    <Text fontFamily='heading' color='blackAlpha.700' fontSize={['22px', '25px', '30px']} fontWeight='bold'>
                        Notice Board
                    </Text>
                </Box>
                <hr />
                <Box mt='1px' mb={['5px', '5px', '5px']} height='90%' display='flex' flexDirection='column' justifyContent='space-between' alignItems='center' >
                    <Box width='100%' display='flex' alignItems='center' flexDirection='column' justifyContent='space-around' height={['350px', '400px', '450px', '500px']}  >
                        <Box display='flex' flexDirection='column' width='100%' height='80%' borderRadius='lg' overflowY='scroll' position='relative'>
                            <Box>
                                {notice && notice.map((notice, index) => (
                                    <NoticeBoard notice={notice} key={index} />
                                ))}
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default DashBox
