import { Box, Button, Container, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import logo from '../images/images_logo.png'
import LecturerLogin from '../pages/authenticate/LecturerLogin'
import StudentLogin from '../pages/authenticate/StudentLogin'
import SpecialLogin from '../pages/authenticate/SpecialLogin'
import { NavLink } from 'react-router-dom'

// A sign up and login page
const LoginModal = () => {

  useEffect(() => {
    document.title = 'Login'
  }, [])

  return (
    <Container maxW='xl' centerContent >
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' textAlign='center' p={4} bg='white' w='100%' m='40px 0 15px 0' borderRadius='lg' borderWidth='1px' >
        <Image src={logo} borderRadius='none' bgPosition='center' boxSize='65px' w='250px' h='90px' alt='logo' />
        <Box bg='whatsapp.300' w='100%' mt='20px' p={4} color='black' borderRadius="lg" borderWidth="1px" >
          <Tabs variant='soft-rounded' colorScheme='gray' >
            <TabList mb='1em'>
              <Tab width='50%'> Admin </Tab>
              <Tab width='50%'> Lecturer </Tab>
              <Tab width='50%'> Student </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SpecialLogin />
              </TabPanel>
              <TabPanel>
                <LecturerLogin />
              </TabPanel>
              <TabPanel>
                <StudentLogin />
              </TabPanel>
            </TabPanels>
            <Box display='flex' width='100%' justifyContent='center' alignItems='center' >
              <Text fontFamily='sans-serif' pr='10px' fontSize='20px'>
                To create an account
              </Text>
              <NavLink to='/sign_up' className='font-serif text-blue-700 font-semibold text-lg'>
                Sign Up
              </NavLink>
            </Box>
          </Tabs>
        </Box>
      </Box>

    </Container>
  )
}

export default LoginModal
