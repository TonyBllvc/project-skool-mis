import { Box, Tbody, Td, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StudentDetails = () => {
    const { id } = useParams()
      
  const [ studentInfo, setStudentInfo ] = useState('')
  useEffect(() => {
    const fetchStudents = async () => {
      // const id = student[0]._id
      // const id = parseInt(studentsId)
      // console.log(id)
      const res = await fetch('/api/student/' + id)
      const json = await res.json()

      if (!res.ok) {
        return console.log(json.error)
      }

      if (res.ok) {
        console.log(json)
        setStudentInfo(json)
        
      }
    }
    fetchStudents()

  }, [])


    return (
        <Tbody width='75%' backgroundColor='blue.400' >
            <Tr display='flex' width='100%' flexDirection='column' backgroundColor='whiteAlpha.900'>
                <Td width='100%' py={2.5} display='flex' justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                    {/* { studentInfo.student_id.surname} { studentInfo.student_id.first_name} */}
                    Name
                        {/* { studentDetails.first_name } */}
                    </Box>
                </Td>
                <Td width='100%' py={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                    {/* { studentInfo.student_id.faculty} */}
                    Name
                    </Box>
                </Td>
                <Td width='100%' py={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                    {/* { studentInfo.student_id.department} */}
                    Name
                    </Box>
                </Td>
                <Td width='100%' py={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                    {/* { studentInfo.student_id.reg_no} */}
                    Name
                    </Box>
                </Td>
            </Tr>
        </Tbody>
    )
}

export default StudentDetails