import { Box, Tbody, Td, Tr } from '@chakra-ui/react'
import React from 'react'

const StudentDetails = ({ StudentDetails }) => {
    return (
        <Tbody width='75%' backgroundColor='blue.400' >
            <Tr display='flex' width='100%' flexDirection='column' backgroundColor='whiteAlpha.900'>
                <Td width='100%' py={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                        Name
                    </Box>
                </Td>
                <Td width='100%' py={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                        Name
                    </Box>
                </Td>
                <Td width='100%' py={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                        Name
                    </Box>
                </Td>
                <Td width='100%' py={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces'>
                        Name
                    </Box>
                </Td>
            </Tr>
        </Tbody>
    )
}

export default StudentDetails