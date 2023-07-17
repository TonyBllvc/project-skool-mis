import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { ChatState } from '../../contexts/ChatProvider'

const LecturerLogin = () => {
  const [show, setShow] = useState(false)
  // to disable input / and
  const [readOnly, setReadOnly] = useState(false)
  const [master, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  // const { user } = ChatState()

  const toast = useToast()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // add picture later 
    if (!master || !password) {
      toast({
        title: 'Please fill all the Fields!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      return
    }
    // add picture later 
    const details = { master, password }

    try {
      const res = await fetch("api/user/login", {
        method: "POST",
        body: JSON.stringify(details),
        headers: {
          "Content-Type": "application/json",
        }

      })

      const json = await res.json()

      if (!res.ok) {
        toast({
          title: 'Response not okay!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "top",
        })
        console.log(json.error)

      }

      if (res.ok) {
        toast({
          title: 'LecturerLogin Successful!',
          description: master + ' logged in successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: "top",
        })
        localStorage.setItem('userInfo', JSON.stringify(json))
        setLoading(false)
        navigate('/master_home')
      }
    } catch (error) {
      toast({
        title: 'Error occurred, can not login now!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "top",
      })
      setLoading(false)
    }

  }

  const handleShowHide = () => {
    setShow(!show)
    // this i so the password is not changed
    // setGuestShow(guestShow)
  }

  const handleGuest = (e) => {
    setEmail('guest@example.com')
    setPassword('logmeIn576')
    setReadOnly(true)
  }

  const removeGuest = () => {
    setEmail('')
    setPassword('')
    setReadOnly(false)

  }

  return (
    <form >
      <VStack spacing='5px' color='black' >

        <FormControl id='login-master' isRequired>
          <FormLabel color='black'>
            Master ID:
          </FormLabel>
          <Input type='text' bg='green.100' placeholder='Enter your Master ID' value={master} onChange={(e) => setEmail(e.target.value)} isReadOnly={readOnly} />
        </FormControl>

        <FormControl id='login-password' isRequired>
          <FormLabel color='black'>
            Password:
          </FormLabel>
          <InputGroup>

            <Input type={show && !readOnly ? 
            'text' : 'password'} bg='green.100' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} isReadOnly={readOnly} />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleShowHide}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        {/* Button for Log in */}
        <Button color='green.100' colorScheme='whatsapp' width='100%' style={{ marginTop: 15 }} onClick={handleSubmit} isLoading={loading} >
          LecturerLogin
        </Button>


      </VStack>
    </form>
  )
}

export default LecturerLogin
