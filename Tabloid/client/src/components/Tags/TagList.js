import React, { useContext, useEffect } from 'react';
import { TagContext } from "../../providers/TagProvider";
import { ListGroup, Button } from 'reactstrap';
import Tag from './Tag';

const TagList = () => {
  const { tagList, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, [])

  return (
    <div>
      <Button className="mb-4">Create Tag</Button>
      <ListGroup>
        {tagList.map(tag => <Tag key={tag.id} tag={tag} />)}
      </ListGroup>
    </div>
  )
}

export default TagList;