import React, { useContext, useEffect, useState } from 'react';
import { TagContext } from "../../providers/TagProvider";
import { ListGroup, Button } from 'reactstrap';
import Tag from './Tag';
import CreateTagModal from './CreateTagModal';
import DeleteTagModal from './DeleteTagModal';

const TagList = () => {
  const { tagList, getAllTags, addTag, deleteTag } = useContext(TagContext);

  // State for create Tag modal and form alert in modal
  const [modal, setModal] = useState(false);
  const [formFeedback, setFormFeedback] = useState(false);
  const [newTag, setNewTag] = useState({ Name: "" });

  // State for delete Tag modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState({ Id: "", Name: "" });

  // Method to reset newTag state
  const clearNewTag = () => {
    setNewTag({ Name: "" });
  }

  // Method to toggle create Tag modal on/off and resets form alert
  const toggle = () => {
    clearNewTag();
    setFormFeedback(false);
    setModal(!modal);
  }

  // Method to toggle delete Tag modal on/off
  const deleteToggle = () => setDeleteModal(!deleteModal);

  // Method to be passed to Tag component to toggle modal from delete button and pass the tag to be deleted data to state
  const tagToBeDeleted = (tag) => {
    setTagToDelete({ Id: tag.id, Name: tag.name });
    deleteToggle();
  }

  useEffect(() => {
    getAllTags();
  }, [])

  return (
    <div>
      <CreateTagModal modal={modal} toggle={toggle} addTag={addTag} getAllTags={getAllTags} formFeedback={formFeedback} setFormFeedback={setFormFeedback} newTag={newTag} setNewTag={setNewTag} />
      <DeleteTagModal deleteModal={deleteModal} deleteToggle={deleteToggle} tagToDelete={tagToDelete} deleteTag={deleteTag} getAllTags={getAllTags} />
      <h3 className="mb-4">Tag Management</h3>
      <Button className="mb-4" color="success" onClick={toggle}>Create Tag</Button>
      <ListGroup>
        {tagList.map(tag => <Tag key={tag.id} tag={tag} tagToBeDeleted={tagToBeDeleted} />)}
      </ListGroup>
    </div>
  )
}

export default TagList;