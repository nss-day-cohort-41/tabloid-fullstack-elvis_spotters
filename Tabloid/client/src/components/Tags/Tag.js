import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';

const Tag = ({ tag }) => {

  return (
    <div>
      <ListGroupItem className="d-flex flex-row justify-content-between">
        {tag.name}
        <div>
          <Button color="danger" className="mr-2">Delete</Button>
          <Button color="info">Edit</Button>
        </div>
      </ListGroupItem>
    </div>
  )
}

export default Tag;