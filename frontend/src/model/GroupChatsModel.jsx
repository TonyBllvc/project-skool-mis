import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Toast, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import UserList from '../assets/UserList'
import Selected from '../assets/Selected'

const GroupChatsModel = ({ user, setChats, chats, open, close }) => {
  const [groupChatName, setGroupChatName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)


  const toast = useToast()

  const handleSearch = async (query) => {

    if (!query) {
      return
    }
    // if(query.length == null ){
    //   setGroupChatName('')
    //   setSearch('')
    //   setSearchResult([])

    // }


    if (query.length >= 1) {
      setSearch(query)

      try {
        setLoading(true)

        const data = await fetch(`/api/user/${user._id}/?search=${search}`, {
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

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers || !user._id || !user) {
      Toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      return
    }

    try {
      // const selected = selectedUsers.map((u) => u._id )

      // const details = { name: groupChatName, users: selected }

      // const data = await fetch('/api/chat/group', {
      //     method: 'POST',
      //     body: JSON.stringify(details),
      //     headers: {
      //         "Content-Type": "application/json",
      //         "Authorization": `Bearer ${user.token}`,
      //     },

      // })

      // const json = await data.json()

      // setChats([json, ...chats])

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      }

      const { data } = await axios.post('/api/chat/group', {
        name: groupChatName,
        users: selectedUsers,
        //  users: JSON.stringify(selectedUsers.map((u) => u._id)),
         admin: user._id,
         adminId: user
      }, config
      )

      setChats([data, ...chats])
      // dispatchChats({ type: 'CREATE_DATA', payload: data })
      close()
      toast({
        title: 'Group Chat created successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: "top",
      })
    } catch (error) {
      toast({
        title: 'Failed to create group chat',
        description: error.response.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top",
      })

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

  const clearValue = (delUser) => {
    setGroupChatName('')
    setSearch('')
    setSearchResult([])
  }

  return (
    <>
      <Modal size={['xs', 'sm', 'md', 'lg']} isCentered isOpen={open} onClose={close}  >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={['23', '28', '30', '34']} fontFamily='Work sans' display='flex' justifyContent='center'>
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton onClick={clearValue} />
          <ModalBody fontSize='40px' fontFamily='work sans' display='flex' justifyContent='space-between' flexDirection='column' alignItems='center'>

            <FormControl>
              <Input placeholder='Chat Name' mb={3} onChange={(e) => setGroupChatName(e.target.value)} />
            </FormControl>

            <FormControl>
              <Input placeholder='Add Users eg: John, Mag' mb={1} onChange={(e) => handleSearch(e.target.value)} />
            </FormControl>

            {loading ? (
              <Spinner ml='auto' display='flex' />
            ) : (
              searchResult?.slice(0, 4).map(user => (
                <UserList key={user._id} user={user} handleFunction={() => handleGroup(user)} />
              ))
            )
            }

            <Box overflow='scroll' height='100px' px={4} position='relative' >
              <Box w='100%' display='flex' flexWrap='wrap' >
                {selectedUsers.map((u) => (
                  <Selected key={u._id} user={u} handleFunction={() => handleDelete(u)} />
                ))}
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button fontSize={['12.5', '13', '16', '17']} h={8} px={3} colorScheme='blue' onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatsModel
