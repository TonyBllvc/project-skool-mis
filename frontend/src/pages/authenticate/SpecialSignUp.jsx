import {
  Box,
  Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, VStack, useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import { useSignUp } from '../../hooks/auth/useSignup';

const SpecialSignUp = () => {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [surname, setSurname] = useState('')
  const [first_name, setFirstName] = useState('')
  const [middle_name, setMiddleName] = useState('')
  const [department, setDepartment] = useState('')
  const [email, setEmail] = useState('')
  const [faculty, setFaculty] = useState('')
  const [role, setRole] = useState('Admin')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  
  const {signup, pending, error, } = useSignUp('/api/lecturer/login')

  const toast = useToast()
  const [phone, setPhoneNumber] = useState('');
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);

  const handleChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
    setIsValidPhoneNumber(isValidNigerianPhoneNumber(value));
  };

  const isValidNigerianPhoneNumber = (phone) => {
    const nigerianPhoneRegex = /^(?:\+234|234)?[0-9]{10}$/;
    return nigerianPhoneRegex.test(phone);
  };


  const handleShowHide = () => {
    setShow(!show)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(title, surname, first_name, middle_name, role, department, faculty, phone, email, password)
  }
  return (
    <form onSubmit={handleSubmit} >
      <VStack spacing='5px' color='black' >

        <FormControl id='' isRequired>
          <FormLabel color='black'>
            Title:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your role id' value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>

        <FormControl id='' isRequired>
          <FormLabel color='black'>
            Surname:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your surname' value={surname} onChange={(e) => setSurname(e.target.value)} />
        </FormControl>

        <FormControl id='' isRequired>
          <FormLabel color='black'>
            First Name:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your role id' value={first_name} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>

        <FormControl id='' isRequired>
          <FormLabel color='black'>
            Middle Name:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your role id' value={middle_name} onChange={(e) => setMiddleName(e.target.value)} />
        </FormControl>

        <FormControl id='' isRequired>
          <FormLabel color='black'>
            Faculty:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your role id' value={faculty} onChange={(e) => setFaculty(e.target.value)} />
        </FormControl>

        <FormControl id='' isRequired>
          <FormLabel color='black'>
            Department:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your role id' value={department} onChange={(e) => setDepartment(e.target.value)} />
        </FormControl>

        <FormControl id='' isRequired>
          <FormLabel color='black'>
            Role:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your role id' value={role} onChange={(e) => setRole(e.target.value)} />
        </FormControl>

        <FormControl id='' isRequired>
          <FormLabel color='black'>
            Email:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your role id' value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="phone">
          <FormLabel>Phone Number</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none" bg='gray.400' color="gray.700" fontSize="1.2em" children="+234" />
            <Input
              type="tel"
              ml={5}
              placeholder="Enter your phone number"
              value={phone}
              bg='green.100'
              onChange={handleChange}
              isInvalid={!isValidPhoneNumber}
            />
          </InputGroup>
        </FormControl>
        {!isValidPhoneNumber && (
          <Box color="red" mt={2}>
            Please enter a valid Nigerian phone number.
          </Box>
        )}
        <FormControl id='signup-password' isRequired>
          <FormLabel color='black'>
            Password:
          </FormLabel>
          <InputGroup>

            <Input type={show ? 'text' : 'password'} bg='green.100' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleShowHide}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id='confirm-password' isRequired>
          <FormLabel color='black'>
            Confirm Password:
          </FormLabel>
          <InputGroup>

            <Input type={show ? 'text' : 'password'} bg='green.100' placeholder='Confirm your password' value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleShowHide}>
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

        <Button color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={pending} >
          Sign Up
        </Button>

      </VStack>
    </form>
  )
}

export default SpecialSignUp
