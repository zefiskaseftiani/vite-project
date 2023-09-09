import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const ModalComponent = ({ title, openModal, onClose, children }) => {
    const { isOpen, onOpen, onClose: close } = useDisclosure();

    useEffect(() => {
        if (openModal) {
            onOpen();
        } else {
            close();
        }
    }, [openModal, onOpen, close]);

    return (
        <Modal isOpen={isOpen} onClose={() => {
            close();
            onClose();
        }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>{children}</ModalBody>
            </ModalContent>
        </Modal >
    );
}

ModalComponent.propTypes = {
    title: PropTypes.string.isRequired,
    openModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
}