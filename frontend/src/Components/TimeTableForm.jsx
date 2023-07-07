import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Select, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TimeTableForm = () => {
    const [show, setShow] = useState(false)
    const [passInfo, setInfo] = useState([])
    const [courseId, setCourseId] = useState('')
    // to disable input / and
    const [readOnly, setReadOnly] = useState(false)
    const [day, setDay] = useState('')
    const [start, setStart] = useState('')
    const [am_one, setAmOne] = useState('')
    const [end, setEnd] = useState('')
    const [am_two, setAmTwo] = useState('')
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // add picture later 
        if (!day || !end) {
            toast({
                title: 'Please fill all the Fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
            return
        }
        // add picture later 
        const details = { day, end }

        try {
            const res = await fetch("api/user/login", {
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
                console.log(json.error)

            }

            if (res.ok) {
                toast({
                    title: 'Login Successful!',
                    description: start + ' logged in successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                })
                localStorage.setItem('userInfo', JSON.stringify(json))
                setLoading(false)
                navigate('/chats')
            }
        } catch (error) {
            toast({
                title: 'Error occurred, can not login now!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setLoading(false)
        }

    }

    const handleCourses = async () => {
        const res = await fetch('/api/course/get_courses')
        const json = await res.json()

        if (!res.ok) {
            return console.log(json.error)
        }

        if (res.ok) {
            // setSchool(json)
            // dispatch({ type: 'SET_DATA', payload: json })
            console.log('correct pick')
            console.log(json)
            setInfo(json[0])
            console.log(passInfo)

            // dispatch({ type: 'PICK_ID', payload: id[0]._id })
        }

    }

    return (
        <form onClick={handleSubmit} className='w-full flex justify-center'>
            <VStack w='70%' spacing='5px' color='black' >

                <FormControl isRequired>
                    <FormLabel color='black'>
                        Day:
                    </FormLabel>
                    <Select variant='filled'
                        // value={day} 
                        placeholder='Select Day'>
                        <option className='w-1/2' width='50%' w='50%'>
                            Monday
                        </option>
                        <option className='w-1/2' width='50%' w='50%'>
                            Tuesday
                        </option>
                        <option className='w-1/2' width='50%' w='50%'>
                            Wednesday
                        </option>
                        <option className='w-1/2' width='50%' w='50%'>
                            Thursday
                        </option>
                        <option className='w-1/2' width='50%' w='50%'>
                            Friday
                        </option>
                        <option className='w-1/2' width='50%' w='50%'>
                            Saturday
                        </option>
                    </Select>
                </FormControl>

                <Box w='100%' display='flex' flexDirection='row' justifyContent='space-between' >
                    <FormControl w='50%' isRequired>
                        <FormLabel color='black'>
                            Starts:
                        </FormLabel>
                        <Input type='number' bg='green.100' placeholder='i.e. 3:00 ' value={start} onChange={(e) => setStart(e.target.value)} />
                    </FormControl>

                    <FormControl w='40%' isRequired>
                        <FormLabel color='black'>
                            AM/PM:
                        </FormLabel>
                        <Select variant='filled'
                            //  value={am_one} 
                            placeholder='Select AM/PM'>
                            <option className='w-1/2' width='50%' w='50%'>
                                AM
                            </option>
                            <option className='w-1/2' width='50%' w='50%'>
                                PM
                            </option>
                        </Select>
                    </FormControl>

                </Box>

                <Box w='100%' display='flex' flexDirection='row' justifyContent='space-between' >
                    <FormControl id='login-start' w='50%' isRequired>
                        <FormLabel color='black'>
                            Ends:
                        </FormLabel>
                        <Input type='number' bg='green.100' placeholder='i.e. 3:00' value={end} onChange={(e) => setEnd(e.target.value)} />
                    </FormControl>

                    <FormControl id='login-start' w='40%' isRequired>
                        <FormLabel color='black'>
                            AM/PM:
                        </FormLabel>
                        <Select variant='filled'
                            // value={am_two} 
                            placeholder='Select AM/PM'>
                            <option className='w-1/2' width='50%' w='50%'>
                                AM
                            </option>
                            <option className='w-1/2' width='50%' w='50%'>
                                PM
                            </option>
                        </Select>
                    </FormControl>

                </Box>

                <FormControl isRequired>
                    <FormLabel color='black'>
                        Course:
                    </FormLabel>

                    <Select variant='filled' onClick={handleCourses}
                        //  value={passInfo}
                        placeholder='Select Course and semester'>
                        <option className='w-1/2' width='50%' w='50%'>
                            {/* <Box w='100%' display='flex' flexWrap='wrap'  > */}
                            {/* Get courses */}
                            {/* </Box> */}
                        </option>

                    </Select>
                </FormControl>

                {/* Button for Log in */}
                <Button color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={loading} >
                    Login
                </Button>

            </VStack>
        </form>
    )
}

export default TimeTableForm