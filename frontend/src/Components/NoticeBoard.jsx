import { Avatar, Box, Card, Text } from '@chakra-ui/react'
import { FaTrashAlt } from 'react-icons/fa'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import React from 'react'

const NoticeBoard = ({notice}) => {
    return (
        <Card direction='row' overflow='hidden' zIndex={1} variant='outline' width='100%' backgroundColor='whiteAlpha.800' py='4'  pl='4' >
            <Avatar src={notice.from.picture} name={notice.from.surname} width={{ base: '32px', sm: '34px' }} size='sm' mr='3' cursor='pointer' />
            <Box width={{ sm: '90%', base: '75%' }} display={{ base: 'flex', sm: 'flex' }} flexDirection={{ sm: 'column', base: 'column' }}>
                <Box width={{ sm: '97%', base: '97%' }} mr={{ sm: '2' }}  pr={['1.5', '2', '3.5', '4']} display='flex' flexDirection='row'>
                    <Text fontSize={[ 'sm', 'md', 'lg', 'xl']} color='blackAlpha.800' fontWeight={['normal', 'normal', 'normal','normal']}>
                        <b> {notice.from.surname } { notice.from.first_name } said, </b> "{notice.message}"
                    </Text>
                </Box>
                <Box width={{ sm: '100%', base: '100%' }} display='flex' flexDirection={{ sm: 'row', base: 'column' }} justifyContent={{ base: 'space-between', sm: 'space-between' }} pt={{ base: '1', sm: '2' }} pr={['1', '2', '2', '2']} mt={1.5} >
                    <Text  fontSize={[ 'sm', 'md', 'lg', 'xl']} fontWeight='normal' >
                        <Text>
                            { 
                                notice.form && 
                            <Text>
                             <b> Type: </b> 
                             <span> {notice.form} </span>
                            </Text> }
                        </Text>
                    </Text>
                    <Text fontSize={[ 'sm', 'md', 'lg', 'xl']} color='gray.500'>
                        {formatDistanceToNow(new Date(notice.createdAt), { addSuffix: true })}
                    </Text>
                </Box>
            </Box>
            <FaTrashAlt  className='text-red-600 mr-2 font-medium text-base' />
        </Card>
    )
}

export default NoticeBoard