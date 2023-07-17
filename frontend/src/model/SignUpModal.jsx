import { Box, Button, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import SpecialSignUp from '../authenticate/SpecialSignUp'
import LectureSignUp from '../authenticate/LecturerSignUp'
import StudentSignUp from '../authenticate/StudentSignUp'
// A sign up and login page
const SignUpModal = () => {

  useEffect(() => {
    document.title = 'SignUpModal Control Page'
  }, [])

  return (
    <Container maxW='xl' centerContent >
      <Box d='flex' justifyContent='center' textAlign='center' p={4} bg='white' w='100%' m='40px 0 15px 0' borderRadius='lg' borderWidth='1px' >
        <Text fontSize='4xl' fontFamily='work sans' color='black' >
          SignUpModal Page
        </Text>
        <Box bg='whatsapp.300' w='100%' p={4} color='black' borderRadius="lg" borderWidth="1px" >
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
          </Tabs>
        </Box>
      </Box>

    </Container>
  )
}

export default SignUpModal
