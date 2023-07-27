import { Box, CardBody, Text } from '@chakra-ui/react'
import React from 'react'

const LecturerModal = ({ name,handleId, handleName }) => {
    return (
        // <Box>
            <CardBody display='flex' direction='row' justifyContent='center' onClick={(e) => handleId(name._id)} >
                <Text fontSize='md' _hover={{ cursor:'pointer'}} onClick={(e) => handleName(name.surname)}>
                    {name.surname} {name.first_name} {name.middle_name}
                </Text>
            </CardBody>
        // </Box>
    )
}

export default LecturerModal