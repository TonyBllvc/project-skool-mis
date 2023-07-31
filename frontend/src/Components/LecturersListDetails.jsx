import { Box, Button, Table, Tbody, Td, Tr, } from '@chakra-ui/react'
import React, { } from 'react'
import { Link } from 'react-router-dom'


const LecturersListDetails = ({ lecturer, index }) => {
    return (
        <Tbody backgroundColor='blue.400'>
            <Tr display='flex' width='100%' px={3} justifyContent='space-around' backgroundColor='whiteAlpha.900'>
                <Td width={['120px', '100%', '20%']} display='flex' justifyContent='center' alignItems='center'  overflow='hidden' textOverflow='ellipsis'  wordBreak='break-all' >
                    <Box  width='100%' fontSize={['10', '11', '13', '16']}  >
                        {index + 1}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '80%']} display='flex' justifyContent='start' fontSize={['10px', '12px', '14px']} alignItems='center' overflow='hidden' textOverflow='ellipsis'  wordBreak='break-word'>
                    <Box  width='100%' fontSize={['10', '11', '13', '16']}   >
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