// @flow

import * as React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
} from 'reactstrap';

type SearchBarModalProps = {
    isModalOpen: boolean,
    toggleModalOpen: () => void,
};

function SearchBarModal(props: SearchBarModalProps) {
    const { isModalOpen, toggleModalOpen } = props;
    return (
        <Modal
            isOpen={isModalOpen}
            toggle={toggleModalOpen}
        >
            <ModalHeader toggle={toggleModalOpen} />
            <ModalBody>
                <div className="content">
                    <h2 className="title">Error</h2>
                    <p className="error">
                         Invalid Address, Block Number, or Transaction Hash. Please enter a valid Address, Block Number or, Transaction Hash.
                    </p>
                </div>
                <Button
                    color="primary"
                    className="w-100"
                    onClick={toggleModalOpen}
                >
                    OK
                </Button>
            </ModalBody>
        </Modal>
    );
}

export default SearchBarModal;
