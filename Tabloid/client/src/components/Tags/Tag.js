import React from 'react';
import { ListGroupItem } from 'reactstrap';

const Tag = ({ tag }) => {

  return (
    <ListGroupItem>{tag.name}</ListGroupItem>
  )
}

export default Tag;