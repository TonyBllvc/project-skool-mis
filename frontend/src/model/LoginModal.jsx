import { Box, Button, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import LecturerLogin from '../authenticate/LecturerLogin'
import StudentLogin from '../authenticate/StudentLogin'
import SpecialLogin from '../authenticate/SpecialLogin'

// A sign up and login page
const LoginModal = () => {

  useEffect(() => {
    document.title = 'LoginModal Control Page'
  }, [])

  return (
    <Container maxW='xl' centerContent >
      <Box d='flex' justifyContent='center' textAlign='center' p={4} bg='white' w='100%' m='40px 0 15px 0' borderRadius='lg' borderWidth='1px' >
        <Text fontSize='4xl' fontFamily='work sans' color='black' >
          LoginModal Page
        </Text>
        <Box bg='whatsapp.300' w='100%' p={4} color='black' borderRadius="lg" borderWidth="1px" >
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
          </Tabs>
        </Box>
      </Box>

    </Container>
  )
}

export default LoginModal
