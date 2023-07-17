import { Box, Button, Container, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import logo from '../images/images_logo.png'
import SpecialSignUp from '../authenticate/SpecialSignUp'
import LectureSignUp from '../authenticate/LecturerSignUp'
import StudentSignUp from '../authenticate/StudentSignUp'
import { NavLink } from 'react-router-dom'
// A sign up and login page
const SignUpModal = () => {

  useEffect(() => {
    document.title = 'SignUpModal Control Page'
  }, [])

  return (
    <Container maxW='xl' centerContent >
      <Box display='flex'  flexDirection='column' justifyContent='center' alignItems='center' textAlign='center' p={4} bg='white' w='100%' m='40px 0 15px 0' borderRadius='lg' borderWidth='1px' >
        <Image src={logo} borderRadius='none' bgPosition='center' boxSize='65px' w='250px' h='90px' alt='logo' />
        <Box bg='whatsapp.300' w='100%' mt='20px' p={4} color='black' borderRadius="lg" borderWidth="1px" >
          <Tabs variant='soft-rounded' colorScheme='gray' >
            <TabList mb='1em'>
              <Tab width='50%'> Admin</Tab>
              <Tab width='50%'> Lecturer</Tab>
              <Tab width='50%'> Student</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SpecialSignUp />
              </TabPanel>
              <TabPanel>
                <LectureSignUp />
              </TabPanel>
              <TabPanel>
                <StudentSignUp />
              </TabPanel>
            </TabPanels>
            <Box display='flex' width='100%' justifyContent='center' alignItems='center' >
              <Text fontFamily='sans-serif' pr='10px' fontSize='20px'>
                Already have an account  
              </Text>
                <NavLink to='/login' className='font-serif text-blue-700 font-semibold text-lg'>
                  Log in
                </NavLink>
            </Box>
          </Tabs>
        </Box>
      </Box>

    </Container>
  )
}

export default SignUpModal
