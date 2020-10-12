import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const CreateTagModal = ({ modal, toggle, addTag, getAllTags, formFeedback, setFormFeedback, newTag, setNewTag }) => {

  const handleFieldChange = (e) => {
    const stateToChange = { ...newTag };
    stateToChange[e.target.id] = e.target.value;
    setNewTag(stateToChange);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const tag = {
      Name: newTag.Name
    };

    if (newTag.Name === "") {
      setFormFeedback(true);
    } else {
      addTag(tag).then(() => {
        toggle();
        getAllTags();
      })
    }
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Tag</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Name">Tag Name:</Label>
            <Input type="text" name="Name" id="Name" invalid={formFeedback} onChange={handleFieldChange} maxLength="50" required />
            <FormFeedback>Can't save an empty tag!</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Cancel</Button>
          <Button color="success" onClick={handleSubmit}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CreateTagModal;