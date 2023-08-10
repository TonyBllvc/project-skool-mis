import { Box, Button, Tbody, Td, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { BiPencil } from 'react-icons/bi'
import { useTimetableContext } from '../hooks/useTimetableContext'
import TimeUpdateModal from '../model/TimeUpdateModal'
import { useAuthContext } from '../hooks/useAuthContext'

const baseURL = https://faithful-teal-bathing-suit.cyclic.app
const TimeTableDetails = ({ timetable }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { dispatch } = useTimetableContext()
    const [toggle, setToggle] = useState(false);
    const { user } = useAuthContext()

    const [documentData, setDocumentData] = useState('')

    const handleDelete = async () => {

        const response = await fetch(`${baseURL/api/time/` + timetable._id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
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
            const response = await fetch(`${baseURL}api/time/` + timetable._id, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
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
    }, [])

    return (
        <Tbody  >
            <Tr display='flex' w='100%' px={-3} justifyContent='space-around' onClick={() => setToggle(!toggle)} backgroundColor='whiteAlpha.900'>
                <Td width={['150px', '100%', '22%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>

                    <Box width='100%' fontSize={['10', '11', '13', '16']} >
                        {timetable.day}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '26%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>

                    <Box width='100%' fontSize={['10', '11', '13', '16']} >
                        {timetable.time_details.course_code}
                    </Box>
                    {/* </Link> */}
                </Td>
                <Td width={['150px', '100%', '21%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']} overflow='hidden' textOverflow='ellipsis' wordBreak='break-all'>
                    <Box width='100%' fontSize={['10', '11', '13', '16']} >
                        {timetable.start}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '20%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']}>
                    <Box width='100%' fontSize={['10', '11', '13', '16']} >
                        {timetable.end}
                    </Box>
                </Td>
                <Td width={['150px', '100%', '20%']} display='flex' justifyContent='start' fontSize={['10', '11', '13', '16']}>
                    <Box width='100%' fontSize={['10', '11', '13', '16']} >
                        <FaTrashAlt className='text-red-700 font-medium text-xs sm:text-base' onClick={handleDelete} />
                    </Box>
                </Td>
            </Tr>

            {user.role === 'Admin' ? (
                <div>
                    {toggle &&
                        <Box mt={-2} display='flex' flexDirection='row' w='100%' justifyContent='center' alignItems='center' >
                            {/* <Box mr={20} onClick={onOpen} >
                                <Box>
                                    <Button colorScheme='blue' py={2} px={3} color='white' size={9} fontSize={['10', '11', '13', '16']}>
                                        <BiPencil className='text-white mr-2 font-medium text-sm sm:text-base' />
                                        Update
                                    </Button>
                                </Box>
                            </Box> */}
                            {/* <Box >
                                <Box onClick={handleDelete}>
                                    <Button colorScheme='red' py={2} px={3} color='white' size={9} onClick={() => setToggle(!toggle)} fontSize={['10', '11', '13', '16']} >
                                        <FaTrashAlt className='text-white mr-2 font-medium text-xs sm:text-base' />
                                        Delete
                                    </Button>
                                </Box>
                            </Box> */}
                            {/* <TimeUpdateModal documentData={documentData} setToggle={setToggle} toggle={toggle} open={isOpen} close={onClose} /> */}
                        </Box>
                    }
                </div>
            ) : (
                <>

                </>
            )}
        </Tbody>
    )
}

export default TimeTableDetails
