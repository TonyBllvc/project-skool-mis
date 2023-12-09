import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import React, { useEffect, useState } from 'react'
import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useStudentDetailsContext } from '../../hooks/useStudentDetailsContext'
import Loading from '../assets/Loading';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import StudentDetails from '../../Components/StudentDetails';
import { useStudentContext } from '../../hooks/useStudentContext';
import StudentResults from '../../Components/StudentResults';
import { useStudentInfoContext } from '../../hooks/useStudentInfoContext';
import UploadStudentResult from '../../Components/UploadStudentResult';
import { useAuthContext } from '../../hooks/useAuthContext';
import logoFav from '../../images/images_logo_fav.jpg'

// const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app';
// this for the admin 
const StudentPersonalResults = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false);
    const [result, setResult] = useState('')
    const { studentDetails, dispatch } = useStudentDetailsContext()
    // const { dispatch: dispatchInfo  } = useStudentInfoContext()
    const { user } = useAuthContext()

    useEffect(() => {
        document.title = 'Your Results'
    
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
        const fetchStudents = async () => {
            const res = await fetch('https://project-skool-mis-api.vercel.app/api/result/student/' + user._id, {
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
                console.log(json)
                dispatch({ type: 'GET_DATA', payload: json })
            }
        }
        fetchStudents()

    }, [])

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await fetch('https://project-skool-mis-api.vercel.app/api/student/' + user._id, {
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
                console.log(json)
                // dispatchInfo({ type: 'GET_DATA', payload: json })
                setResult(json)
            }
        }
        fetchStudents()

    }, [])


    return (
        <div className='overscroll-contain'>
            <div className='w-full font-mono font-bold text-lg'>

                {/* the top section */}
                <div className='w-full mb-8 flex flex-row justify-start align-middle text-center items-center'>

                    <h1 onClick={() => { navigate('/') }} className="text-gray-500 cursor-pointer text-sm sm:text-lg font-mono font-semibold">
                        Computer Science
                    </h1>
                    <div className="flex items-end mx-2 justify-end">
                        <BiRightArrowAlt className="text-gray-500  text-sm sm:text-lg font-mono font-semibold" />
                    </div>
                    {/* This would have model schema created */}
                    <h2 onClick={() => { navigate(-1) }} className="text-gray-500 cursor-pointer text-sm sm:text-lg font-mono font-semibold">
                        Students
                    </h2>
                    <div className="flex items-end mx-2 justify-end">
                        <BiRightArrowAlt className="text-gray-500  text-sm sm:text-lg font-mono font-semibold" />
                    </div>
                    {/* This would have model schema created */}
                    <h2 className="text-green-600 cursor-pointer text-sm sm:text-lg font-mono font-semibold">
                        Student Details
                    </h2>

                </div>

                <div className='mb-5'>
                    <button onClick={() => { navigate(-1) }} className=' flex flex-row justify-start text-black hover:text-red-700 text-center items-center align-bottom '>
                        <BiArrowBack className=" mr-1 font-mono text-center text-lg font-semibold" /> Back
                    </button>
                </div>

                {user.role === 'Admin' ? (
                    <Box mt={8}>

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
                                <UploadStudentResult />
                            </div>
                        }
                    </Box>
                ) : (
                    <>

                    </>
                )}

                <Box mt={8} ml={2} display='flex' width='100%'>
                    {/* {result ? ( */}
                    <TableContainer width="100%" whiteSpace='break-spaces'>
                        <Table width='100%' display='flex' flexDirection='row'>
                            <Thead width={['35%', '25%', '25%']}>
                                <Tr display='flex' width='100%' flexDirection='column' backgroundColor='yellow.200'>
                                    <Th width='100%' px={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                        <Box width='100%'  fontSize={['10', '11', '13', '16']}>
                                            Name:
                                        </Box>
                                    </Th>
                                    <Th width='100%' px={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                        <Box width='100%'  fontSize={['10', '11', '13', '16']} >
                                            Faculty:
                                        </Box>
                                    </Th>
                                    <Th width='100%' px={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                        <Box width='100%'  fontSize={['10', '11', '13', '16']} >
                                            Department:
                                        </Box>
                                    </Th>
                                    <Th width='100%' px={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                        <Box width='100%'  fontSize={['10', '11', '13', '16']} >
                                            Reg Number:
                                        </Box>
                                    </Th>
                                </Tr>
                            </Thead>
                            {/* <StudentDetails/> */}
                            {result &&
                                <StudentDetails studentInfo={result} />
                            }
                            {/* ) */}
                            {/* )} */}
                        </Table>
                    </TableContainer>
                    {/* ) : (
            <div className='mt-10 bg-white'>
              Nothing to display
            </div>

          )} */}
                </Box>

                {/* Drop Results */}
                <Box mt={8} ml={2} display='flex' width='100%'>
                    {studentDetails ? (
                        <TableContainer width='100%' >
                            <Table width='100%' whiteSpace='break-spaces'>
                                <Thead width='100%'>
                                    <Tr display='flex' width='100%' justifyContent='space-around' backgroundColor='yellow.200'>
                                        <Th width={['150px', '30%', '30%']} px={4} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                            <Box width='100%'  fontSize={['10', '11', '13', '16']}>
                                                Course Code
                                            </Box>
                                        </Th>
                                        <Th width={['150px', '30%', '25%']} px={4} display='flex' justifyContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                            <Box width='100%'  fontSize={['10', '11', '13', '16']} >
                                                Grade
                                            </Box>
                                        </Th>
                                        <Th width={['150px', '30%', '25%']} px={4} display='flex' justifyContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                            <Box width='100%'  fontSize={['10', '11', '13', '16']}>
                                                Remark
                                            </Box>
                                        </Th>
                                        <Th width={['150px', '30%', '30%']} px={4} display='flex' justifyContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                            <Box width='100%'  fontSize={['10', '11', '13', '16']}>
                                                Information
                                            </Box>
                                        </Th>
                                    </Tr>
                                </Thead>
                                {studentDetails && studentDetails.map((studentDetails, index) => (
                                    <StudentResults studentItem={studentDetails} key={index} />
                                )
                                )}
                            </Table>
                        </TableContainer>
                    ) : (
                        <div className='mt-10 bg-white'>
                            <Loading />
                        </div>
                    )}


                </Box>
            </div>
        </div>
    )
}

export default StudentPersonalResults