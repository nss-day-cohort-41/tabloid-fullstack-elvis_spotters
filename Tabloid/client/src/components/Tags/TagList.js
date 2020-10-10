import React, { useContext, useEffect, useState } from 'react';
import { TagContext } from "../../providers/TagProvider";
import { ListGroup, Button } from 'reactstrap';
import Tag from './Tag';
import CreateTagModal from './CreateTagModal';
import DeleteTagModal from './DeleteTagModal';
import EditTagModal from './EditTagModal';

const TagList = () => {
  const { tagList, getAllTags, addTag, deleteTag, getTagById } = useContext(TagContext);

  // State for create Tag modal and form alert in modal
  const [modal, setModal] = useState(false);
  const [formFeedback, setFormFeedback] = useState(false);
  const [newTag, setNewTag] = useState({ Name: "" });

  // State for delete Tag modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState({ Id: "", Name: "" });

  // State for edit Tag modal
  const [editModal, setEditModal] = useState(false);
  const [tagToEdit, setTagToEdit] = useState({ Id: "", Name: "" });

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

  // Method to toggle edit Tag modal on/off
  const editToggle = () => setEditModal(!editModal);

  // Method to be passed to Tag component to toggle modal from edit button and pass the tag to be edited data to state
  const tagToBeEdited = (tag) => {
    setTagToEdit({ Id: tag.id, Name: tag.name });
    editToggle();
  }

  useEffect(() => {
    getAllTags();
  }, [])

  return (
    <div>
      <CreateTagModal modal={modal} toggle={toggle} addTag={addTag} getAllTags={getAllTags} formFeedback={formFeedback} setFormFeedback={setFormFeedback} newTag={newTag} setNewTag={setNewTag} />
      <DeleteTagModal deleteModal={deleteModal} deleteToggle={deleteToggle} tagToDelete={tagToDelete} deleteTag={deleteTag} getAllTags={getAllTags} />
      <EditTagModal editModal={editModal} editToggle={editToggle} tagToEdit={tagToEdit} getTagById={getTagById} />
      <h3 className="mb-4">Tag Management</h3>
      <Button className="mb-4" color="success" onClick={toggle}>Create Tag</Button>
      <ListGroup>
        {tagList.map(tag => <Tag key={tag.id} tag={tag} tagToBeDeleted={tagToBeDeleted} tagToBeEdited={tagToBeEdited} />)}
      </ListGroup>
    </div>
  )
}

export default TagList;