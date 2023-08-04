import React from 'react'
// import { ChatState } from '../../contexts/ChatProvider'
import { Avatar, Box, Text } from '@chakra-ui/react'

const UserListWithDetails = ({ user, handleFunction }) => {
    // const { user } = ChatState()

    return (
        <Box onClick={handleFunction} cursor='pointer' bg='#e8e8e8' _hover={{ background: 'green.500', color: 'white' }} w='100%' display='flex' flexDirection='column' justifyContent='flex-start' alignItems='start' color='black' px={3} py={2} mb={2} borderRadius='lg' >
            <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center'>
                <Avatar mr={2} size='sm' cursor='pointer' name={user.surname} />
                <Text fontSize='md'>
                    {user.surname} {user.first_name}
                </Text>
            </Box>
            <Text fontSize='sm' ml='40px' color='blue.500'>
                {user.role}
            </Text>
        </Box>
    )
}

export default UserListWithDetails
