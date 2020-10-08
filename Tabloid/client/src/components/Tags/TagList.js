import React, { useContext, useEffect } from 'react';
import { TagContext } from "../../providers/TagProvider";
import { ListGroup } from 'reactstrap';
import Tag from './Tag';

const TagList = () => {
  const { tagList, getAllTags } = useContext(TagContext);

  useEffect(() => {
    getAllTags();
  }, [])

  return (
    <div>
      <ListGroup>
        {tagList.map(tag => <Tag key={tag.id} tag={tag} />)}
      </ListGroup>
    </div>
  )
}

export default TagList;