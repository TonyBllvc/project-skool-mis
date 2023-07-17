import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import TimeTableUpdateForm from '../Components/TimeTableUpdateForm'

const TimeUpdateModal = ({ open, close, toggle, setToggle, documentData }) => {

    return (
        <>
            <Modal isOpen={open} onClose={close}   >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Update Form </ModalHeader>
                    <ModalCloseButton onClick={() => setToggle(!toggle)}/>
                    <ModalBody>
                        <TimeTableUpdateForm close={close} documentData={documentData} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TimeUpdateModal