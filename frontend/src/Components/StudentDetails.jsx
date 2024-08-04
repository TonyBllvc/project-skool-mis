import { Box, Tbody, Td, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const StudentDetails = ({ studentInfo }) => {

  return (
    <Tbody width={['65%', '75%', '75%' ]}>
        <Tr display='flex' width='100%' flexDirection='column' backgroundColor='whiteAlpha.900'   >
          <Td width='100%' py={2.5} display='flex' justifyContent='start' fontSize={['8', '12', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
            <Box width={['100%', '100%', '100%']} fontSize={['10', '11', '15', '17']} >
              { studentInfo.surname} {studentInfo.first_name}
            </Box>
          </Td>
          <Td width='100%' py={2.5} justifyContent='start' fontSize={['8', '12', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
            <Box width={['100%', '100%', '100%']} fontSize={['10', '11', '15', '17']} >
            {/* { studentInfo.student_id.faculty} */}
            { studentInfo.department}
            </Box>
          </Td>
          <Td width='100%' py={2.5} justifyContent='start' fontSize={['8', '12', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
            <Box width={['100%', '100%', '100%']} fontSize={['10', '11', '15', '17']} >
              {/* { studentInfo.student_id.department} */}
              { studentInfo.faculty}              
            </Box>
          </Td>
          <Td width='100%' py={2.5} justifyContent='start' fontSize={['8', '12', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
            <Box width={['100%', '100%', '100%']} fontSize={['10', '11', '15', '17']} >
              {/* { studentInfo.student_id.reg_no} */}
              { studentInfo.reg_no}
            </Box>
          </Td>
        </Tr>
    </Tbody>
  )
}

export default StudentDetails