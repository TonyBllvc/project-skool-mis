import { Button, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'
// import { FaEye, FaStreetView } from 'react-icons/fa'

// under construction ( check userPro )
const ProfileModel = ({ user, open, close }) => {
  // const { isOpen, onOpen, onClose }  = useDisclosure() 

  return (
    <>
      <Modal size={['xs', 'sm', 'md', 'lg']} isCentered isOpen={open} onClose={close} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={['23', '28', '30', '34']} fontFamily='Work sans' display='flex' justifyContent='center'>
            {user.surname} {user.first_name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize='40px' fontFamily='work sans' display='flex' justifyContent='flex-start' flexDirection='column' alignItems='flex-start'>
            {user.role === 'Student' ? (
              <Text fontSize={['15', '16', '18', '21']} fontFamily='work sans' >
                <b> Reg number:</b> {user.reg_no}
              </Text>) : (
              <>

              </>
            )}
            <Text fontSize={['15', '16', '18', '21']} fontFamily='work sans' >
              <b> Role:</b> {user.role}
            </Text>
            <Text fontSize={['15', '16', '18', '21']} fontFamily='work sans' >
              <b> Email:</b> {user.email}
            </Text>
            <Text fontSize={['15', '16', '18', '21']} fontFamily='work sans' >
              <b> Phone:</b> 0{user.phone}
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
