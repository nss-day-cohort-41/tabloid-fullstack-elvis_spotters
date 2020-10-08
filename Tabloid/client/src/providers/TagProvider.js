import React, { useState, createContext } from 'react';

export const TagContext = createContext();

export function TagProvider(props) {
  const apiUrl = "/api/tag";

  const [tagList, setTagList] = useState([]);

  const getAllTags = async () => {
    const res = await fetch(apiUrl);
    const value = await res.json();
    return setTagList(value);
  };

  return (
    <TagContext.Provider value={{ tagList, getAllTags }}>
      {props.children}
    </TagContext.Provider>
  )
}