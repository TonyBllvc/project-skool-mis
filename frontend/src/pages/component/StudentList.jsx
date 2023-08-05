import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import { useStudentContext } from '../../hooks/useStudentContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { Box, Button, FormControl, FormLabel, Input, Select, Table, TableContainer, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import Loading from '../assets/Loading';
import StudentListDetails from '../../Components/StudentListDetails';
import StudentsDetailListSession from '../../Components/StudentsDetailListSession';
import { useAuthContext } from '../../hooks/useAuthContext';

const StudentList = () => {
    const [toggle, setToggle] = useState(false);
    // const [school, setSchool ] = useState('')
    const navigate = useNavigate()
    const { student, dispatch } = useStudentContext()
    const [session, setSession] = useState([])
    const [passSession, setPassSession] = useState('')
    const [passStudents, setPassStudents] = useState([])

    const [haveSearched, setHaveSearched] = useState(false)

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState('')
    const { user } = useAuthContext()

    const toast = useToast()

    // useEffect(() => {
    const fetchSession = async () => {
        const res = await fetch('/api/session/', {
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
            return setSession(json)
        }
    }
    // fetchSession()

    // }, [])

    // useEffect(() => {
    const fetchStudent = async () => {
        if (!passSession) {
            return
        }

        const res = await fetch('/api/student/session/' + passSession, {
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
            setHaveSearched(!haveSearched)
            return setPassStudents(json)
        }
    }

    fetchStudent()


    // }, [])

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await fetch('/api/student/student_list', {
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
                setHaveSearched(!haveSearched)
                return dispatch({ type: 'GET_DATA', payload: json })
            }
        }
        fetchStudents()

    }, [])


    const handleSearch = async () => {
        if (!search) {
            toast({
                title: 'Please, enter something first!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            return
        }

        try {
            setLoading(true)

            // const config = {
            //   headers: {
            //     Authorization: `Bearer ${user.token}`,
            //   }
            // }

            // const data = await fetch(`/api/user?search=${search}`, config ) 

            const data = await fetch(`/api/student/?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            )
            const json = await data.json()

            if (data.ok) {
                // setPassStudents([])
                setHaveSearched(haveSearched)
                setLoading(false)
                setSearchResult(json)
            }
        } catch (error) {
            toast({
                title: 'Error Occurred!',
                description: 'Failed to load the User Search Results for users',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            console.log(error.message)
            setLoading(false)
        }
    }


    return (
        <div className='overscroll-contain'>
            <div className='w-full font-mono font-bold text-lg'>

                {/* the top section */}
                <div className='w-full mb-8 flex flex-row justify-start align-middle text-center items-center'>

                    <h1 onClick={() => { navigate('/') }} className="text-gray-500 cursor-pointer text-sm sm:text-lg font-mono font-semibold">
                        Computer Science
                    </h1>
                    <div className="flex items-end mx-2 justify-end">
                        <BiRightArrowAlt className="text-gray-500 cursor-pointer  text-sm sm:text-lg font-mono font-semibold" />
                    </div>
                    {/* This would have model schema created */}
                    <h2 className="text-green-600 cursor-pointer text-sm sm:text-lg font-mono font-semibold">
                        Students </h2>

                </div>
                <div className='mb-5'>
                    <button onClick={() => { navigate(-1) }} className=' flex flex-row justify-start text-black hover:text-red-700 text-center items-center align-bottom '>
                        <BiArrowBack className=" mr-1 font-mono text-center text-sm sm:text-lg font-semibold" /> Back
                    </button>
                </div>

                {/* fontSize={['14px', '16px', '18px']} variant='outline' color='green.400' */}

                <Box width='100%' mt={8} pl='15px' display='flex' justifyContent='space-between' alignItems='center'>
                    <FormControl w={['68%', '58%', '40%']} display='flex' justifyContent='center' textAlign='center' alignItems='center' alignContent='center' >
                        <FormLabel color='black' fontSize={['13', '16', '18']}>
                            Session:
                        </FormLabel>
                        <Select variant='filled' color='gray.700'
                            value={passSession}
                            onClick={fetchSession}
                            onChange={(e) => setPassSession(e.target.value)}
                            placeholder='Select'
                            multiple={false}
                            h={['29', '30', '37']}
                            width={['44', '36', '17']}
                            fontSize={['10', '16', '17']}
                        >
                            {session.map((sessions) => (
                                <option className=' sm:w-1/2 w-36 flex flex-col text-center' key={sessions._id} value={sessions.session} >
                                    {sessions.session}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    {/* <Box width='45%' display='flex' pb={2} >
                        <Input width='60%' type='text' placeholder='Search' mr={2} value={search} onChange={(e) => setSearch(e.target.value)} />
                        <Button bg='green.500' colorScheme='green' onClick={handleSearch} > Go </Button>
                    </Box> */}
                </Box>

                <div className="mt-1 px-2 sm:px-5 mb-14">

                    <div className="mt-12 ">
                        {/* This would have model schema created */}
                        <h2 className="text-green-600 font-mono font-bold text-2xl">
                            The Student List
                        </h2>
                    </div>

                    <div className="w-full">
                        <div className="mt-2">
                            {passSession ? (
                                <div className="w-full">
                                    {/* Table with contents with list of all the students */}
                                    {passStudents ? (
                                        <div className='mt-7'>
                                            <TableContainer>
                                                <Table whiteSpace='break-spaces'>
                                                    <Thead w='100%' >
                                                        <Tr display='flex' width='100%' justifyContent='space-around' px={6} backgroundColor='yellow.200'>
                                                            <Th width={['150px', '100%', '26%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                                <Box width='100%' fontSize={['10', '11', '13', '16']}>
                                                                    Name
                                                                </Box>
                                                            </Th>
                                                            <Th width={['150px', '100%', '27%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                                <Box width='100%' fontSize={['10', '11', '13', '16']}>
                                                                    Reg Number
                                                                </Box>
                                                            </Th>
                                                            <Th width={['150px', '100%', '25%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                                <Box width='100%' fontSize={['10', '11', '13', '16']}>
                                                                    Session
                                                                </Box>
                                                            </Th>
                                                            <Th width={['120px', '100%', '20%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                                <Box width='100%' fontSize={['10', '11', '13', '16']}>
                                                                    Profile
                                                                </Box>
                                                            </Th>
                                                        </Tr>
                                                    </Thead>
                                                    {passStudents && passStudents.map(student => (
                                                        <StudentsDetailListSession student={student} key={student._id} />
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
                            ) : (
                                <div className="w-full">

                                    {/* Table with contents with list of all the students */}
                                    {student ? (
                                        <div className='mt-7'>
                                            <TableContainer>
                                                <Table whiteSpace='break-spaces'>
                                                    <Thead w='100%' backgroundColor='blue.400' >
                                                        <Tr display='flex' width='100%' justifyContent='space-around' px={6} backgroundColor='yellow.200'>
                                                            <Th width={['150px', '100%', '26%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                                <Box width='100%' fontSize={['10', '11', '13', '16']}>
                                                                    Name
                                                                </Box>
                                                            </Th>
                                                            <Th width={['150px', '100%', '27%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                                <Box width='100%' fontSize={['10', '11', '13', '16']}>
                                                                    Reg Number
                                                                </Box>
                                                            </Th>
                                                            <Th width={['150px', '100%', '25%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                                <Box width='100%' fontSize={['10', '11', '13', '16']}>
                                                                    Session
                                                                </Box>
                                                            </Th>
                                                            <Th width={['120px', '100%', '20%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                                                                <Box width='100%' fontSize={['10', '11', '13', '16']}>
                                                                    Profile
                                                                </Box>
                                                            </Th>
                                                        </Tr>
                                                    </Thead>
                                                    {student && student.map(student => (
                                                        <StudentListDetails student={student} key={student._id} />
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
                            )}
                        </div>
                    </div>

                    {/* <StudentList /> */}
                    {/* { results && <StudentList recordsUpload={results}  /> } */}
                </div>
            </div>
        </div>


    )
}

export default StudentList