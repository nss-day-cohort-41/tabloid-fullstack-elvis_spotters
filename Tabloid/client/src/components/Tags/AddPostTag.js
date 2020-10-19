import React, { useContext, useEffect, useState } from 'react';
import { PostTagContext } from '../../providers/PostTagProvider';
import { useParams, useHistory } from 'react-router-dom';
import { FormGroup, Label, Input, Button } from 'reactstrap';

const AddPostTag = () => {
  const { getAllTags, getTagsByPostId, addPostTag, getAllPosts } = useContext(PostTagContext);
  const { id } = useParams();
  const history = useHistory();

  const [allTags, setAllTags] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);

  const getAllTagsFromDb = async () => {
    const res = await getAllTags();
    setAllTags(res);
  }

  const getTagsByPostIdFromDb = async () => {
    const res = await getTagsByPostId(id);
    setCurrentTags(res.map(tag => tag.tagId));
  }

  // Method to protect addPostTag route from non-existent posts and re-directs user to post list
  const getAllPostsFromDb = async () => {
    const res = await getAllPosts();
    const postIds = res.map(post => post.id)
    if (!postIds.includes(parseInt(id))) {
      return history.push('/post')
    }
  }

  const handleFieldChange = (e) => {
    const stateToChange = [...currentTags];
    const checkedTag = e.target.value;

    // If option is checked, add tagId to list of currentTags, else, find index of unchecked option and remove from list
    if (e.target.checked) {
      stateToChange.push(parseInt(checkedTag));
    } else {
      const index = stateToChange.indexOf(parseInt(checkedTag));
      stateToChange.splice(index, 1);
    }

    setCurrentTags(stateToChange);
  }

  const handleSave = async (e) => {
    e.preventDefault();

    // Passing postId from route parameter and list of selected tag ids as arguments to addPostTag method
    await addPostTag(id, currentTags).then(() => history.push(`/post/${id}/details`));
  }

  useEffect(() => {
    getAllPostsFromDb();
    getAllTagsFromDb();
    getTagsByPostIdFromDb();
  }, [])

  return (
    <div>
      <h4 className="mb-3">Add or remove tags associated with the post:</h4>
      {allTags.map(tag => (
        <FormGroup check key={tag.id}>
          <Label check>
            <Input type="checkbox" checked={currentTags.includes(tag.id)} value={tag.id} onChange={handleFieldChange} />{' '}
            {tag.name}
          </Label>
        </FormGroup>
      ))}
      <div className="row mt-4">
        <Button className="mr-2" onClick={() => history.push(`/post/${id}/details`)}>Cancel</Button>
        <Button color="success" onClick={handleSave}>Save</Button>

      </div>
    </div>
  )
}

export default AddPostTag;