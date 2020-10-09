import React, { useContext, useEffect, useState } from 'react';
import { TagContext } from "../../providers/TagProvider";
import { ListGroup, Button } from 'reactstrap';
import Tag from './Tag';
import CreateTagModal from './CreateTagModal';

const TagList = () => {
  const { tagList, getAllTags, addTag } = useContext(TagContext);

  // State for modal and form alert in modal
  const [modal, setModal] = useState(false);
  const [formFeedback, setFormFeedback] = useState(false);
  const [newTag, setNewTag] = useState({ Name: "" });

  // Method to reset newTag state
  const clearNewTag = () => {
    setNewTag({ Name: "" });
  }

  // Method to toggle modal on/off and resets form alert
  const toggle = () => {
    clearNewTag();
    setFormFeedback(false);
    setModal(!modal);
  }

  useEffect(() => {
    getAllTags();
  }, [])

  return (
    <div>
      <CreateTagModal modal={modal} toggle={toggle} addTag={addTag} getAllTags={getAllTags} formFeedback={formFeedback} setFormFeedback={setFormFeedback} newTag={newTag} setNewTag={setNewTag} />
      <Button className="mb-4" onClick={toggle}>Create Tag</Button>
      <ListGroup>
        {tagList.map(tag => <Tag key={tag.id} tag={tag} />)}
      </ListGroup>
    </div>
  )
}

export default TagList;