import { Box } from '@chakra-ui/react'
import React from 'react'
import { FaTimes } from 'react-icons/fa'

// ************************** Create GroupChat UI: Group Chat*********
const Selected = ({ user, handleFunction, selectedChat }) => {
    return (
        <Box px={2} py={1} borderRadius='lg' display='flex' alignItems='center' m={2} mb={2} variant='solid' fontSize={14} color='white' backgroundColor='red.700' cursor='pointer'  >
            {user.surname} {user.first_name}
            { (selectedChat.groupAdmin._id === user._id) ? (
                <FaTimes className='ml-2' onClick={handleFunction} />
            ) : (
                <>
                </>
            )}
        </Box>
    )
}

export default Selected
