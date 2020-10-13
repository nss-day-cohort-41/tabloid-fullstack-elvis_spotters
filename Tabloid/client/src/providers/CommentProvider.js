import React, { useState, createContext, useContext } from "react";
import "firebase/auth";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = createContext();

export function CommentProvider(props) {

    const apiUrl = "api/comment";
    const { getToken } = useContext(UserProfileContext);
    const [comments, setComments] = useState([]);

    const getCommentsByPostId = async (postId) => {
        console.log('post id', postId)

        const token = await getToken();
        const results = await fetch(`/${apiUrl}/${postId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        }).catch(err => console.log(err));

        const postComments = await results.json();
        console.log('fetch', postComments)
        return setComments(postComments);
    }

    return (
        <CommentContext.Provider value={{ comments, setComments, getCommentsByPostId }}>
            {props.children}
        </CommentContext.Provider>
    );
};