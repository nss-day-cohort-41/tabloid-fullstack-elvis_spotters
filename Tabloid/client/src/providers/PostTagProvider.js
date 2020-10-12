import React, { createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const PostTagContext = createContext();

export function PostTagProvider(props) {
  const apiUrl = "/api/posttag";
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
  }

  return (
    <PostTagContext.Provider value={{ getTagsByPostId }}>
      {props.children}
    </PostTagContext.Provider>
  )
}