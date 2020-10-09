import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const CreateTagModal = ({ modal, toggle, addTag, getAllTags, formFeedback, setFormFeedback }) => {
  const [tag, setTag] = useState({ Name: "" });

  const handleFieldChange = (e) => {
    const stateToChange = { ...tag };
    stateToChange[e.target.id] = e.target.value;
    setTag(stateToChange);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTag = {
      Name: tag.Name
    };

    if (tag.Name === "") {
      setFormFeedback(true);
    } else {
      addTag(newTag).then(() => {
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
            <Input type="text" name="Name" id="Name" invalid={formFeedback} onChange={handleFieldChange} />
            <FormFeedback>Can't save an empty tag!</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CreateTagModal;