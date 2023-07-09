import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import TimeTableUpdateForm from '../Components/TimeTableUpdateForm'

const TimeUpdateModal = ({ open, close, documentData }) => {

    return (
        <>
            <Modal isOpen={open} onClose={close}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Header </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <TimeTableUpdateForm close={close} documentData={documentData} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default TimeUpdateModal