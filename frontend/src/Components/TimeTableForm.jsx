import { Box, Button, Card, FormControl, FormLabel, Input, InputGroup, InputRightElement, Select, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCourseContext } from '../hooks/useCourseContext'
import CourseModal from '../model/CourseModal'
import { useSchoolContext, useTimetableContext } from '../hooks/useTimetableContext'
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
const TimeTableForm = ({ setToggling, toggling }) => {
    const { course, dispatch } = useCourseContext()
    const { dispatch: dispatchTime } = useTimetableContext()
    const { user } = useAuthContext()

    const [day, setDay] = useState('')
    const [starts, setStarts] = useState('')
    const [start, setStart] = useState('')
    const [am_one, setAmOne] = useState('')
    const [end, setEnd] = useState('')
    const [ends, setEnds] = useState('')
    const [am_two, setAmTwo] = useState('')
    const [selectedOne, setSelectedOne] = useState('')

    const [toggle, setToggle] = useState(false)
    const [passInfo, setInfo] = useState('')
    const [courseId, setCourseId] = useState('')
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()

    const handleStartTime = (event) => {
        const inputValue = event.target.value;
        setStarts(inputValue);

        if (inputValue) {
            // Split the input time by ":"
            const [hours, minutes] = inputValue.split(':');

            // Create a Date object to format the time
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);

            // Format the time as 12-hour format with AM/PM
            const formattedTime = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            setStart(formattedTime)
            // console.log(formattedTime); // Output: "11:00 PM"
        }

    }

    const handleEndTime = (event) => {
        const inputValue = event.target.value;
        setEnds(inputValue);

        if (inputValue) {
            // Split the input time by ":"
            const [hours, minutes] = inputValue.split(':');

            // Create a Date object to format the time
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);

            // Format the time as 12-hour format with AM/PM
            const formattedTime = date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            });
            setEnd(formattedTime)
            // console.log(formattedTime); // Output: "11:00 PM"
        }


    }

    // submit filled form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // check if every field has been filled
        if (!day || !start || !end || !courseId || !passInfo) {
            toast({
                title: 'Please fill all the Fields!',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: "top",
            })
            setLoading(false)
            return
        }

        // parse every value into  details        
        const details = { day, start, end, courseId }

        try {
            const res = await fetch('https://my-project-mis-api.onrender.com/api/time/set_time_table', {
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
                    title: json.error,
                    // status: 'error',
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
                dispatchTime({ type: 'CREATE_DATA', payload: json })
                setLoading(false)
                setDay('')
                setStart('')
                setAmOne('')
                setEnd('')
                setAmTwo('')
                setCourseId('')
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

    // fetch courses so as to pick the id
    const handleCourses = async (e) => {
        // e.preventDefault()

        const res = await fetch('https://my-project-mis-api.onrender.com/api/course/get_courses', {
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
        <form onSubmit={handleSubmit} className='w-full flex justify-center'>
            <VStack w={['90%', '85%', '70%']} spacing='5px' color='black' >

                <FormControl isRequired>
                    <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                        Day:
                    </FormLabel>

                    <Select variant='filled'
                        value={day}
                        h={['29', '30', '37']}
                        fontSize={['10', '16', '17']}
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
                    <FormControl w='48%' isRequired>
                        <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                            Starts:
                        </FormLabel>
                        <Input fontSize={['9.5', '10', '13', '15']} type='time' bg='green.100' placeholder='i.e. 3:00 ' value={starts} onChange={handleStartTime} />

                        {/* <Input fontSize={['9.5', '10', '13', '15']} type='time' bg='green.100' placeholder='i.e. 3:00 ' value={selectedOne} onChange={(e) => setSelectedOne(start)} /> */}
                    </FormControl>

                    <FormControl w='48%' isRequired>
                        <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                            Ends:
                        </FormLabel>
                        <Input type='time' fontSize={['9.5', '10', '13', '15']} bg='green.100' placeholder='i.e. 3:00' value={ends} onChange={handleEndTime} />
                    </FormControl>

                    {/* <FormControl w='50%' isRequired>
                        <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                            AM/PM:
                        </FormLabel>
                        <Select variant='filled' color='gray.700'
                            value={am_one}
                            fontSize={['8.5', '16', '17']}
                            onChange={(e) => setAmOne(e.target.value)}
                            placeholder='Select'>
                            {optionTwo.map((options) => (
                                <option className='w-1/2' key={options.key} value={options.value} >
                                    {options.label}
                                </option>
                            ))}
                        </Select>
                    </FormControl> */}

                </Box>

                <Box w='100%' display='flex' flexDirection='row' justifyContent='space-between' >
                    {/* <FormControl w='48%' isRequired>
                        <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                            Ends:
                        </FormLabel>
                        <Input type='time' fontSize={['9.5', '10', '13', '15']} bg='green.100' placeholder='i.e. 3:00' value={ends} onChange={handleEndTime} />
                    </FormControl> */}

                    {/* <FormControl id='login-start' w='50%' isRequired>
                        <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                            AM/PM:
                        </FormLabel>
                        <Select variant='filled' color='gray.800'
                            value={am_two}
                            // h={['39', '30', '37']}
                            fontSize={['8.5', '16', '17']}
                            onChange={(e) => setAmTwo(e.target.value)}
                            placeholder='Select'>
                            {optionTwo.map((options) => (
                                <option className='w-1/2' key={options.key} value={options.value} >
                                    {options.label}
                                </option>
                            ))}
                        </Select>
                    </FormControl> */}

                </Box>

                <FormControl isRequired>
                    <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
                        Course Code:
                    </FormLabel>

                    <FormControl w='100%' display='flex' flexDirection='row' justifyContent='space-between' isRequired>

                        <Input w={['67%', '70%', '76%']} type='text' variant='outline' placeholder='Please click on the "list" button ' colorScheme='blue' fontSize={['8.5', '11', '15']} color='blackAlpha.900' border='2px' fontFamily='sans-serif' mb={1} value={passInfo} isDisabled />

                        <Box w={['31%', '28%', '20%']} border={4} borderColor='green.600' color='green.600' onClick={() => setToggle(!toggle)}>
                            <Input w='100%' fontSize={['14', '16', '17']} type='button' value='List' variant='outline' colorScheme='whatsapp' color='green.600' mb={1} onClick={handleCourses} />
                        </Box>
                    </FormControl>

                    {/* Drop down of all the course*/}
                    {toggle &&
                        <Box overflow='scroll' height={230} px={4} position='relative' zIndex='overlay'>

                            {course && course.map((dataPick) => (

                                <Card key={dataPick._id} onClick={() => setToggle(!toggle)}>

                                    <CourseModal name={dataPick} handleName={setInfo} handleId={setCourseId} />

                                </Card>

                            ))}
                        </Box>
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

export default TimeTableForm
