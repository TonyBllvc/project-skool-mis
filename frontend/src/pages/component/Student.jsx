import { Link, useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack, BiArrowToRight, BiRightArrowAlt } from "react-icons/bi";
import React, { useEffect, useState } from 'react'
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useStudentDetailsContext } from '../../hooks/useStudentDetailsContext'
import Loading from '../assets/Loading';
import StudentDetails from '../../Components/StudentDetails';
import { useStudentContext } from '../../hooks/useStudentContext';
import StudentResults from '../../Components/StudentResults';

// this for the admin 
const Student = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ studentInfo, setStudentInfo ] = useState('')
  const { studentDetails, dispatch } = useStudentDetailsContext()

  useEffect(() => {
    const fetchStudents = async () => {
      // const id = student[0]._id
      // const id = parseInt(studentsId)
      // console.log(id)
      const res = await fetch('/api/result/student/' + id)
      const json = await res.json()

      if (!res.ok) {
        return console.log(json.error)
      }

      if (res.ok) {
        // console.log(json)
        dispatch({ type: 'GET_DATA', payload: json })
      }
    }
    fetchStudents()

  }, [])

  return (
    <div className='overscroll-contain'>
      <div className='w-full font-mono font-bold text-lg'>

        {/* the top section */}
        <div className='w-full mb-8 flex flex-row justify-start align-middle text-center items-center'>

          <h1 onClick={() => { navigate('/') }} className="text-gray-500 text-sm sm:text-lg font-mono font-semibold">
            Computer Science
          </h1>
          <div className="flex items-end mx-2 justify-end">
            <BiRightArrowAlt className="text-gray-500  text-sm sm:text-lg font-mono font-semibold" />
          </div>
          {/* This would have model schema created */}
          <h2  onClick={() => { navigate(-1) }} className="text-gray-500 text-sm sm:text-lg font-mono font-semibold">
            Students
          </h2>
          <div className="flex items-end mx-2 justify-end">
            <BiRightArrowAlt className="text-gray-500  text-sm sm:text-lg font-mono font-semibold" />
          </div>
          {/* This would have model schema created */}
          <h2 className="text-green-600 text-sm sm:text-lg font-mono font-semibold">
            Student Details
          </h2>

        </div>

        <div className='mb-5'>
          <button onClick={() => { navigate(-1) }} className=' flex flex-row justify-start text-black hover:text-red-700 text-center items-center align-bottom '>
            <BiArrowBack className=" mr-1 font-mono text-center text-lg font-semibold" /> Back
          </button>
        </div>

        <Box mt={8} ml={2} display='flex' width='100%'>
          <TableContainer width="100%">
            <Table width='100%' display='flex' flexDirection='row'>
              <Thead width='25%' >
                <Tr display='flex' width='100%' flexDirection='column' backgroundColor='yellow.200'>
                  <Th width='100%' px={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width='100%' whiteSpace='break-spaces' >
                      Name:
                    </Box>
                  </Th>
                  <Th width='100%' px={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width='100%' whiteSpace='break-spaces' >
                      Faculty:
                    </Box>
                  </Th>
                  <Th width='100%' px={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width='100%' whiteSpace='break-spaces' >
                      Department:
                    </Box>
                  </Th>
                  <Th width='100%' px={2.5} justifyContent='start' fontSize={['9', '12', '16']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width='100%' whiteSpace='break-spaces' >
                      Reg Number:
                    </Box>
                  </Th>
                </Tr>
              </Thead>
              {/* <StudentDetails/> */}
              <StudentDetails />
              {/* ) */}
              {/* )} */}
            </Table>
          </TableContainer>
        </Box>

        {/* Drop Results */}
        <Box mt={8} ml={2} display='flex' width='100%'>
          {studentDetails ? (
          <TableContainer width='100%' >
            <Table width='100%' >
              <Thead width='100%' >
                <Tr display='flex' width='100%' justifyContent='space-around' px={1} backgroundColor='yellow.200'>
                  <Th width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width='100%' whiteSpace='break-spaces' >
                      Course Code
                    </Box>
                  </Th>
                  <Th width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width='100%' whiteSpace='break-spaces' >
                      Grade
                    </Box>
                  </Th>
                  <Th width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width='100%' whiteSpace='break-spaces' >
                      Remark
                    </Box>
                  </Th>
                  <Th width={['150px', '100%', '30%']} display='flex' justifyContent='start' fontSize={['9', '12', '14']} overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap' wordBreak='break-all'>
                    <Box width='100%' whiteSpace='break-spaces' >
                      Remark
                    </Box>
                  </Th>
                </Tr>
              </Thead>
              {studentDetails && studentDetails.map( (studentDetails, index) => (
              <StudentResults studentItem={studentDetails} key={index} />
              )
              )}
            </Table>
          </TableContainer>
          ) : (
            <div className='mt-10 bg-white'>
              <Loading />
            </div>
          )}


        </Box>
      </div>
    </div>
  )
}

export default Student