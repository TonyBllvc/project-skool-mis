import { Avatar, Box, Button, Card, FormControl, Input, Select, Text, Textarea, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaEnvelope } from 'react-icons/fa'
import NoticeDetails from '../../Components/NoticeDetails'
import { useNoticeContext } from "../../hooks/useNoticeContext.jsx"

const optionOne = [
    { value: 'Assignment', label: 'Assignment', key: '1' },
    { value: 'Test', label: 'Test', key: '2' },
    { value: 'Notice', label: 'Notice', key: '3' },
    { value: 'Project', label: 'Project', key: '4' }
]

// incomplete 
const Notice = () => {
    const { notice, dispatch } = useNoticeContext()
    const toast = useToast()
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [lecturerId, setLecturerId] = useState('64aaec93d8f2999669af02e4')
    const [form, setForm] = useState('')
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        const fetchNotice = async () => {
            const res = await fetch('api/notice/get_notice')
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


    const sendMessage = async (event) => {
        event.preventDefault()
        setLoading(true)

        // check if every field has been filled
        if (!message || !form || !lecturerId) {
            toast({
                title: 'Please fill all the Fields!',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: "bottom",
            })
            return
        }

        const details = { message, form, lecturerId }
        // If Enter is clicked, and there is a message in the box
        // if (event.key === "Enter") {
        try {
            const res = await fetch("/api/notice/convey_notice", {
                method: "POST",
                body: JSON.stringify(details),
                headers: {
                    "Content-Type": "application/json",
                }

            })

            const data = await res.json()

            dispatch({ type: 'CREATE_DATA', payload: data })
            // console.log(data)


        } catch (error) {
            toast({
                title: 'Error Occurred!',
                description: "Failed to send the message",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            return
        }
        setMessage('')
        setForm('')
        // }
    }

    return (
        <Box width='100%' display='flex' flexDirection='column' justifyContent='space-between' overflowY='hidden' h='100%'  >
            <Box ml='5px' height='7%' >
                <Text fontFamily='heading' height='100%' color='blackAlpha.700' fontSize={['22px', '25px', '30px']} fontWeight='bold'>
                    Notice Board
                </Text>
            </Box>
            <hr />
            <Box mt='10px' mb={['24px', '17px', '10px']} height='93%' display='flex' flexDirection='column' justifyContent='space-between' alignItems='center' >
                <Box width='100%' display='flex' alignItems='center' flexDirection='column' justifyContent='space-around' height={['550px', '630px', '710px']}  >
                    <Box display='flex' flexDirection='column' width='100%' height='80%' borderRadius='lg' overflowY='scroll' position='relative'>
                        <Box>
                            {notice && notice.map((notice, index) => (
                                <NoticeDetails notice={notice} key={index} />
                            ))}
                        </Box>

                    </Box>
                    <Box width='100%' height='20%'>
                        <form onSubmit={sendMessage} className='w-full flex z-30 justify-around ' >
                            <Box display='flex' flexDirection='row' height='10%' justifyContent='center' alignItems='center' alignContent='center' p={3} width='100%' >
                                <FormControl mr={1} width={['52%', '60%', '65%']} isRequired >
                                    <Textarea type='text' variant='filled' bg='gray.300' placeholder='Enter a message' onChange={(e) => setMessage(e.target.value)} value={message} resize='vertical' />
                                </FormControl>
                                <Box width={['48%', '40%', '35%']} display='flex' flexDirection={['column', 'column', 'row']} justifyContent='space-around' alignItems='space-around'  >
                                    <FormControl isRequired>
                                        <Select variant='filled'
                                            value={form}
                                            onChange={(e) => setForm(e.target.value)}
                                            placeholder='Select Type'
                                            size={['sm', 'lg', '2xl']}
                                            // py={['', '', ]}
                                            width={['100%', '70%', '75%']}
                                            fontSize={['xs', 'sm', 'lg']}
                                        >
                                            {optionOne.map((options) => (
                                                <option className='w-1/2' key={options.key} value={options.value} >
                                                    {options.label}
                                                </option>
                                            ))}
                                        </Select>

                                    </FormControl>
                                    <Button type='submit'
                                        size={['sm', 'xl', '3xl']} width='40px' colorScheme='green' p={2} ml={2} >
                                        <FaEnvelope className='text-sm sm:text-2xl text-white' />
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default Notice