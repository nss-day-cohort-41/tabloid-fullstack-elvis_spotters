import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const CreateTagModal = ({ modal, toggle }) => {

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Tag</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="tag-name">Tag Name:</Label>
            <Input type="text" name="tag-name" id="tag-name" />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Cancel</Button>
          <Button>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CreateTagModal;