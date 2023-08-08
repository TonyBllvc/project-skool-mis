import { Box, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MoreStudentResult } from './MoreStudentResult';

const StudentResults = ({ studentItem }) => {
    const [toggle, setToggle] = useState(false);

    return (
        <Tbody width='100%'>
            <Tr display='flex' width='100%' justifyContent='space-around' px={1} backgroundColor='whiteAlpha.900'>
                <Td width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} fontSize={['10', '11', '13', '16']} display='flex' alignItems='center' >
                        {studentItem.result_details.course_code}
                        {/* Name */}
                        {/* { studentDetails.first_name } */}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '25%']} display='flex' justifyContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} fontSize={['10', '11', '13', '16']} display='flex' alignItems='center' >
                        {studentItem.grade}
                        {/* Name */}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '25%']} display='flex' justifyContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} fontSize={['10', '11', '13', '16']} display='flex' alignItems='center'  >
                        {studentItem.remark}
                        {/* Name */}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '30%']} display='flex' justifyContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} fontSize={['10', '11', '13', '16']} display='flex' alignItems='center' >
                        {!toggle &&
                            <Button colorScheme='whatsapp' color='white' px={['11px', '15px', '19px']} h={['28px', '33px', '39px']} fontSize={['9', '12', '14']} onClick={() => setToggle(!toggle)}>
                                More
                            </Button>
                        }
                        {toggle &&
                            <Button colorScheme='red' color='white' px={['11px', '15px', '19px']} h={['28px', '33px', '39px']} fontSize={['9', '12', '14']}  onClick={() => setToggle(!toggle)}>
                                Close
                            </Button>
                        }
                    </Box>
                </Td>
            </Tr>
            {toggle &&
                <Box mt={-2} display='flex' flexDirection='row' w='100%' justifyContent='center' alignItems='center'>
                    <TableContainer width='100%' whiteSpace='break-spaces'>
                        <MoreStudentResult studentItem={studentItem} />
                    </TableContainer>
                </Box>
            }
        </Tbody>
    )
}

export default StudentResults