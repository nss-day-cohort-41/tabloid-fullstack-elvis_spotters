import React, { useState, useEffect, useContext } from 'react';
import { PostTagContext } from '../../providers/PostTagProvider';
import { useHistory, useParams } from 'react-router-dom';
import { Label, Input, FormGroup, Form } from 'reactstrap';

const AddPostTag = () => {
  const { getTagsByPostId, getAllTags } = useContext(PostTagContext);
  const { id } = useParams();

  const [allTags, setAllTags] = useState([]);
  const [currentTagIds, setCurrentTagIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [jsxArr, setJsxArr] = useState([]);

  let currentTagIdsArr = [];

  const arrOfCheckBoxes = (res, cats) => {

    let arr = res.map(tag => {

      return (
        <FormGroup key={tag.id}>
          <Label check>
            <Input type="checkbox" value={tag.id} defaultChecked={cats.includes(tag.id)} />{' '}
            {tag.name}
          </Label>
        </FormGroup>
      )
    })

    setJsxArr(arr);
  }

  const getAllTagsFromDB = async () => {
    const res = await getAllTags();
    setAllTags(res)
    await getTagsByPostIdFromDB().then((cats) => arrOfCheckBoxes(res, cats))
  }

  const getTagsByPostIdFromDB = async () => {
    const res = await getTagsByPostId(id);
    currentTagIdsArr = await res.map(tag => tag.tagId);
    setCurrentTagIds(currentTagIdsArr);
    return currentTagIdsArr
  }

  useEffect(() => {
    getAllTagsFromDB().then(() => setIsLoaded(true))
  }, [])


  return (
    <div>
      <Form>
        <FormGroup tag="fieldset">
          <legend>Select tags you want associated with this post:</legend>
          {isLoaded ? <>{jsxArr}</> : null}
        </FormGroup>
      </Form>
    </div>
  )
}

export default AddPostTag;