import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLoginStudent } from '../../hooks/auth/useLoginStudent'

// const baseURL = 'https://faithful-teal-bathing-suit.cyclic.app'
const StudentLogin = () => {
  const [show, setShow] = useState(false)
  // to disable input / and
  const [reg_no, setRegNo] = useState('')
  const [role, setRole] = useState('Student')
  const [password, setPassword] = useState('')

  // const { user } = ChatState()

  const { login, pending, error } = useLoginStudent('https://project-skool-mis-api.vercel.app/student/login')


  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(reg_no, role, password)
  }

  const handleShowHide = () => {
    setShow(!show)
    // this i so the password is not changed
    // setGuestShow(guestShow)
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing='5px' color='black' >

        <FormControl id='student-login-reg_no' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Student ID:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='number' bg='green.100' placeholder='Enter your Reg Number' value={reg_no} onChange={(e) => setRegNo(e.target.value)} />
        </FormControl>

        <FormControl id='student-login-role' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Role:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='text' bg='green.100' placeholder='Enter your Email' value={role} onChange={(e) => setRole(e.target.value)} isDisabled />
        </FormControl>

        <FormControl id='student-login-password' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Password:
          </FormLabel>
          <InputGroup>

            <Input height={['35px', '35px', '40px', '40px']} type={show ?
              'text' : 'password'} bg='green.100' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' fontSize={['12.5', '13', '15', '16']} onClick={handleShowHide}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Button for Log in */}
        <Button color='green.100' height={['35px', '35px', '40px', '40px']} colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={pending}  >
          Login
        </Button>
        {error && <div className="text-red-700 font-bold mt-3 text-center border-red-700 border-solid border-2"> {error} </div>}


      </VStack>
    </form>
  )
}

export default StudentLogin
