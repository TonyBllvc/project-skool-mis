import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { useAuthContext } from '../hooks/useAuthContext'
import GroupChatsModel from '../model/GroupChatsModel'
import Loading from '../pages/assets/Loading'
import { getSender } from '../config/chatLogic'
import { useChatState } from '../hooks/useChatState'
import { useSelectChatContext } from '../hooks/useSelectChatContext'
import { useNotificationContext } from '../hooks/useNotifiContext'


// ********************* Chat interface *******************  
const MyChats = ({ fetchAgain }) => {

    const [loggedUser, setLoggedUser] = useState('')
    const { user } = useAuthContext()
    // const { notification, dispatch: dispatchNotification } = useNotificationContext()
    // const { selectedChat ,dispatch: dispatchSelectedChat } = useSelectedChatContext()
    // const { chats, dispatch: dispatchChats } = useChatState()
    const { selectedChat, setSelectedChat } = useSelectChatContext()
    const { notification, setNotification } = useNotificationContext()
    const { chats, setChats, } = useChatState()
    // ****************************
    const { isOpen, onOpen, onClose } = useDisclosure()
    // ****************************** 

    const toast = useToast()

    const fetchChats = async () => {

        try {

            const data = await fetch('/api/chat/' + user._id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                }
            }
            )

            // const config = {
            //   headers: {
            //     Authorization: `Bearer ${user.token}`,
            //   },
            // }
            // const { data } = await axios.get('/api/chat', config)
            const json = await data.json()
            if (data.ok) {
                // console.log(json)
                setChats(json)
                // dispatchChats({ type: 'GET_DATA', payload: json })
            }
        } catch (error) {
            toast({
                title: 'Error Occurred!',
                description: 'Failed to load the Search Results',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('user')))
        fetchChats()
    }, [fetchAgain])

    return (
        <Box display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }} flexDirection='column' alignItems='center' p={2.5} bg='white' w={{ base: '100%', md: '35%' }} borderRadius='lg' borderWidth='1px' >
            <Box pb={3} px={3} display='flex' flexDirection='row' fontSize={{ base: '17px', md: '25px', lg: '28px' }} fontFamily='Work sans' w='100%' justifyContent='space-between' alignItems='center' >
                <Text>
                    My Chats
                </Text>

                <Menu display='flex' alignItems='center' justifyContent='center'  >
                <MenuButton display='flex' w={{ base: '10%', md: '10%', lg: '10%' }} fontSize={{ base: '13px', md: '13px', lg: '15px' }} px={{ base: '10px', md: '10px', lg: '10px' }}  >
                    <HiOutlineDotsVertical className='text-2xl font-semibold ' />
                </MenuButton> 
                <MenuList as={Button}onClick={onOpen}>
                    Create Group Chat
                </MenuList>
                
                </Menu>

                {/* ************************* */}
                <GroupChatsModel user={user} setChats={setChats} chats={chats} open={isOpen} close={onClose} />
                {/* *************************** */}
            </Box>

            <Box display='flex' flexDirection='column' p={3} bg='#f8f8f8' w='100%' h='100%' borderRadius='lg' overflowY='hidden' >
                {chats ? (
                    <Stack overflowY='hidden'>
                        {chats.map((chat) => (
                            <Box fontSize={{ base: '10.5px', md: '12px', lg: '16px' }}
                                onClick={() => setSelectedChat(chat)}
                                // onClick={() => dispatchSelectedChat({ type: 'GET_DATA', payload: chat}) } 
                                cursor='pointer' bg={selectedChat === chat ? '#38b2ac' : '#e8e8e8'} color={selectedChat === chat ? 'white' : 'black '} px={3} py={3} borderRadius='lg' key={chat._id} >

                                <Text>

                                    {/* If chat is not a group chat */}
                                    {!chat.isGroupChat ? (
                                        <div
                                        // onClick={
                                        //     dispatchNotification({ type: "PASS_DATA", payload: notification})
                                        //     // setNotification(notification.filter((n) => n !== notification._id))
                                        // }
                                        >
                                            {getSender(loggedUser, chat.users)}
                                            <Text fontSize='12px' color={selectedChat === chat ? 'teal.800' : 'blue.500'} fontWeight='semibold' >
                                            Private Chat
                                            </Text>
                                        </div>
                                    ) : (
                                        <div
                                        // onClick={
                                        //     dispatchNotification({ type: "PASS_DATA", payload: notification})
                                        //     // setNotification(notification.filter((n) => n !== notification._id))
                                        // }
                                        className=' flex flex-col p-0 '
                                        >
                                            {chat.chat_name}
                                            <Text fontSize='12px'  color={selectedChat === chat ? 'seagreen' : 'green.400'} fontWeight='semibold'>
                                            Group Chat
                                            </Text>
                                        </div>
                                    )
                                    }
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <Loading />
                )}
            </Box>
        </Box>

    )
}

export default MyChats
