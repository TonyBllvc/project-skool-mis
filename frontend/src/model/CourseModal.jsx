import { Box, CardBody, Text } from '@chakra-ui/react'
import React from 'react'

const CourseModal = ({ name, handleId, handleName }) => {
    return (
        // <Box>
            <CardBody display='flex' direction='row' justifyContent='space-between'  onClick={(e) => handleId(name._id)} >
                <Text _hover={{ cursor:'pointer'}} onClick={(e) => handleName(name.course_code)} fontSize={['10.5', '12.5', '15.5', '19.5']}>
                    {name.course_name}
                </Text>
                <Text onClick={(e) => handleName(name.course_code)} fontSize={['10.5', '12.5', '15.5', '19.5']}>
                    {name.course_code}
                </Text>
            </CardBody>
        // </Box>
    )
}

export default CourseModal