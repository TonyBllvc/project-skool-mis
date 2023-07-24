import { Box, Button, Tbody, Td, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
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

    useEffect(() => {
        const handleUpdate = async () => {
            // onOpen()
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
            }

        }

        handleUpdate()
    },[school])
    return (
        <Tbody  >
            <Tr display='flex' w='100%' px={-3} justifyContent='space-around' onClick={() => setToggle(!toggle)} backgroundColor='whiteAlpha.900'>
                <Td width={['150px', '100%', '24%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>

                    <Box width='100%'  >
                        {school.day}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>

                    <Box width='100%'  >
                        {school.time_details.course_code}
                    </Box>
                    {/* </Link> */}
                </Td>
                <Td width={['150px', '100%', '21%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                    <Box width='100%'  >
                        {school.start} {school.am_one}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '20%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']}>
                    <Box width='100%'  >
                        {school.end} {school.am_two}
                    </Box>
                </Td>
            </Tr>
            {toggle &&
                <Box mt={-2} display='flex' flexDirection='row' w='100%' justifyContent='center' alignItems='center' >
                    <Box mr={20} onClick={onOpen} >
                        <Box>
                            <Button colorScheme='blue' py={1} px={3} color='white'>
                                <BiPencil className='text-white mr-2 font-medium text-base' />
                                Update
                            </Button>
                        </Box>
                    </Box>
                    <Box ml={20} >
                        <Box onClick={handleDelete}>
                            <Button colorScheme='red' py={1} px={3} color='white' onClick={() => setToggle(!toggle)} >
                                <FaTrashAlt className='text-white mr-2 font-medium text-base' />
                                Delete
                            </Button>
                        </Box>
                    </Box>
                    <TimeUpdateModal documentData={documentData} setToggle={setToggle} toggle={toggle} open={isOpen} close={onClose} />
                </Box>
            }
        </Tbody>
    )
}

export default TimeTableDetails
