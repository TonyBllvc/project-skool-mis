import { Box, Button, Card, FormControl, FormLabel, Input, InputGroup, InputRightElement, Select, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCourseContext } from '../hooks/useCourseContext'
import { useSchoolContext, useTimetableContext } from '../hooks/useTimetableContext'
import CourseUpdateModal from '../model/CourseUpdateModal'
import { useAuthContext } from '../hooks/useAuthContext'

const optionOne = [
    { value: 'Monday', label: 'Monday', key: '1' },
    { value: 'Tuesday', label: 'Tuesday', key: '2' },
    { value: 'Wednesday', label: 'Wednesday', key: '3' },
    { value: 'Thursday', label: 'Thursday', key: '4' },
    { value: 'Friday', label: 'Friday', key: '5' },
    { value: 'Saturday', label: 'Saturday', key: '6' }
]

const optionTwo = [
    { value: 'AM', label: 'AM', key: '1' },
    { value: 'PM', label: 'PM', key: '2' },
]

// const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app';
const TimeTableUpdateForm = ({ documentData, close }) => {
    const { course, dispatch } = useCourseContext()
    const { timetable, dispatch: dispatchTime } = useTimetableContext()
    const { user } = useAuthContext()
    // incomplete ( updating document possessing errors)

    const [id, setId] = useState(documentData._id)
    const [day, setDay] = useState(documentData.day)
    const [start, setStart] = useState(documentData.start)
    const [am_one, setAmOne] = useState(documentData.am_one)
    const [end, setEnd] = useState(documentData.end)
    const [am_two, setAmTwo] = useState(documentData.am_two)
    // const [ selectedOne, setSelectedOne] = useState('')

    const [toggle, setToggle] = useState(false)
    const [passInfo, setInfo] = useState('')
    const [courseId, setCourseId] = useState(documentData.courseId)
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()

    // submit filled form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // check if every field has been filled
        // if (!day || !start || !am_one || !am_two || !end || !courseId || !passInfo) {
        //     toast({
        //         title: 'Please fill all the Fields!',
        //         status: 'warning',
        //         duration: 4000,
        //         isClosable: true,
        //         position: "bottom",
        //     })
        //     return
        // }

        // parse every value into  details        
        const details = { id, day, start, am_one, am_two, end, courseId }

        try {
            const res = await fetch('https://project-skool-mis-api.vercel.app/api/time/update', {
                method: "PUT",
                body: JSON.stringify(details),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
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
                    title: 'Update Successful!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                })
                dispatchTime({ type: 'UPDATE_DATA', payload: json })
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
            return
        }

    }


    // fetch courses so as to pick the id
    const handleCourses = async (e) => {
        // e.preventDefault()

        const res = await fetch('https://project-skool-mis-api.vercel.app/api/course/get_courses', {
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
            dispatch({ type: 'GET_COURSE', payload: json })
            console.log(course)
        }

    }


    return (
        <form onSubmit={handleSubmit} className='w-full mb-14 flex justify-center'>
            <VStack w='85%' spacing='5px' color='black' >

                <FormControl isRequired>
                    <FormLabel color='black'>
                        Day:
                    </FormLabel>

                    <Select variant='filled'
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        placeholder='Select Day'>
                        {optionOne.map((options) => (
                            <option className='w-1/2' key={options.key} value={options.value} >
                                {options.label}
                            </option>
                        ))}
                    </Select>

                </FormControl>

                <Box w='100%' display='flex' flexDirection='row' justifyContent='space-between' >
                    <FormControl w='50%' isRequired>
                        <FormLabel color='black'>
                            Starts:
                        </FormLabel>
                        <Input type='text' bg='green.100' placeholder='i.e. 3:00 ' value={start} onChange={(e) => setStart(e.target.value)} />
                    </FormControl>

                    <FormControl w='40%' isRequired>
                        <FormLabel color='black'>
                            AM/PM:
                        </FormLabel>
                        <Select variant='filled' color='gray.700'
                            value={am_one}
                            onChange={(e) => setAmOne(e.target.value)}
                            placeholder='Select'>
                            {optionTwo.map((options) => (
                                <option className='w-1/2' key={options.key} value={options.value} >
                                    {options.label}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                </Box>

                <Box w='100%' display='flex' flexDirection='row' justifyContent='space-between' >
                    <FormControl w='50%' isRequired>
                        <FormLabel color='black'>
                            Ends:
                        </FormLabel>
                        <Input type='text' bg='green.100' placeholder='i.e. 3:00' value={end} onChange={(e) => setEnd(e.target.value)} />
                    </FormControl>

                    <FormControl id='login-start' w='40%' isRequired>
                        <FormLabel color='black'>
                            AM/PM:
                        </FormLabel>
                        <Select variant='filled' color='gray.800'
                            value={am_two}
                            onChange={(e) => setAmTwo(e.target.value)}
                            placeholder='Select'>
                            {optionTwo.map((options) => (
                                <option className='w-1/2' key={options.key} value={options.value} >
                                    {options.label}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                </Box>

                <FormControl isRequired>
                    <FormLabel color='black'>
                        Course Code:
                    </FormLabel>

                    <FormControl w='100%' display='flex' flexDirection='row' justifyContent='space-between'>

                        <Input w='76%' type='text' variant='outline' placeholder='Please click on the "list" button ' colorScheme='blue' color='blackAlpha.900' border='2px' fontSize={15} fontFamily='cursive' mb={1} value={passInfo} isDisabled />

                        <Box w='20%' border={4} borderColor='green.600' color='green.600' onClick={() => setToggle(!toggle)}>
                            <Input w='100%' type='button' value='List' variant='outline' colorScheme='whatsapp' color='green.600' mb={1} onClick={handleCourses} />
                        </Box>
                    </FormControl>

                    {/* Drop down of all the course*/}
                    {toggle &&
                        <Box overflow='scroll' height={230} px={4} position='relative' zIndex='overlay'>
                            {course && course.map((dataPick) => (
                                <Card key={dataPick._id} onClick={() => setToggle(!toggle)}>
                                    {/* Input courseUpdateModel here */}
                                    <CourseUpdateModal name={dataPick} handleName={setInfo} handleId={setCourseId} />

                                </Card>
                            ))}
                        </Box>
                    }
                    {/* </Box> */}
                </FormControl>

                {/* Button for Log in */}
                <Button color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' onClick={close} isLoading={loading} >
                    Submit
                </Button>

            </VStack>
        </form>
    )
}

export default TimeTableUpdateForm
