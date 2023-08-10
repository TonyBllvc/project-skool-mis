import React from 'react'
// import { ChatState } from '../../contexts/ChatProvider'
import { Avatar, Box, Text } from '@chakra-ui/react'
import { BsDot } from 'react-icons/bs'
import { useAuthContext } from '../hooks/useAuthContext'

const UserListWithDetails = ({ isActive, users, handleFunction }) => {
    const { user } = useAuthContext()

    return (
        <Box onClick={handleFunction} cursor='pointer' bg='#e8e8e8' _hover={{ background: 'green.500', color: 'white' }} w='100%' px={3} py={2} mb={2} borderRadius='lg' display='flex' flexDirection='row' justifyContent='flex-start' alignItems='start' color='black' >
            <Box width='92%' display='flex' flexDirection='column' justifyContent='flex-start' alignItems='start' color='black'>
                <Box display='flex' flexDirection='row' justifyContent='flex-start' alignItems='center'>
                    <Avatar mr={2} size='sm' cursor='pointer' name={users.surname} />
                    <Text fontSize='md'>
                        {users.surname} {users.first_name}
                    </Text>
                </Box>
                <Text fontSize='sm' ml='40px' color='blue.500'>
                    {users.role}
                </Text>
            </Box>
            {/* <Box width='3%'>
                <BsDot className={isActive === users._id ? 'text-green-700 font-bold text-2xl' : 'text-red-700 font-bold text-2xl'} />
            </Box> */}

        </Box>
    )
}

export default UserListWithDetails
