import { Box, Button, Card, FormControl, FormLabel, Input, InputGroup, InputRightElement, Select, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCourseContext } from '../hooks/useCourseContext'
import CourseModel from '../model/CourseModal'
import { useStudentDetailsContext } from '../hooks/useStudentDetailsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app';

const UploadStudentResult = ({ toggling, setToggling}) => {
    const { course, dispatch } = useCourseContext()
    const { dispatch: dispatchResults } = useStudentDetailsContext()
    const { user } = useAuthContext()
    const { id } = useParams()

    const [student_id, setStudent_id] = useState(id)
    const [exam, setExam] = useState('')
    const [practical, setPractical] = useState('')
    const [grade, setGrade] = useState('')
    const [score, setScore] = useState('')
    const [remark, setRemark] = useState('')
    const [test, setTest] = useState('')
    const [courseId, setCourseId] = useState('')
    // const [ selectedOne, setSelectedOne] = useState('')

    const [toggle, setToggle] = useState(false)
    const [passInfo, setInfo] = useState('')
    const [loading, setLoading] = useState(false)

    const toast = useToast()
    // const navigate = useNavigate()

    useEffect(() => {

        const sum_up = parseFloat(test) + parseFloat(practical) + parseFloat(exam)
        const sumUp = sum_up.toFixed(1) // for the score in (%)

        if (sumUp > 100) {
            toast({
                title: 'Total can not be more than 100!',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: "top",
            })
            return
        }

        if (sumUp >= 0 && sumUp <= 39) {
            setScore(sumUp)
            setRemark('Failure!')
            setGrade('F')
        }else if(sumUp >= 40 && sumUp <= 44){
            setScore(sumUp)
            setRemark('Poor Pass!')
            setGrade('E')
        }else if(sumUp >= 45 && sumUp <= 49){
            setScore(sumUp)
            setRemark('Pass!')
            setGrade('D')
        }else if(sumUp >= 50 && sumUp <= 59){
            setScore(sumUp)
            setRemark('Good!')
            setGrade('C')
        }else if(sumUp >= 60 && sumUp <= 69){
            setScore(sumUp)
            setRemark('Very Good!')
            setGrade('B')
        }else if(sumUp >= 70 && sumUp <= 100){
            setScore(sumUp)
            setRemark('Excellent!')
            setGrade('A')
        }

    }, [test, practical, exam])

    const handleExam = (event) => {
        const inputValue = event.target.value

        if(/^\d{0,2}$/.test(inputValue)){
            setExam(inputValue)
        }
    }

    const handleTest = (event) => {
        const inputValue = event.target.value

        if(/^\d{0,2}$/.test(inputValue)){
            setTest(inputValue)
        }
        
    }

    const handlePractical = (event) => {
        const inputValue = event.target.value

        if(/^\d{0,2}$/.test(inputValue)){
            setPractical(inputValue)
        }
        
    }
    // submit filled form
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // check if every field has been filled
        if (!test || !exam || !practical || !grade || !score || !remark || !passInfo || !courseId || !student_id) {
            toast({
                title: 'Please fill all the Fields!',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: "top",
            })
            setLoading(false)
            return
        }

        // parse every value into  details        
        const details = { test, practical, exam, grade, remark, courseId, student_id }

        try {
            const res = await fetch('https://project-skool-mis-api.vercel.app/api/result/set_result', {
                method: "POST",
                body: JSON.stringify(details),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                }

            })

            const json = await res.json()

            if (!res.ok) {
                toast({
                    title: json.error,
                    // description: json.error,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })
                setLoading(false)
                return console.log(json.error)
            }

            if (res.ok) {
                toast({
                    title: 'Results uploaded Successfully!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                })
                dispatchResults({ type: 'CREATE_DATA', payload: json })
                setLoading(false)
                setCourseId(null)
                setExam(null)
                setPractical(null)
                setTest(null)
                setGrade(null)
                setToggling(!toggling)
                console.log('new data added', json)
            }
        } catch (error) {
            toast({
                title: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setLoading(false)
        }

    }

    // fetch courses so as to pick the id
    const handleCourses = async (e) => {
        e.preventDefault()

        const res = await fetch('https://project-skool-mis-api.vercel.app/api/course/get_courses', {
            // we need to send authorization headers(required for authorization)
            headers: {
                // to output the bearer token 
                // by user the ${user.token}
                // this is then picked by the middleware in the backend that protects our routes
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await res.json()

        if (!res.ok) {
            toast({
                title: 'Response not okay!',
                description: json.error,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            return console.log(json.error)
        }

        if (res.ok) {
            dispatch({ type: 'GET_COURSE', payload: json })
            console.log(course)
        }

    }


    return (
        <form onSubmit={handleSubmit} className='w-full flex justify-center'>
            <VStack w={['94%', '88%', '70%']}  spacing='5px' color='black' >

                <FormControl w='100%' display='flex' flexDirection='row' justifyContent='space-between' textAlign='center' alignItems='center' isRequired>
                    <FormLabel fontSize={['11', '13', '15', '16']} width='37%' color='black'>
                        Student Id:
                    </FormLabel>
                    <Input width='62%' fontSize={['9.5', '10', '13', '15']} type='text' bg='green.100' value={student_id} onChange={(e) => setStudent_id(e.target.value)} isDisabled />
                </FormControl>

                <Box w='100%' display='flex' flexDirection='row' justifyContent='space-evenly' >
                    <FormControl w={['30%', '30%', '32%']} isRequired>
                        <FormLabel fontSize={['11', '13', '15', '16']} color='black'>
                            Exam Score:
                        </FormLabel>
                        <Input fontSize={['9.5', '10', '13', '15']}  type='number' value={exam} onChange={handleExam} bg='green.100' placeholder='i.e. 30' />
                    </FormControl>

                    <FormControl w={['30%', '30%', '32%']} isRequired>
                        <FormLabel fontSize={['11', '13', '15', '16']} color='black'>
                            Test Score:
                        </FormLabel>
                        <Input fontSize={['9.5', '10', '13', '15']}  type='number' bg='green.100' value={test} onChange={handleTest} placeholder='i.e. 30' />
                    </FormControl>

                    <FormControl w={['30%', '30%', '32%']} isRequired>
                        <FormLabel fontSize={['11', '13', '15', '16']} color='black'>
                            Prat Score:
                        </FormLabel>
                        <Input fontSize={['9.5', '10', '13', '15']}  type='number' bg='green.100' value={practical} onChange={handlePractical} placeholder='i.e. 30'  />
                    </FormControl>
                </Box>

                <Box w='100%' display='flex' flexDirection='row' justifyContent='space-around' >

                    <FormControl w='30%' isRequired>
                        <FormLabel fontSize={['11', '13', '15', '16']} color='black'>
                            Grade:
                        </FormLabel>
                        <Input fontSize={['9.5', '10', '13', '15']}  type='text' bg='green.100' value={grade} variant='outline' onChange={(e) => setGrade(e.target.value)} color='blackAlpha.900' placeholder='i.e. 30' isDisabled />
                    </FormControl>

                    <FormControl w='30%' isRequired>
                        <FormLabel fontSize={['11', '13', '15', '16']} color='black'>
                            Score:
                        </FormLabel>
                        <Input fontSize={['9.5', '10', '13', '15']}  type='number' bg='green.100' value={score} variant='outline' onChange={(e) => setScore(e.target.value)} color='blackAlpha.900' placeholder='i.e. 30' isDisabled />
                    </FormControl>

                    <FormControl w='30%' isRequired>
                        <FormLabel fontSize={['11', '13', '15', '16']} color='black'>
                            Remark:
                        </FormLabel>
                        <Input fontSize={['9.5', '10', '13', '15']}  type='text' bg='green.100' value={remark} variant='outline' onChange={(e) => setRemark(e.target.value)} color='blackAlpha.900' placeholder='i.e. 30' isDisabled />
                    </FormControl>

                </Box>

                <FormControl isRequired>
                    <FormLabel fontSize={['11', '13', '15', '16']} color='black'>
                        Course Code:
                    </FormLabel>

                    <FormControl w='100%' display='flex' flexDirection='row' justifyContent='space-between'>

                        <Input  fontSize={['8.5', '10', '13', '15']} w={['67%', '70%', '76%']}  type='text' variant='outline' placeholder='Please click on the "list" button ' colorScheme='blue' color='blackAlpha.900' border='2px'  fontFamily='sans-serif' mb={1} value={passInfo} isDisabled />

                        <Box w={['31%', '28%', '20%']} border={4} borderColor='green.600' color='green.600' onClick={() => setToggle(!toggle)}>
                            <Input fontSize={['14', '16', '17']} w='100%' type='button' value='List' variant='outline' colorScheme='whatsapp' color='green.600' mb={1} onClick={handleCourses} />
                        </Box>
                    </FormControl>

                    {/* Drop down of all the course*/}
                    {toggle &&
                        <Box overflow='scroll' height={230} px={4} position='relative' zIndex='overlay'>

                            {course && course.map((dataPick) => (

                                <Card key={dataPick._id} onClick={() => setToggle(!toggle)}>

                                    <CourseModel name={dataPick} handleName={setInfo} handleId={setCourseId} />

                                </Card>

                            ))}
                        </Box>
                    }
                    {/* </Box> */}
                </FormControl>

                {/* Button for Log in */}
                <Button color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15, color: 'white' }} type='submit' isLoading={loading} >
                    Submit
                </Button>

            </VStack>
        </form>
    )
}

export default UploadStudentResult
