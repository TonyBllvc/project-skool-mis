import { Avatar, Box, Card, Text } from '@chakra-ui/react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import React from 'react'

const NoticeDetails = ({ notice }) => {
    return (

        <Card direction='row' overflow='hidden' variant='outline' width='100%' backgroundColor='whiteAlpha.800' py='4' mt='10px' pl='4' >
            <Avatar src={notice.surname} name={notice.surname} width={{ base: '32px', sm: '34px' }} size='sm' mr='3' cursor='pointer' />
            <Box width={{ sm: '100%', base: '75%' }} display={{ base: 'flex', sm: 'flex' }} flexDirection={{ sm: 'row', base: 'column' }}>
                <Box width={{ sm: '90%', base: '100%' }} mr={{ sm: '2'}} >
                    <Text fontSize={['md', 'lg', '2xl']} color='blackAlpha.900' fontWeight='semibold'>
                        <b> { notice.from.surname } { notice.from.first_name } said,</b> "{ notice.message }"
                    </Text>
                </Box>
                <Box width={{ sm: '20%', base: '100%' }} display='flex' justifyContent={{ base: 'start', sm: 'space-around' }} pt={{ base: '1', sm: '2' }}>
                    <Text fontSize={['md', 'lg', 'lg']} color='gray.500'>
                    { formatDistanceToNow(new Date(notice.createdAt), {addSuffix: true }) }
                    </Text>
                </Box>
            </Box>
        </Card>
    )
}

export default NoticeDetails