import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useLogin } from '../../hooks/auth/useLogin'

const LecturerLogin = () => {
  const [show, setShow] = useState(false)
  // to disable input / and
  const [email, setEmail] = useState('gtcekwemadu@gmail.com')
  const [role, setRole] = useState('Lecturer')
  const [password, setPassword] = useState('PumaWan.102')

  // const { user } = ChatState()

  const { login, pending, error } = useLogin('/api/lecturer/login')


  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, role, password)
  }

  const handleShowHide = () => {
    setShow(!show)
    // this i so the password is not changed
    // setGuestShow(guestShow)
  }

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing='5px' color='black' >

        <FormControl id='lecturer-login-email' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Lecturer ID:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='text' bg='green.100' placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id='lecturer-login-role' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Role:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='text' bg='green.100' placeholder='Enter your Email' value={role} onChange={(e) => setRole(e.target.value)} isDisabled />
        </FormControl>

        <FormControl id='lecturer-login-password' isRequired>
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
        <Button height={['35px', '35px', '40px', '40px']} color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={pending}  >
          Login
        </Button>
        {error && <div className="text-red-700 font-bold mt-3 text-center border-red-700 border-solid border-2"> {error} </div>}


      </VStack>
    </form>
  )
}

export default LecturerLogin
