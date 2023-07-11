import { Box, Button, Table, Tbody, Th, Tr, useDisclosure } from '@chakra-ui/react'
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
                <Th w='25%' display='flex' justifyContent='start' fontSize={[ '9','12', '14']}>
                    {course.course_code}
                </Th>
                <Th w='50%' display='flex' justifyContent='start' fontSize={[ '9','12', '14']} >
                    {course.course_name}
                    {/* <Link 
            // onClick={handleClick}
                // to='/view_timetable'
                className=" text-base text-slate-900 " > */}
                    {/* {school.time_details.course_code} */}
                    {/* </Link> */}
                </Th>
                <Th w='25%' display='flex' justifyContent='start'>
                    <Button backgroundColor='whatsapp.300' px={15} py={3} > Hello </Button>
                </Th>
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