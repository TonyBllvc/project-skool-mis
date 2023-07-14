import { Box, Button, Table, Tbody, Td, Tr, } from '@chakra-ui/react'
import React, { } from 'react'
import { Link } from 'react-router-dom'


const LecturersListDetails = ({ lecturer, index }) => {
    return (
        <Tbody backgroundColor='blue.400'>
            <Tr display='flex' width='100%' px={3} justifyContent='space-around' backgroundColor='whiteAlpha.900'>
                <Td width={['120px', '100%', '15%']} display='flex' justifyContent='center' alignItems='center'  overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all' >
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces' >
                        {index + 1}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '83%']} display='flex' justifyContent='start' fontSize={['10px', '12px', '14px']} alignItems='center' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} display='flex' justifyContent='start' whiteSpace='break-spaces'  >
                    {/* <p style={{ wordWrap: 'break-word'}}>  */}
                    
                    {lecturer.title} {lecturer.surname} {lecturer.first_name}
                    {/* </p> */}
                    </Box>
                </Td>
            </Tr>
        </Tbody>
    )
}

export default LecturersListDetails