import React, { useState, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const TagContext = createContext();

export function TagProvider(props) {
  const apiUrl = "/api/tag";
  const { getToken } = useContext(UserProfileContext);

  const [tagList, setTagList] = useState([]);

  // Method gets all tags from API in alphabetical order
  const getAllTags = async () => {
    const token = await getToken();
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const value = await res.json();
    return setTagList(value);
  };

  // Method posts new tag in API
  const addTag = async (newTag) => {
    const token = await getToken();
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTag)
    });
    const value = await res.json();
    if (res.ok) {
      return value;
    } else {
      throw new Error("Unauthorized");
    }
  };

  return (
    <TagContext.Provider value={{ tagList, getAllTags, addTag }}>
      {props.children}
    </TagContext.Provider>
  )
}