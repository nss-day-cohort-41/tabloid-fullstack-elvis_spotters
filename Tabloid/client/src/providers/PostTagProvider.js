import React, { createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const PostTagContext = createContext();

export function PostTagProvider(props) {
  const apiUrl = "/api/posttag";
  const tagApiUrl = "/api/tag";
  const { getToken } = useContext(UserProfileContext);

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
    return value;
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
    return res;
  }

  return (
    <PostTagContext.Provider value={{ getTagsByPostId, getAllTags, addPostTag }}>
      {props.children}
    </PostTagContext.Provider>
  )
}