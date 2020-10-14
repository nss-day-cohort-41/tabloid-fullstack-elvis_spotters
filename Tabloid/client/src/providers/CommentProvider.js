import React, { useState, createContext, useContext } from "react";
import "firebase/auth";
import { UserProfileContext } from "./UserProfileProvider";
import { useHistory } from "react-router-dom";


export const CommentContext = createContext();


export function CommentProvider(props) {

    const apiUrl = "api/comment";
    const { getToken } = useContext(UserProfileContext);
    const [comments, setComments] = useState([]);
    const history = useHistory();


    const getCommentsByPostId = async (postId) => {
        const token = await getToken();
        const results = await fetch(`/${apiUrl}/${postId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        }).catch(err => console.log(err));

        const postComments = await results.json();
        return setComments(postComments);
    }

    const getPost = async (postId) => {
        const token = await getToken()
        const result = await fetch(`/api/post/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!result.ok) {
            history.push(`/${apiUrl}/${postId}`);
        }
        const taco = await result.json();
        return taco;
    }

    return (
        <CommentContext.Provider value={{ comments, setComments, getCommentsByPostId, getPost }}>
            {props.children}
        </CommentContext.Provider>
    );
};