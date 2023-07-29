import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLoginStudent } from '../../hooks/auth/useLoginStudent'

const StudentLogin = () => {
  const [show, setShow] = useState(false)
  // to disable input / and
  const [reg_no, setRegNo] = useState('')
  const [role, setRole] = useState('Student')
  const [password, setPassword] = useState('')

  // const { user } = ChatState()

  const { login, pending, error } = useLoginStudent('/api/student/login')


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
          <FormLabel color='black'>
            Student ID:
          </FormLabel>
          <Input type='number' bg='green.100' placeholder='Enter your Email' value={reg_no} onChange={(e) => setRegNo(e.target.value)} />
        </FormControl>

        <FormControl id='student-login-role' isRequired>
          <FormLabel color='black'>
            Role:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your Email' value={role} onChange={(e) => setRole(e.target.value)} isDisabled />
        </FormControl>

        <FormControl id='student-login-password' isRequired>
          <FormLabel color='black'>
            Password:
          </FormLabel>
          <InputGroup>

            <Input type={show ?
              'text' : 'password'} bg='green.100' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleShowHide}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Button for Log in */}
        <Button color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={pending}  >
          Login
        </Button>
        {error && <div className="text-red-700 font-bold mt-3 text-center border-red-700 border-solid border-2"> {error} </div>}


      </VStack>
    </form>
  )
}

export default StudentLogin
