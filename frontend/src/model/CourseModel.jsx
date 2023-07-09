import { Box, CardBody, Text } from '@chakra-ui/react'
import React from 'react'

const CourseModel = ({ name, handleId, handleName }) => {
    return (
        // <Box>
            <CardBody display='flex' direction='row' justifyContent='space-between'  onClick={(e) => handleId(name._id)} >
                <Text onClick={(e) => handleName(name.course_code)}>
                    {name.course_name}
                </Text>
                <Text onClick={(e) => handleName(name.course_code)}>
                    {name.course_code}
                </Text>
            </CardBody>
        // </Box>
    )
}

export default CourseModel