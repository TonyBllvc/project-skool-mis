import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useStudentDetailsContext } from '../hooks/useStudentDetailsContext'

export const MoreStudentResult = ({ studentItem }) => {

    const { dispatch } = useStudentDetailsContext()

    const handleDelete = async () => {

        const response = await fetch('/api/result/' + studentItem._id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_DATA', payload: json })
        }

    }

    return (
        <Table width='100%' backgroundColor='blackAlpha.900'>
            <Thead width='100%'>
                <Tr display='flex' width='100%' justifyContent='space-around' px={1} backgroundColor='blue.100'>
                    <Th py={1} px={4} width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width='100%'>
                            Test
                        </Box>
                    </Th>
                    <Th py={1} px={4} width={['160px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width='100%'>
                            Exams
                        </Box>
                    </Th>
                    <Th py={1} px={4} width={['170px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width='100%'>
                            Practical
                        </Box>
                    </Th>
                    <Th py={1} px={4} width={['180px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width='100%'>
                            Score
                        </Box>
                    </Th>
                    <Th>
                        <Box>

                        </Box>
                    </Th>

                </Tr>
            </Thead>
            <Tbody width='100%' >
                <Tr display='flex' width='100%' justifyContent='space-around' px={1} backgroundColor='whiteAlpha.900'>
                    <Td py={2} width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width={['100%', '100%', '100%']} display='flex' alignItems='center' >
                            {studentItem.test}
                            {/* Name */}
                            {/* { studentDetails.first_name } */}
                        </Box>
                    </Td>
                    <Td py={2} px={9} width={['160px', '100%', '30%']} display='flex' justifyContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width={['100%', '100%', '100%']} display='flex' alignItems='center' >
                            {studentItem.exam}
                            {/* Name */}
                        </Box>
                    </Td>
                    <Td py={2} width={['150px', '100%', '24%']} display='flex' justifyContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width={['100%', '100%', '100%']} display='flex' alignItems='center'  >
                            {studentItem.practical}
                            {/* Name */}
                        </Box>
                    </Td>
                    <Td py={2} width={['120px', '100%', '18%']} display='flex' justifyContent='center' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width={['100%', '100%', '100%']} display='flex' alignItems='center' >
                            {studentItem.score}
                        </Box>
                    </Td>
                    <Td py={-2}>
                        <Box>
                            <Button px={-0.5} color='red' width='1px' onClick={handleDelete}>
                                <FaTrashAlt className='text-red-700 font-medium text-base' />
                            </Button>
                        </Box>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    )
}
