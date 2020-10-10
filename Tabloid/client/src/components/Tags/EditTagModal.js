import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const EditTagModal = ({ editModal, editToggle, tagToEdit, getTagById }) => {
  const [tag, setTag] = useState({ Id: "", Name: "" });

  const handleFieldChange = (e) => {
    const stateToChange = { ...tag };
    stateToChange[e.target.id] = e.target.value;
    setTag(stateToChange);
  }

  // If tag to edit id is null during initial load, just return. Otherwise get tag by id from database
  useEffect(() => {
    if (tagToEdit.Id === null) {
      return
    } else {
      getTagById(tagToEdit.Id).then(res => {
        setTag({ Id: res.id, Name: res.name });
      })
    }
  }, [tagToEdit.Id])

  return (
    <div>
      <Modal isOpen={editModal} toggle={editToggle}>
        <ModalHeader toggle={editToggle}>Edit Tag</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Name">Tag Name:</Label>
            <Input type="text" name="Name" id="Name" maxLength="50" required value={tagToEdit.Name} onChange={handleFieldChange} />
            <FormFeedback>Can't save an empty tag!</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={editToggle}>Cancel</Button>
          <Button color="info">Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default EditTagModal;