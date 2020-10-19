import React, { useState, createContext, useContext } from "react";
import "firebase/auth";
import { UserProfileContext } from "./UserProfileProvider";
import { useHistory } from "react-router-dom";


export const CommentContext = createContext();


export function CommentProvider(props) {

    const apiUrl = "/api/comment";
    const { getToken } = useContext(UserProfileContext);
    const [comments, setComments] = useState([]);
    const history = useHistory();


    const getCommentsByPostId = async (postId) => {
        const token = await getToken();
        const results = await fetch(`${apiUrl}/${postId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        }).catch(err => history.push("/404"));

        const postComments = await results.json();
        return setComments(postComments);
    }

    const getComment = async (postId, commentId) => {
        const token = await getToken();
        const result = await fetch(`${apiUrl}/${postId}/${commentId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res)
            .catch(err => history.push("/404"));
        const comment = await result.json();
        if (comment.status === 404) {
            history.push("/404")
        }
        return comment;

    }

    const getPost = async (postId) => {
        const token = await getToken();
        const result = await fetch(`/api/post/${postId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).catch(err => history.push("/404"));
        if (!result.ok) {
            history.push(`${apiUrl}/${postId}`);
        }
        const taco = await result.json();
        return taco;
    }

    const addComment = async (comment) => {
        const token = await getToken();
        return await fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        }).then(res => res.json())
            .catch(err => history.push("/404"));

    }

    const deleteComment = async (commentId) => {
        const token = await getToken();
        return await fetch(`${apiUrl}/${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    const editComment = async (comment) => {
        const token = await getToken();
        return await fetch(`${apiUrl}/${comment.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        });
    }

    return (
        <CommentContext.Provider value={{ comments, setComments, getCommentsByPostId, getPost, getComment, addComment, deleteComment, editComment }}>
            {props.children}
        </CommentContext.Provider>
    );
};