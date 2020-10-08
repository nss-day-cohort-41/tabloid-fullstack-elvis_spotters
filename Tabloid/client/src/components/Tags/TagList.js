import React, { useContext, useEffect, useState } from 'react';
import { TagContext } from "../../providers/TagProvider";
import { ListGroup, Button } from 'reactstrap';
import Tag from './Tag';
import CreateTagModal from './CreateTagModal';

const TagList = () => {
  const { tagList, getAllTags } = useContext(TagContext);

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    getAllTags();
  }, [])

  return (
    <div>
      <CreateTagModal modal={modal} toggle={toggle} />
      <Button className="mb-4" onClick={toggle}>Create Tag</Button>
      <ListGroup>
        {tagList.map(tag => <Tag key={tag.id} tag={tag} />)}
      </ListGroup>
    </div>
  )
}

export default TagList;