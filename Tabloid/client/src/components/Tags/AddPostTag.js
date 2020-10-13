import React, { useState, useEffect, useContext } from 'react';
import { PostTagContext } from '../../providers/PostTagProvider';
import { useHistory, useParams } from 'react-router-dom';
import { Label, Input, FormGroup, Form } from 'reactstrap';

const AddPostTag = () => {
  const { getTagsByPostId, getAllTags } = useContext(PostTagContext);
  const { id } = useParams();

  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    getAllTags().then(res => {
      console.log(res);
      setAllTags(res);
    });
    getTagsByPostId(id).then(res => {
      console.log(res);
    })
  }, [])

  return (
    <div>
      <Form>
        <FormGroup tag="fieldset">
          <legend>Select tags you want associated with this post:</legend>
          {allTags.map(tag => (
            <FormGroup check key={tag.id}>
              <Label check>
                <Input type="checkbox" value={tag.id} />{' '}
                {tag.name}
              </Label>
            </FormGroup>
          ))}
        </FormGroup>
      </Form>
    </div>
  )
}

export default AddPostTag;