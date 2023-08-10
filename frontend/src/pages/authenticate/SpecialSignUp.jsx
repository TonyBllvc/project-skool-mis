import {
  Box,
  Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSignUp } from '../../hooks/auth/useSignup';


// const optionOne = [
//   { value: 'SICT', label: 'SICT', key: '1' },
//   { value: 'SEET', label: 'SEET', key: '2' },
//   { value: 'SOPS', label: 'SOPS', key: '3' },
//   { value: 'SAAT', label: 'SAAT', key: '4' },
// ]

// const optionTwo = [
//   { value: 'Computer Science', label: 'Computer Science', key: '1' },
//   { value: 'Computer Engineering', label: 'Computer Engineering', key: '2' },
// ]

const SpecialSignUp = () => {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [surname, setSurname] = useState('')
  const [first_name, setFirstName] = useState('')
  const [middle_name, setMiddleName] = useState('')
  const [department, setDepartment] = useState('Computer Science')
  const [email, setEmail] = useState('')
  const [faculty, setFaculty] = useState('SICT')
  const [role, setRole] = useState('Admin')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  
  const {signup, pending, error, } = useSignUp('/api/admin/signup')

  const toast = useToast()
  const [phone, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const handleChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
    setIsValidPhoneNumber(isValidNigerianPhoneNumber(value));
  };

  const isValidNigerianPhoneNumber = (phone) => {
    const nigerianPhoneRegex = /^(?:\+234|234)?[0-9]{11}$/;
    return nigerianPhoneRegex.test(phone);
  };


  const handleShowHide = () => {
    setShow(!show)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if( password !== confirm_password){
      toast({
          title: 'Confirm password properly',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "top",
      })
      return
    }
    await signup(title, surname, first_name, middle_name, role, department, faculty, phone, email, password)
  }
  return (
    <form onSubmit={handleSubmit} >
      <VStack spacing='5px' color='black' >

        <FormControl id='admin-title' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Title:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='text' bg='green.100' placeholder='i.e. Engr.' value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl id='admin-surname' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Surname:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='text' bg='green.100' placeholder='Enter your surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
        </FormControl>

        <FormControl id='admin-first_name' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            First Name:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='text' bg='green.100' placeholder='Enter your first name' value={first_name} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>

        <FormControl id='admin-middle_name' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Middle Name:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='text' bg='green.100' placeholder='Enter your middle name' value={middle_name} onChange={(e) => setMiddleName(e.target.value)} />
        </FormControl>

        <FormControl id='admin-faculty' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Faculty:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='text' bg='green.100' placeholder='i.e. SICT' maxLength='4' value={faculty} onChange={(e) => setFaculty(e.target.value)} isDisabled />
        </FormControl>

        <FormControl id='admin-department' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Department:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='text' bg='green.100' placeholder='i.e. Computer Science' value={department} onChange={(e) => setDepartment(e.target.value)} isDisabled/>
        </FormControl>

        <FormControl id='admin-role' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Role:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='text' bg='green.100' placeholder='Enter your role id' value={role} onChange={(e) => setRole(e.target.value)} isDisabled/>
        </FormControl>

        <FormControl id='admin-email' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Email:
          </FormLabel>
          <Input height={['35px', '35px', '40px', '40px']} type='email' bg='green.100' placeholder='Enter your e-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="admin-phone" 
              isRequired>
          <FormLabel fontSize={['12.5', '13', '15', '16']}>Phone Number</FormLabel>
          <InputGroup  width='100%'>
            {/* <InputLeftElement  height={['35px', '35px', '40px', '40px']} width={['25%', '', '','13%']} pointerEvents="none" bg='gray.400' color="gray.700" fontSize="1.2em" children="+234" /> */}
            <Input
             height={['35px', '35px', '40px', '40px']}
              type='number'
              // ml={['14px', '', '', '30px']}
              width='100%'
              placeholder="Enter your phone number"
              value={phone}
              bg='green.100'
              onChange={handleChange}
              maxLength='11'
              isInvalid={!isValidPhoneNumber}
            />
          </InputGroup>
        </FormControl>
        {!isValidPhoneNumber && (
          <Box color="red" mt={2} fontSize={['12.5', '13', '15', '16']}>
            Should contain 11 digits only
          </Box>
        )}
        <FormControl id='admin-password' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Password:
          </FormLabel>
          <InputGroup>

            <Input  height={['35px', '35px', '40px', '40px']} type={show ? 'text' : 'password'} bg='green.100' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleShowHide}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id='admin-confirm-password' isRequired>
          <FormLabel color='black' fontSize={['12.5', '13', '15', '16']}>
            Confirm Password:
          </FormLabel>
          <InputGroup>

            <Input height={['35px', '35px', '40px', '40px']} type={show ? 'text' : 'password'} bg='green.100' placeholder='Confirm your password' value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' fontSize={['12.5', '13', '15', '16']}  onClick={handleShowHide}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* <FormControl id='picture'>
            <FormLabel color='black'>
                Upload Profile Picture:
            </FormLabel>
            <Input type='file' bg='green.100' placeholder='Profile picture' onChange={(e) => postDetails(e.target.files[0])} />
        </FormControl> */}

        <Button  height={['35px', '35px', '40px', '40px']} color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={pending} >
          Sign Up
        </Button>
        {error && <div className="text-red-700 font-bold mt-3 text-center border-red-700 border-solid border-2"> {error} </div>}

      </VStack>
    </form>
  )
}

export default SpecialSignUp
