import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
// import { FaEye, FaStreetView } from 'react-icons/fa'

// under construction ( check userPro )
const ProfileModel = ({ user, open, close }) => {
  // const { isOpen, onOpen, onClose }  = useDisclosure() 

  return (
    <>
      <Modal size='lg' isCentered isOpen={open} onClose={close} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='40px' fontFamily='Work sans' display='flex' justifyContent='center'>
            {user.surname} {user.first_name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize='40px' fontFamily='work sans' display='flex' justifyContent='space-between' flexDirection='column' alignItems='center'>
            <Image borderRadius='full' boxSize='100px' display='flex' textAlign='start' bg='blackAlpha.300' src={user.picture} alt={user.surname} />

            <Text fontSize={{ base: '28px', md: '30px' }} fontFamily='work sans' >
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={close}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModel
