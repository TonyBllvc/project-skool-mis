import { Avatar, Box, Card, Text } from '@chakra-ui/react'
import React from 'react'

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
                <Card direction='row' overflow='hidden' variant='outline' width='100%' backgroundColor='whiteAlpha.800' py='4' pl='4' >
                    <Avatar src='' width={{ base: '32px', sm: '34px' }} size='sm' mr='3' />
                    <Box width={{ sm: '100%', base: '75%' }} display={{ base: 'flex', sm: 'flex'}} flexDirection={{ sm:'row', base: 'column'}}>
                        <Box width={{ sm: '96%', base: '100%' }} >
                            <Text fontSize={['md', 'lg', '2xl']} color='blackAlpha.900' fontWeight='semibold'>
                                <b>Mr David John said that</b> , "Happy to meet you by this time dhbhbs wshbdiwb e2bf`ie2bfdw qdhsbfjbewi1 e2bfbhu2`e hedbhbfue2wb1ijb edbhfdsbquwe2"
                            </Text>
                        </Box>
                        <Box width={{ sm: '13%', base: '100%' }} ml={{sm: '5'}} display='flex' justifyContent={{ base: 'start', sm: 'space-around'}} pt={{ base: '1', sm: '2'}}>
                            <Text fontSize={['md', 'lg', '2xl']} color='gray.500'>
                                2hr ago
                            </Text>
                        </Box>
                    </Box>
                </Card>
            </Box>
            
        </Box>
    )
}

export default Notice