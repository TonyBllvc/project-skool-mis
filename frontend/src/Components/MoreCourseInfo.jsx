import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useCourseContext } from '../hooks/useCourseContext'

const MoreCourseInfo = ({ course }) => {
    const { dispatch } = useCourseContext()

    const handleDelete = async () => {

        const response = await fetch('/api/course/' + course._id, {
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
                <Tr display='flex' width='100%' justifyContent='center' px={1} backgroundColor='blue.100'>
                    <Th py={1} px={4} width='100%' display='flex' justifyContent='center' overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width='100%' display='flex' justifyContent='center' fontSize={['10', '11', '13', '16']}>
                            Semester
                        </Box>
                    </Th>

                </Tr>
            </Thead>
            <Tbody width='100%' >
                <Tr display='flex' width='100%' justifyContent='center' px={1} backgroundColor='whiteAlpha.900'>
                    <Td py={2} width='100%' display='flex' justifyContent='center'  overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width='100%' display='flex' justifyContent='center' alignItems='center' fontSize={['10', '11', '13', '16']}  >
                            {course.course_details.semester}
                            {/* Name */}
                            {/* { course.first_name } */}
                        </Box>
                    </Td>
                </Tr>
            </Tbody>

            <Thead width='100%'>
                <Tr display='flex' width='100%' justifyContent='center' px={1} backgroundColor='blue.100'>
                    <Th py={1} px={4} width='100%' display='flex' justifyContent='center' overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width='100%' display='flex' justifyContent='center' fontSize={['10', '11', '13', '16']}>
                            Course Coordinator
                        </Box>
                    </Th>

                </Tr>
            </Thead>
            <Tbody width='100%' >
                <Tr display='flex' width='100%' justifyContent='center' px={1} backgroundColor='whiteAlpha.900'>
                    <Td py={2} width='100%' display='flex' justifyContent='center' overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width='100%' display='flex' justifyContent='center' alignItems='center' fontSize={['10', '11', '13', '16']} >
                            {course.course_coordinator.title} {course.course_coordinator.surname} {course.course_coordinator.first_name}
                            {/* Name */}
                            {/* { course.first_name } */}
                        </Box>
                    </Td>
                </Tr>
            </Tbody>


            <Thead width='100%'>
                <Tr display='flex' width='100%' justifyContent='center' px={1} backgroundColor='blue.100'>
                    <Th py={1} px={4} width='100%' display='flex' justifyContent='center' overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width='100%' display='flex' justifyContent='center' fontSize={['10', '11', '13', '16']}>
                            Course Lecturers
                        </Box>
                    </Th>

                </Tr>
            </Thead>
            <Tbody width='100%' >
                <Tr display='flex' width='100%' justifyContent='center' px={1} backgroundColor='whiteAlpha.900'>
                    <Td py={2} width='100%' display='flex' justifyContent='center' overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                        <Box width='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center' fontSize={['10', '11', '13', '16']} >
                        <ul>
                            {course.course_lecturers.map((lecturers, index) => (
                                <li key={index}>
                                {index + 1}. {lecturers.title}{ lecturers.surname } { lecturers.first_name }
                                </li>
                            ))}
                        </ul>
                        
                        <Button onClick={handleDelete} colorScheme='red' mt={5} py={1} px={3} size={19} color='white'  >
                            <FaTrashAlt  className='text-white mr-2 font-medium text-xs' />
                            Delete
                        </Button>
                        </Box>
                    </Td>
                </Tr>
            </Tbody>
        </Table>
    )
}

export default MoreCourseInfo