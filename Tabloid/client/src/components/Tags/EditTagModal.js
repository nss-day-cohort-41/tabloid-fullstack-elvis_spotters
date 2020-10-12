import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const EditTagModal = ({ editModal, editToggle, tagToEdit, getTagById, updateTag, formFeedback, setFormFeedback, getAllTags, setTagToEdit }) => {
  const [tag, setTag] = useState({ Id: "", Name: "" });

  const handleFieldChange = (e) => {
    const stateToChange = { ...tag };
    stateToChange[e.target.id] = e.target.value;
    setTag(stateToChange);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTag = {
      Id: tag.Id,
      Name: tag.Name
    }

    if (tag.Name === "") {
      setFormFeedback(true);
    } else {
      updateTag(updatedTag).then(() => {
        // Reset state to default after updating tag => fixes 404 not found error after deleting an edited tag
        setTagToEdit({ Id: "", Name: "" });
        editToggle();
        getAllTags();
      })
    }
  }

  // If tag to edit id is null during initial load, just return. Otherwise get tag by id from database. Keeping watch of editToggle to re-instantiate tag state and input value when user deletes input, cancels modal, and re-clicks edit button for same tag
  useEffect(() => {
    if (tagToEdit.Id === null) {
      return
    } else {
      getTagById(tagToEdit.Id).then(res => {
        setTag({ Id: res.id, Name: res.name });
      })
    }
  }, [tagToEdit.Id, getTagById, editToggle])

  return (
    <div>
      <Modal isOpen={editModal} toggle={editToggle}>
        <ModalHeader toggle={editToggle}>Edit Tag</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="Name">Tag Name:</Label>
            <Input type="text" name="Name" id="Name" maxLength="50" required invalid={formFeedback} value={tag.Name || ""} onChange={handleFieldChange} />
            <FormFeedback>Can't save an empty tag!</FormFeedback>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={editToggle}>Cancel</Button>
          <Button color="info" onClick={handleSubmit}>Save</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default EditTagModal;