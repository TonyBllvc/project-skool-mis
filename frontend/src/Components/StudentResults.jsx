import { Box, Tbody, Td, Tr } from '@chakra-ui/react'
import React from 'react'

const StudentResults = ({ studentItem }) => {
    return (
        <Tbody width='100%' backgroundColor='blue.400' >
            <Tr display='flex' width='100%' justifyContent='space-around' px={1} backgroundColor='whiteAlpha.900'>
                <Td width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                    { studentItem.result_details.course_code} 
                    {/* Name */}
                        {/* { studentDetails.first_name } */}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                    { studentItem.grade}
                    {/* Name */}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                    { studentItem.remark}
                    {/* Name */}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                    {/* { studentItem.remark} */}
                    {/* View Scores */}
                    </Box>
                </Td>
            </Tr>
        </Tbody>
    )
}

export default StudentResults