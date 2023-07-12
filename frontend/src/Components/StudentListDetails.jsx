import { Box, Button, Table, Tbody, Td, Text, Th, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { BiPencil } from 'react-icons/bi'
import { Link } from 'react-router-dom'


const StudentListDetails = ({ student }) => {
    return (
        <Tbody backgroundColor='blue.400'>
            <Tr display='flex' width='100%' px={3} justifyContent='space-around' backgroundColor='whiteAlpha.900'>
                <Td  width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['10px', '12px', '14px']} alignItems='center'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces' >
                        {student.surname} {student.first_name}
                    </Box>
                </Td>
                <Td  width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['10px', '12px', '14px']} alignItems='center' >
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'  >
                        {student.reg_no}
                    </Box>
                </Td>
                <Td  width={['120px', '100%', '20%']} display='flex' justifyContent='start' alignItems='center'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces' >
                        <Link to={`/student/${student._id}`}>
                            <Button colorScheme='whatsapp' py={['1px', '2px', '3px']} fontSize={['12px', '12px', '14px']} >
                                View
                            </Button>
                        </Link>
                    </Box>

                </Td>
            </Tr>
        </Tbody>
    )
}

export default StudentListDetails