import { Box, Button, Tbody, Td, Tr, } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Student from '../pages/component/Student'


const StudentListDetails = ({ student }) => {
    const [ toggle, setToggle ] = useState(false)
    const navigate = useNavigate()



    return (
        <Tbody backgroundColor='blue.400'>
            <Tr display='flex' width='100%' px={3} justifyContent='space-around' backgroundColor='whiteAlpha.900'>
                <Td  width={['150px', '100%', '26%']} display='flex' justifyContent='start' fontSize={['10px', '12px', '14px']} alignItems='center' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces' >
                        {student.surname} {student.first_name}
                    </Box>
                </Td>
                <Td  width={['150px', '100%', '27%']} display='flex' justifyContent='start' fontSize={['10px', '12px', '14px']} alignItems='center' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all' >
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'  >
                        {student.reg_no}
                    </Box>
                </Td>
                <Td  width={['150px', '100%', '25%']} display='flex' justifyContent='start' fontSize={['10px', '12px', '14px']} alignItems='center' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all' >
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'  >
                        {student.session}
                    </Box>
                </Td>
                <Td  width={['120px', '100%', '20%']} display='flex' justifyContent='start' alignItems='center' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces' >
                        <Link to={`/student/${student._id}/results`}>
                            <Button colorScheme='whatsapp'  py={['1px', '2px', '3px']} fontSize={['12px', '12px', '14px']} >
                                View
                            </Button>
                                {/* { toggle && 
                                <Student student_id={student._id} />
                                } */}
                        </Link>
                    </Box>

                </Td>
            </Tr>
        </Tbody>
    )
}

export default StudentListDetails