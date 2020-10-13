import React, { useState, useEffect, useContext } from 'react';
import { PostTagContext } from '../../providers/PostTagProvider';
import { useHistory, useParams } from 'react-router-dom';
import { Label, Input, FormGroup, Form } from 'reactstrap';

const AddPostTag = () => {
  const { getTagsByPostId, getAllTags } = useContext(PostTagContext);

  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    getAllTags().then(res => {
      console.log(res);
      setAllTags(res);
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
                <Input type="radio" name="radio1" />{' '}
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

{/* <FormGroup tag="fieldset">
<legend>Radio Buttons</legend>

<FormGroup check>
  <Label check>
    <Input type="radio" name="radio1" />{' '}
    Option one is this and that—be sure to include why it's great
  </Label>
</FormGroup>

<FormGroup check>
  <Label check>
    <Input type="radio" name="radio1" />{' '}
    Option two can be something else and selecting it will deselect option one
  </Label>
</FormGroup>

<FormGroup check disabled>
  <Label check>
    <Input type="radio" name="radio1" disabled />{' '}
    Option three is disabled
  </Label>
</FormGroup>
</FormGroup> */}