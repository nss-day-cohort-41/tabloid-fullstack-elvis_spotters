import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteTagModal = ({ deleteModal, deleteToggle, tagToDelete, deleteTag, getAllTags }) => {

  const handleSubmit = (e) => {
    e.preventDefault();

    deleteTag(tagToDelete.Id).then(() => {
      deleteToggle();
      getAllTags();
    })
  }

  return (
    <div>
      <Modal isOpen={deleteModal} toggle={deleteToggle}>
        <ModalHeader toggle={deleteToggle}>Delete Tag</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the <b>{tagToDelete.Name}</b> tag?
        </ModalBody>
        <ModalFooter>
          <Button onClick={deleteToggle}>Cancel</Button>
          <Button color="danger" onClick={handleSubmit}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default DeleteTagModal;