import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';

const Tag = ({ tag, tagToBeDeleted, tagToBeEdited }) => {

  return (
    <div>
      <ListGroupItem className="d-flex flex-row justify-content-between">
        {tag.name}
        <div>
          <Button color="danger" className="mr-2" onClick={() => tagToBeDeleted(tag)}>Delete</Button>
          <Button color="info" onClick={() => tagToBeEdited(tag)}>Edit</Button>
        </div>
      </ListGroupItem>
    </div>
  )
}

export default Tag;