import { Box, Button, Tbody, Td, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { BiPencil } from 'react-icons/bi'
import { useSchoolContext } from '../hooks/useSchoolContext'
import TimeUpdateModal from '../model/TimeUpdateModal'

const TimeTableDetails = ({ school }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { dispatch } = useSchoolContext()
    const [toggle, setToggle] = useState(false);

    const [documentData, setDocumentData] = useState('')

    const handleDelete = async () => {

        const response = await fetch('/api/time/' + school._id, {
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

    const handleUpdate = async () => {
        // incomplete  ( updating document possessing errors)
        const response = await fetch("api/time/" + school._id, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        const json = await response.json()


        if (!response.ok) {
            return console.log(json.error)
        }

        if (response.ok) {
            setDocumentData(json)
            onOpen()
        }

    }

    return (
        <Tbody backgroundColor='blue.400' onClick={() => setToggle(!toggle)}>
            <Tr display='flex' w='100%' justifyContent='space-around' backgroundColor='whiteAlpha.900'>
                <Td  width={['150px', '100%', '20%']}  display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>

                    <Box width='100%' whiteSpace='break-spaces' >
                        {school.day}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '20%']}  display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>

                    <Box width='100%' whiteSpace='break-spaces' >
                        {school.time_details.course_code}
                    </Box>
                    {/* </Link> */}
                </Td>
                <Td  width={['150px', '100%', '20%']}  display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width='100%' whiteSpace='break-spaces' >
                        {school.start} {school.am_one}
                    </Box>
                </Td>
                <Td  width={['150px', '100%', '20%']}  display='flex' justifyContent='start' fontSize={['9', '12', '14']}>
                    <Box width='100%' whiteSpace='break-spaces' >
                        {school.end} {school.am_two}
                    </Box>
                </Td>
            </Tr>
            {toggle &&
                <Box mt={-2} display='flex' flexDirection='row' w='100%' justifyContent='center' alignItems='center' >
                    <Box mr={20} >
                        <Button colorScheme='blue' py={1} px={3} color='white' onClick={handleUpdate} >
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
                    <TimeUpdateModal documentData={documentData} open={isOpen} close={onClose} />
                </Box>
            }
        </Tbody>
    )
}

export default TimeTableDetails
