import { Avatar, Box, Button, Card, FormControl, Input, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaEnvelope } from 'react-icons/fa'
import NoticeDetails from '../../Components/NoticeDetails'
import { useNoticeContext } from "../../hooks/useNoticeContext.jsx"

// incomplete 
const Notice = () => {
    const { notice, dispatch } = useNoticeContext()
    const toast = useToast()
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState('')

    useEffect(() => {
        const fetchSession = async () => {
            const res = await fetch('api/notice/get_notice')
            const json = await res.json()

            if (!res.ok) {
                return console.log(json.error)
            }

            if (res.ok) {
                dispatch({ type: 'GET_DATA', payload: json })
            }
        }
        fetchSession()

    }, [])


    const sendMessage = async (event) => {
        // If Enter is clicked, and there is a message in the box
        if (event.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${user.token}`,
                    }
                }

                setNewMessage('')
                const { data } = await axios.post(
                    "/api/notice/convey_notice",
                    {
                        content: newMessage,
                        // chatId: selectedChat._id,
                    }, config
                )

                console.log(data)

                // socket.emit("new_message", data.content)
                setMessages([...messages, data])
            } catch (error) {
                toast({
                    title: 'Error Occurred!',
                    description: "Failed to send the message",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })

            }
        }
    }

    const clickMessage = async (event) => {
        // If Enter is clicked, and there is a message in the box

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${user.token}`,
                }
            }

            setNewMessage('')
            const { data } = await axios.post(
                "/api/notice/convey_notice",
                {
                    content: newMessage,
                    // chatId: selectedChat._id,
                }, config
            )

            setMessages([...messages, data])
        } catch (error) {
            toast({
                title: 'Error Occurred!',
                description: "Failed to send the message",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })

        }

    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        //Typing Indicator Logic
    }



    return (
        <Box width='100%' display='flex' flexDirection='column' justifyContent='space-between' backgroundColor='red.400' overflowY='hidden' h='100%'  >
            <Box ml='5px' height='7%' backgroundColor='blue.400' >
                <Text fontFamily='heading' color='blackAlpha.700' fontSize={['22px', '25px', '30px']} fontWeight='bold'>
                    Notice Board
                </Text>
            </Box>
            <hr />
            <Box mt='10px' h='80%' backgroundColor='yellow.400' display='flex' flexDirection='column' justifyContent='space-between'  alignItems='center' >
                <Box width='100%' display='flex'  alignItems='center' flexDirection='column' justifyContent='space-between' height='100%' backgroundColor='blue.500'  >
                    <Box display='flex' flexDirection='column'  width='100%' height='80%' borderRadius='lg' backgroundColor='green.800' zIndex={2} overflowY='hidden'>
                        {/* {notice && notice.map((notice, index) => (
                            <NoticeDetails notice={notice} key={index} />
                        ))} */}
                    </Box>
                    <Box display='flex' mt='5px' flexDirection='row'  height='20%' justifyContent='space-around' alignItems='center' alignContent='center' backgroundColor='teal.400' p={3} w='100%' >
                        <FormControl onKeyDown={sendMessage} mr={1} isRequired mt={3} >
                            <Input variant='filled' bg='gray.300' placeholder='Enter a message' onChange={typingHandler} value={newMessage} />
                        </FormControl>
                        <Button onClick={clickMessage} colorScheme='green' p={2} mt={3} ml={2} >
                            <FaEnvelope className='test-sm text-white' />
                        </Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default Notice