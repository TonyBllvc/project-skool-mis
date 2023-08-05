import { Avatar, Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaAddressBook, FaBell, FaChevronDown, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { getSender } from '../config/chatLogic'
import ProfileModel from '../model/ProfileModel'
import SearchBar from './SearchBar'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNotificationContext } from '../hooks/useNotifiContext'
import { useSelectChatContext } from '../hooks/useSelectChatContext'
import UserModel from '../model/UserModel'

const ChatNav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    
    const [loadingChat, setLoadingChat] = useState('')
    const [toggle, setToggle] = useState(false)
    const toast = useToast()
    const { user, dispatch } = useAuthContext()
    // const { notification, dispatch: dispatchNotification } = useNotificationContext()
    // const { dispatch: dispatchSelectedChat } = useSelectedChatContext()
    const { setSelectedChat } = useSelectChatContext()
    const { notification, setNotification } = useNotificationContext()

    const logoutHandler = () => {
        localStorage.removeItem('user')
        navigate('/')
        toast({
            title: 'Logout Successful!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top",
        })
    }

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

            const data = await fetch(`/api/user/${user._id}/?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            )
            const json = await data.json()

            setLoading(false)
            setSearchResult(json)
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
        <div>
            <Box display='flex' justifyContent='space-between' alignItems='center' bg='white' w='100%' p='5px 10px 5px 10px' borderWidth='5px' >
                <Tooltip label="Search Users to chat" hasArrow placement='bottom-end'>
                    <Button variant='ghost' onClick={() => setToggle(!toggle)}  >
                        <FaAddressBook type='button' className=' text-red-600 text-xl base:text-xl font-thin' />
                        <Text display={{ base: "none", md: "flex" }} px='1.5' > Start Chats </Text>
                    </Button>
                </Tooltip>

                <Text fontSize={['md', 'lg', 'lg','2xl']} fontFamily='work sans'>
                    Chat
                </Text>

                <div className=' flex align-middle justify-center'>
                    <Menu>
                        <MenuButton p={1} display='flex' justifyContent='center'>
                            <div className='flex flex-row'>
                                {/* <BellIcon */}
                                {/* {notification.length >= 1 ? (

                                    <div className='flex flex-row justify-center items-center'>
                                        <FaBell type='button' className=' text-black text-lg font-thin -mr-2.5' />
                                        <div className='text-sm -mt-5 text-white rounded-xl px-1 bg-red-700 font-semibold'>
                                            {notification.length}
                                        </div>
                                    </div>

                                ) : (
                                    <div className='mr-4'>
                                        <FaBell type='button' className=' text-black text-lg m-1 font-thin -mr-3' />
                                    </div>
                                )
                                } */}
                            </div>
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && 'No new messages '}
                            {notification.map(notify => (
                                <MenuItem key={notify._id} onClick={() => {
                                    setSelectedChat(notify.chat_owner)
                                    // dispatchSelectedChat({ type: 'GET_DATA', payload: notify.chat_owner })
                                    // dispatchNotification({ type: ' PARSE_DATA', payload: notification })
                                    setNotification(notification.filter((n) => n !== notify))
                                }}>
                                    {notify.chat_owner.isGroupChat ?
                                        `New message in ${notify.chat_owner.chat_name}`
                                        :
                                        `New Message from ${getSender(user, notify.chat_owner.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<FaChevronDown className='text-sm ' />}>
                            <Avatar size={['xs', 'sm', 'sm']} cursor='pointer' name={user.surname} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={onOpen} > My Profile </MenuItem>
                            {/* A component that handles Profile section*/}
                            <ProfileModel user={user} open={isOpen} close={onClose} />

                            <MenuDivider />
                            {/* <MenuItem onClick={logoutHandler}> Logout </MenuItem> */}
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            {/* A component the handles the search bar side widgets */}
            {/* {toggle &&
                <SearchBar toggle={toggle} set={setToggle} setSearch={setSearch} search={search} handleSearch={handleSearch} loading={loading} searchResult={searchResult} setLoadingChat={setLoadingChat} loadingChat={loadingChat} setSelectedChat={setSelectedChat} />
            } */}
            {toggle &&
                <UserModel  toggle={toggle} set={setToggle} setLoadingChat={setLoadingChat} loadingChat={loadingChat} setSelectedChat={setSelectedChat}/>}
        </div>
    )
}

export default ChatNav
