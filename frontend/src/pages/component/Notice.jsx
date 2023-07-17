import { Avatar, Box, Card, Text } from '@chakra-ui/react'
import React from 'react'
import NoticeDetails from '../../Components/NoticeDetails'

const Notice = () => {
    return (
        <Box width='100%' display='flex' flexDirection='column' >
            <Box mb='10px' ml='10px'>
                <Text fontFamily='heading' fontSize='30px' fontWeight='bold'>
                    Notice
                </Text>
            </Box>
            <hr />
            <Box mt='10px'>
                <NoticeDetails />
            </Box>

        </Box>
    )
}

export default Notice