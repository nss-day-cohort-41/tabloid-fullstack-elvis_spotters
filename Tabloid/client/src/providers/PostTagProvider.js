import React, { createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';
import { useHistory } from 'react-router-dom';

export const PostTagContext = createContext();

export function PostTagProvider(props) {
  const apiUrl = "/api/posttag";
  const tagApiUrl = "/api/tag";
  const postApiUrl = "/api/post";
  const { getToken } = useContext(UserProfileContext);
  const history = useHistory();

  // Method to get all tags associated with specific post
  const getTagsByPostId = async (postId) => {
    const token = await getToken();
    const res = await fetch(`${apiUrl}/${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => console.log(err));
    const value = await res.json();
    if (res.ok) {
      return value;
    } else {
      history.push('/post')
    }
  };

  // Method to get all available tags
  const getAllTags = async () => {
    const token = await getToken();
    const res = await fetch(tagApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const value = await res.json();
    return value;
  };

  // Method to get all posts form database
  const getAllPosts = async () => {
    const token = await getToken();
    const res = await fetch(postApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const value = await res.json();
    return value
  }

  // Method to post new tags to post
  const addPostTag = async (postTag) => {
    const token = await getToken();
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postTag)
    });
    if (res.ok) {
      return console.log("Success")
    } else {
      return console.log("Error")
    }
  }

  return (
    <PostTagContext.Provider value={{ getTagsByPostId, getAllTags, addPostTag, getAllPosts }}>
      {props.children}
    </PostTagContext.Provider>
  )
}