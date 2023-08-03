import { Box } from '@chakra-ui/react'
import React from 'react'
import { FaTimes } from 'react-icons/fa'

// ************************** Create GroupChat UI: Group Chat*********
const Selected = ({ user, handleFunction }) => {
    return (
        <Box px={2} py={1} borderRadius='lg' display='flex' alignItems='center'  m={2} mb={2} variant='solid' fontSize={14} color='white' backgroundColor='red.700'   cursor='pointer' onClick={handleFunction} >
            {user.surname}
            <FaTimes className='ml-2' />
        </Box>
    )
}

export default Selected
