import { Box, CardBody, Text } from '@chakra-ui/react'
import React from 'react'

const SchoolModal = ({ name, handleId, handleName }) => {
    return (
        // <Box>
            <CardBody display='flex' direction='row' justifyContent='space-between'  onClick={(e) => handleId(name._id)} >
                <Text fontSize='md' _hover={{ cursor:'pointer'}} onClick={(e) => handleName(name.level)}>
                    {name.department} {name.level} 
                </Text>
                <Text fontSize='md' _hover={{ cursor:'pointer'}} onClick={(e) => handleName(name.level)}>
                {name.semester}
                </Text>
            </CardBody>
        // </Box>
    )
}

export default SchoolModal