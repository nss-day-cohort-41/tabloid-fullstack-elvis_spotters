import React, { useState, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';

export const TagContext = createContext();

export function TagProvider(props) {
  const apiUrl = "/api/tag";
  const { getToken } = useContext(UserProfileContext);

  const [tagList, setTagList] = useState([]);

  const getAllTags = () => {
    getToken().then(token => {
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => res.json())
        .then(setTagList)
    })
  };

  return (
    <TagContext.Provider value={{ tagList, getAllTags }}>
      {props.children}
    </TagContext.Provider>
  )
}