import { Box, Button, Card, FormControl, FormLabel, Input, InputGroup, InputRightElement, Select, Spinner, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLecturerContext } from '../hooks/useLecturerContext'
import { useCourseContext } from '../hooks/useCourseContext'
import LecturerModal from '../model/LecturerModal'
import SelectedLecturer from '../assests/SelectedLecturer'
import UserLecturer from '../assests/UserLecturer'
import SchoolModal from '../model/SchoolModal'

const optionOne = [
    { value: '100', label: '100', key: '1' },
    { value: '200', label: '200', key: '2' },
    { value: '300', label: '300', key: '3' },
    { value: '400', label: '400', key: '4' },
    { value: '500', label: '500', key: '5' },
    { value: '600', label: '600', key: '6' },
    { value: '700', label: '700', key: '7' },
    { value: '800', label: '800', key: '8' }
]

const CourseForm = () => {
    const { lecturer, dispatch: dispatchLecturers } = useLecturerContext()
    const { dispatch } = useCourseContext()

    const [ school, setSchool ] = useState([])

    const [ schoolInfo, setSchoolInfo ] = useState([])
    const [ schoolId, setSchoolId] = useState('')
    const [level, setLevel] = useState('')
    const [course_code, setCourseCode] = useState('')
    const [course_name, setCourseName] = useState('')

    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [password, setPassword] = useState('')
    // const [ selectedOne, setSelectedOne] = useState('')

    const [toggle, setToggle] = useState(false)
    const [secondToggle, setSecondToggle] = useState(false)
    const [passInfo, setInfo] = useState('')
    const [lecturerId, setLecturerId] = useState('')
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    // submit filled form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // check if every field has been filled
        if (!level || !course_name || !course_code || !selectedUsers || !lecturerId || !passInfo) {
            toast({
                title: 'Please fill all the Fields!',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: "bottom",
            })
            return
        }

        // parse every value into  details        
        const details = { level, course_name, course_code, lecturers_id: selectedUsers, lecturer_id: lecturerId }

        try {
            const res = await fetch("/api/course/set_course", {
                method: "POST",
                body: JSON.stringify(details),
                headers: {
                    "Content-Type": "application/json",
                }

            })

            const json = await res.json()

            if (!res.ok) {
                toast({
                    title: 'Response not okay!',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })
                return console.log(json.error)
            }

            if (res.ok) {
                toast({
                    title: 'Submitted Successfully!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                })
                dispatch({ type: 'CREATE_DATA', payload: json })
                setLoading(false)
                console.log('new data added', json)
            }
        } catch (error) {
            toast({
                title: 'Error occurred, can not login now!',
                status: 'error' + error.message,
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setLoading(false)
        }

    }

    // console.log(lecturer)
    // fetch courses so as to pick the id
    const handleLecturers = async (e) => {
        // e.preventDefault()

        // console.log(lecturer)
        const res = await fetch('/api/lecturer/lecturer_list')
        const json = await res.json()

        if (!res.ok) {
            return console.log(json.error)
        }

        if (res.ok) {
            dispatchLecturers({ type: 'SET_DATA', payload: json })
        }

    }

    const handleSchool = async() => {
        const res = await fetch('/api/school/fetch')
        const json = await res.json()

        if (!res.ok) {
            return console.log(json.error)
        }

        if (res.ok) {
            // dispatchLecturers({ type: 'SET_DATA', payload: json })
            setSchool(json)
        }

    }

    const handleSearch = async (query) => {

        if (!query) {
            return
        }
        if (query.length === 0) {
            setSearch('')
            setSearchResult([])

        }


        if (query.length >= 1) {
            setSearch(query)

            try {
                setLoading(true)

                const data = await fetch(`/api/lecturer/?search=${search}`, {
                    //   headers: {
                    //     Authorization: `Bearer ${user.token}`,
                    //   }
                }
                )
                const json = await data.json()

                // console.log(json)
                setLoading(false)
                setSearchResult(json)
            } catch (error) {
                toast({
                    title: 'Error Occurred!',
                    description: 'Failed to load the User Search Results for Group',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })

            }
        }

    }

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter(val => val._id !== delUser._id))
    }

    const handleGroup = (userToAdd) => {

        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: 'User already added',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            return
        }

        setSelectedUsers([...selectedUsers, userToAdd])
    }
    return (
        <form onSubmit={handleSubmit} className='w-full flex justify-center'>
            <VStack w='70%' spacing='5px' color='black' >


                <Box w='100%' display='flex' flexDirection='row' justifyContent='space-between' >

                    <FormControl w='50%' id='first-course_code' isRequired>
                        <FormLabel color='black'>
                            Course Code:
                        </FormLabel>
                        <Input type='text' bg='green.100' placeholder='Enter course code' value={course_code} onChange={(e) => setCourseCode(e.target.value)} />
                    </FormControl>

                    <FormControl w='50%' isRequired>
                        <FormLabel color='black'>
                            Level:
                        </FormLabel>

                        <Select variant='filled'
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            placeholder='Select Day'>
                            {optionOne.map((options) => (
                                <option className='w-1/2' key={options.key} value={options.value} >
                                    {options.label}
                                </option>
                            ))}
                        </Select>

                    </FormControl>

                </Box>

                <FormControl id='course_name' isRequired>
                    <FormLabel color='black'>
                        Course name:
                    </FormLabel>
                    <Input type='text' bg='green.100' placeholder='Enter course name id' value={course_name} onChange={(e) => setCourseName(e.target.value)} />
                </FormControl>


                <FormControl isRequired>
                    <FormLabel color='black'>
                        Course Coordinator:
                    </FormLabel>

                    <FormControl w='100%' display='flex' flexDirection='row' justifyContent='space-between'>

                        <Input w='76%' type='text' variant='outline' placeholder='Please click on the "list" button ' colorScheme='blue' color='blackAlpha.900' border='2px' fontSize={15} fontFamily='cursive' mb={1} value={passInfo} isDisabled />

                        <Box w='20%' border={4} borderColor='green.600' color='green.600' onClick={() => setToggle(!toggle)}>
                            <Input w='100%' type='button' value='List' variant='outline' colorScheme='whatsapp' color='green.600' mb={1} onClick={handleLecturers} />
                        </Box>
                    </FormControl>

                    {/* Drop down of all the lecturer*/}
                    {toggle &&
                        <Box overflow='scroll' height={150} px={4} position='relative' zIndex='overlay'>

                            {lecturer && lecturer.map((dataPick) => (

                                <Card key={dataPick._id} onClick={() => setToggle(!toggle)}>

                                    <LecturerModal name={dataPick} handleName={setInfo} handleId={setLecturerId} />

                                </Card>

                            ))}
                        </Box>
                    }
                    {/* </Box> */}
                </FormControl>

                <FormControl isRequired>
                    <FormLabel color='black'>
                        Level:
                    </FormLabel>

                <FormControl w='100%' display='flex' flexDirection='row' justifyContent='space-between'>

                    <Input w='76%' type='text' variant='outline' placeholder='Please click on the "list" button ' colorScheme='blue' color='blackAlpha.900' border='2px' fontSize={15} fontFamily='cursive' mb={1} value={schoolInfo} isDisabled />

                    <Box w='20%' border={4} borderColor='green.600' color='green.600' onClick={() => setSecondToggle(!secondToggle)}>
                        <Input w='100%' type='button' value='List' variant='outline' colorScheme='whatsapp' color='green.600' mb={1} onClick={handleSchool} />
                    </Box>
                </FormControl>

                {/* Drop down of all the course*/}
                {secondToggle &&
                    <Box overflow='scroll' height={230} px={4} position='relative' zIndex='overlay'>

                        {school && school.map((dataPick) => (

                            <Card key={dataPick._id} onClick={() => setSecondToggle(!secondToggle)}>

                                <SchoolModal name={dataPick} handleName={setSchoolInfo} handleId={setSchoolId} />

                            </Card>

                        ))}
                    </Box>
                }
                </FormControl>



                <FormControl isRequired>
                    <FormLabel color='black'>
                        Course Lecturers:
                    </FormLabel>

                    <FormControl>
                        <Input placeholder='Add Users eg: John, Mag' mb={1} onChange={(e) => handleSearch(e.target.value)} />
                    </FormControl>

                    <Box w='100%' display='flex' flexWrap='wrap' >
                        {selectedUsers.map((u) => (
                            <SelectedLecturer key={u._id} user={u} handleFunction={() => handleDelete(u)} />
                        ))}
                    </Box>

                    {loading ? (
                        <Spinner ml='auto' display='flex' />
                    ) : (
                        searchResult?.slice(0, 4).map(user => (
                            <UserLecturer key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                        ))
                    )
                    }
                </FormControl>


                {/* Button for Log in */}
                <Button color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={loading} >
                    Submit
                </Button>

            </VStack>
        </form>
    )
}

export default CourseForm