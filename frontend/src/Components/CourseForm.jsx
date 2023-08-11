import { Box, Button, Card, FormControl, FormLabel, Input, InputGroup, InputRightElement, Select, Spinner, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLecturerContext } from '../hooks/useLecturerContext'
import { useCourseContext } from '../hooks/useCourseContext'
import LecturerModal from '../model/LecturerModal'
import SelectedLecturer from '../assets/SelectedLecturer'
import UserLecturer from '../assets/UserLecturer'
import SchoolModal from '../model/SchoolModal'
import { useAuthContext } from '../hooks/useAuthContext'

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

// const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app';
const CourseForm = ({ setToggling, toggling }) => {
    const { lecturer, dispatch: dispatchLecturers } = useLecturerContext()
    const { dispatch } = useCourseContext()

    const { user } = useAuthContext()

    const [school, setSchool] = useState([])

    const [schoolInfo, setSchoolInfo] = useState('') // ... 5.1
    const [schoolId, setSchoolId] = useState('') // ... 5.0
    const [level, setLevel] = useState('') // ....2
    const [course_code, setCourseCode] = useState('') // ....1
    const [course_name, setCourseName] = useState('') // .... 3

    const [selectedUsers, setSelectedUsers] = useState([])
    // to hold and set the value inside the query box
    const [search, setSearch] = useState('')
    // pass the list o lecturers selected
    const [searchResult, setSearchResult] = useState([])

    const [lecturer_id, setLecturerId] = useState('')
    const [toggle, setToggle] = useState(false)
    const [secondToggle, setSecondToggle] = useState(false)
    const [passInfo, setInfo] = useState('') // ....4 course coordinator id
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState('')

    const toast = useToast()

    const handleChanges = (e) => {
        e.preventDefault()
        const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
        setCourseCode(value)

        if (value.length !== 6) {
            setError('6 characters only')
        } else if (/\s/.test(value)) {
            setError('No spacing allowed')
        } else {
            setError('')
        }
    }

    // submit filled form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // check if every field has been filled
        if (!level || !course_name || !course_code || !lecturer_id || !selectedUsers || !schoolId || !passInfo) {
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
        const details = {
            level, schoolId, course_name, course_code, lecturer_id, lecturers_id: selectedUsers,
            // lecturer_id: lecturerId 
        }

        try {
            const res = await fetch('https://my-project-mis-api.onrender.com/api/course/set_course', {
                method: "POST",
                body: JSON.stringify(details),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                }

            })

            const json = await res.json()

            if (!res.ok) {
                toast({
                    title: json.error + "!",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })
                setLoading(false)
                return console.log(json.error)
            }

            if (res.ok) {
                toast({
                    title: 'Upload Successful!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                })
                dispatch({ type: 'CREATE_DATA', payload: json })
                setLoading(false)
                setLevel('')
                setCourseName('')
                setCourseCode('')
                setLecturerId('')
                setSelectedUsers([])
                setSchoolId('')
                setInfo('')
                setToggling(!toggling)
                console.log('new data added', json)
            }
        } catch (error) {
            toast({
                title: error.message,
                // status: 'error' + error.message,
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
        const res = await fetch('https://my-project-mis-api.onrender.com/api/lecturer/lecturer_list', {
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
            dispatchLecturers({ type: 'SET_DATA', payload: json })
        }

    }

    const handleSchool = async () => {
        const res = await fetch('https://my-project-mis-api.onrender.com/api/school/fetch', {
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

                const data = await fetch(`https://my-project-mis-api.onrender.com/api/lecturer/?search=${search}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    }
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
        // console.log(userToAdd)
        // console.log(...selectedUsers)
    }
    return (
        <form onSubmit={handleSubmit} className='w-full flex justify-center'>
            <VStack w={['90%', '85%', '70%']} spacing='5px' color='black' >


                <Box w='100%' display='flex' flexDirection='row' justifyContent='space-between' >

                    <FormControl w='53.5%' id='first-course_code' isRequired>
                        <FormLabel width='100%' color='black' fontSize={['12.5', '13', '15', '16']}>
                            Course Code:
                        </FormLabel>
                        <Input fontSize={['9.5', '10', '13', '15']} type='text' bg='green.100' pattern='[A-Z0-9]*' maxLength={6} placeholder='Enter course code' value={course_code} onChange={handleChanges} />
                        {error ? <Text fontSize={['xs', 'sm', 'md', 'lg']} color='red.700'>
                            {error}
                        </Text> : <> </>}
                    </FormControl>

                    <FormControl w='45%' isRequired>
                        <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                            Level:
                        </FormLabel>

                        <Select variant='filled'
                            value={level}
                            fontSize={['9.5', '16', '17']}
                            onChange={(e) => setLevel(e.target.value)}
                            placeholder='Select Level'>
                            {optionOne.map((options) => (
                                <option className='w-1/2' key={options.key} value={options.value} >
                                    {options.label}
                                </option>
                            ))}
                        </Select>

                    </FormControl>

                </Box>

                <FormControl id='course_name' isRequired>
                    <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                        Course name:
                    </FormLabel>
                    <Input fontSize={['9.5', '10', '13', '15']} type='text' bg='green.100' placeholder='Enter course name id' value={course_name} onChange={(e) => setCourseName(e.target.value)} />
                </FormControl>


                <FormControl isRequired>
                    <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                        Course Coordinator:
                    </FormLabel>

                    <FormControl w='100%' display='flex' flexDirection='row' justifyContent='space-between'>

                        <Input fontSize={['8.5', '10', '13', '15']} w={['67%', '70%', '76%']} type='text' variant='outline' placeholder='Please click on the "list" button ' colorScheme='blue' color='blackAlpha.900' border='2px' fontFamily='sans-serif' mb={1} value={passInfo} isDisabled />

                        <Box w={['31%', '28%', '20%']} border={4} borderColor='green.600' color='green.600' onClick={() => setToggle(!toggle)}>
                            <Input fontSize={['14', '16', '17']} w='100%' type='button' value='List' variant='outline' colorScheme='whatsapp' color='green.600' mb={1} onClick={handleLecturers} />
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
                    <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                        School Semester:
                    </FormLabel>

                    <FormControl w='100%' display='flex' flexDirection='row' justifyContent='space-between'>

                        <Input w={['67%', '70%', '76%']} fontSize={['9.5', '10', '13', '15']} type='text' variant='outline' placeholder='Please click on the "list" button ' colorScheme='blue' color='blackAlpha.900' border='2px' fontFamily='sans-serif' mb={1} value={schoolInfo} isDisabled />

                        <Box w={['31%', '28%', '20%']} border={4} borderColor='green.600' color='green.600' onClick={() => setSecondToggle(!secondToggle)}>
                            <Input fontSize={['14', '16', '17']} w='100%' type='button' value='List' variant='outline' colorScheme='whatsapp' color='green.600' mb={1} onClick={handleSchool} />
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
                    <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                        Course Lecturers:
                    </FormLabel>

                    <FormControl>
                        <Input fontSize={['9.5', '10', '13', '15']} placeholder='Add Users eg: John, Mag' mb={1} onChange={(e) => handleSearch(e.target.value)} />
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
