import React from 'react'
// import { ChatState } from '../../contexts/ChatProvider'
import { Avatar, Box, Text } from '@chakra-ui/react'

const UserList = ({ user, handleFunction }) => {
    // const { user } = ChatState()

    return (
        <Box onClick={handleFunction} cursor='pointer' bg='#e8e8e8' _hover={{ background: 'green.500', color: 'white' }} w='100%' display='flex' alignItems='center' color='black' px={3} py={2} mb={2} borderRadius='lg' >
            <Avatar mr={2} size='sm' cursor='pointer' name={user.surname}/>
            <Text fontSize='xs'>
                {user.surname} {user.first_name}
            </Text>
        </Box>
    )
}

export default UserList
