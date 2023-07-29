import {
  Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';

const LectureSignUp = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [master, setMaster] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  // const [picture, setPicture] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const toast = useToast()

  const handleShowHide = () => {
    setShow(!show)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // add picture later 
    if (!name || !master || !password || !confirm_password) {
      toast({
        title: 'Please fill all the Fields!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false)
      return
    }

    if (password !== confirm_password) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false)
      return
    }

    // add picture later 
    const details = { name, master, password, confirm_password }

    // alert(" Correct filling " + JSON.stringify(details) )

    
    // setLoading(false)
    // try {
    //   const res = await fetch("api/user", {
    //     method: "POST",
    //     body: JSON.stringify(details),
    //     headers: {
    //       "Content-Type": "application/json",
    //     }

    //   })
    //   const json = await res.json()

    //   if (!res.ok) {
    //     toast({
    //       title: 'Response not okay!',
    //       status: 'error',
    //       duration: 5000,
    //       isClosable: true,
    //       position: "top",
    //     })
    //     console.log(json.error)

    //   }

    //   if (res.ok) {
    //     toast({
    //       title: 'Login Successful!',
    //       description: master + ' logged in successfully',
    //       status: 'success',
    //       duration: 3000,
    //       isClosable: true,
    //       position: "top",
    //     })
    //     localStorage.setItem('userInfo', JSON.stringify(json))
    //     setLoading(false)
    //     navigate('/chats')
    //   }
    // } catch (error) {
    //   toast({
    //     title: 'An Error Occurred!',
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top",
    //   })
    //   setLoading(false)
    // }

  }
  return (
    <form onSubmit={handleSubmit} >
      <VStack spacing='5px' color='black' >
      
        <FormControl id='first-name' isRequired>
          <FormLabel color='black'>
            Name:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl id='master' isRequired>
          <FormLabel color='black'>
            Master:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your master id' value={master} onChange={(e) => setMaster(e.target.value)} />
        </FormControl>

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

        <Button color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} type='submit' isLoading={loading} >
          Sign Up
        </Button>

      </VStack>
    </form>
  )
}

export default LectureSignUp
