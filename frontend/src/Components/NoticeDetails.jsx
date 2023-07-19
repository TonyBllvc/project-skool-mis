import { Avatar, Box, Card, Text } from '@chakra-ui/react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import React from 'react'

const NoticeDetails = ({ notice }) => {
    return (

        <Card direction='row' overflow='hidden' variant='outline' width='100%' backgroundColor='whiteAlpha.800' py='4' mt='10px' pl='4' >
            <Avatar src={notice.picture} name={notice.surname} width={{ base: '32px', sm: '34px' }} size='sm' mr='3' cursor='pointer' />
            <Box width={{ sm: '100%', base: '75%' }} display={{ base: 'flex', sm: 'flex' }} flexDirection={{ sm: 'column', base: 'column' }}>
                <Box width={{ sm: '100%', base: '100%' }} mr={{ sm: '2' }}  pr={['2', '5', '7']} >
                    <Text fontSize={['md', 'lg', 'xl']} color='blackAlpha.800' fontWeight='semibold'>
                        <b> {notice.from.surname} {notice.from.first_name} said,</b> "{notice.message}"
                    </Text>
                </Box>
                <Box width={{ sm: '100%', base: '100%' }} display='flex' justifyContent={{ base: 'space-between', sm: 'space-between' }} pt={{ base: '1', sm: '2' }} pr={['2', '5', '7']} mt={1.5} >
                    <Text fontSize={['sm', 'md', 'md']} color='gray.500'>
                        {formatDistanceToNow(new Date(notice.createdAt), { addSuffix: true })}
                    </Text>
                    <Text fontSize={['md', 'lg', 'lg']} fontWeight='semibold' >
                        <Text>
                            { 
                                notice.form && 
                            <Text>
                             <b> Type: </b> 
                             <span> {notice.form} </span>
                            </Text> }
                        </Text>
                    </Text>
                </Box>
            </Box>
        </Card>
    )
}

export default NoticeDetails