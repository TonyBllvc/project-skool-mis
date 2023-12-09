import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Spinner, useToast, useDisclosure } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import Loading from '../pages/assets/Loading'
import { useAuthContext } from '../hooks/useAuthContext'
import { useChatState } from '../hooks/useChatState'
import UserListWithDetails from '../assets/UserListWithDetails'
// import axios from 'axios'

// const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app';
const UserModel = ({  toggle, set, setLoadingChat, loadingChat, setSelectedChat }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user } = useAuthContext()
    const { chats, setChats } = useChatState()
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    // const [loadingChat, setLoadingChat] = useState('')

    const toast = useToast()

    useEffect(() => {
        const fetchUsers = async () => {

            try {
                const data = await fetch('https://project-skool-mis-api.vercel.app/user/' + user._id, {
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
                    setLoading(false)
                    setSearchResult(json)
                    // dispatchChats({ type: 'GET_DATA', payload: json })
                }
            } catch (error) {
                toast({
                    title: error.message,
                    description: 'Failed to load the Search Results',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })
            }
        }

        fetchUsers()
    }, [])

    const accessChat = async (userId) => {
        // preventDefault()
        // **************************
        try {
            setLoadingChat(true)


            const data = await fetch('https://project-skool-mis-api.vercel.app/chat/', {
                method: 'POST',
                body: JSON.stringify({ userId, userID: user._id }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`,
                },

            }
            )

            // const json = JSON.stringify(data)
            const json = await data.json()

            // check if chat exists
            const chatCheck = (!chats.find((c) => c._id === json._id))

            // if chat exists, pass the given chat
            if (chatCheck) {
                setChats([json, ...chats])
            }
            setSelectedChat(json)
            // dispatchSelectedChat({ type: '  CREATE_DATA', payload: json })
            setLoadingChat(false)
            set(!toggle)
        } catch (error) {
            toast({
                title: 'Error fetching the chat!',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })

        }
    }
    // ********************************

    return (
        <div >
            <Drawer placement='left' onClose={onClose} isOpen={onOpen} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader display='flex' flexDirection='row' justifyContent='space-between' fontSize='33px' borderBottomWidth='1px'>
                        List of users
                        <FaTimes size='24px' className='hover:text-red-600' onClick={() => set(!toggle)} />
                    </DrawerHeader>
                    <DrawerBody>
                        {/* The loading chats section */}
                        {loading ? (
                            <Loading />
                        ) : (
                            searchResult?.map(user => (
                                <UserListWithDetails
                                    key={user._id}
                                    users={user}
                                    handleFunction={() => accessChat(user._id)}
                                />
                            ))
                        )}

                        {loadingChat && <Spinner ml='auto' display='flex' />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </div>
    )
}

export default UserModel
