import { Box, Button, Tbody, Td, Tr, } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { BiPencil } from 'react-icons/bi'

const CourseListDetails = ({ course }) => {
    const [toggle, setToggle] = useState(false);
    const handleDelete = async () => {

        const response = await fetch('/api/time/', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            }
        })
        // const json = await response.json();

        if (response.ok) {
            // dispatch({ type: 'DELETE_DATA', payload: json })
        }

    }



    return (
        <Tbody backgroundColor='blue.400' onClick={() => setToggle(!toggle)}>
            <Tr display='flex' w='100%' justifyContent='space-around' backgroundColor='whiteAlpha.900'>
                <Td width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']}  overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width={['100%', '100%', '100%']} whiteSpace='break-spaces' >
                        {course.course_code}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all' >
                    <Box width={['100%', '100%', '100%']}  whiteSpace='break-spaces' >
                        {course.course_name}
                    </Box>
                </Td>
                <Td width={['120px', '100%', '20%']} display='flex' justifyContent='start'>
                    <Box width={['100%', '100%', '100%']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all' >
                        <Button colorScheme='whatsapp' color='white'  py={['1px', '2px', '3px']} fontSize={['12px', '12px', '14px']}> Hello </Button>
                    </Box>
                </Td>
            </Tr>
            {toggle &&
                <Box mt={-2} display='flex' flexDirection='row' w='100%' justifyContent='center' alignItems='center' >
                    <Box mr={20}  >
                        <Button colorScheme='blue' py={1} px={3} color='white'
                        // onClick={handleUpdate} 
                        >
                            <BiPencil className='text-white mr-2 font-medium text-base' />
                            Update
                        </Button>
                    </Box>
                    <Box ml={20} >
                        <Button colorScheme='red' py={1} px={3} color='white' onClick={handleDelete} >
                            <FaTrashAlt className='text-white mr-2 font-medium text-base' />
                            Delete
                        </Button>
                    </Box>
                    {/* <TimeUpdateModal documentData={documentData} open={isOpen} close={onClose} /> */}
                </Box>
            }
        </Tbody>

    )
}

export default CourseListDetails