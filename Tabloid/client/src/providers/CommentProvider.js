import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const CommentContext = createContext();

export const CommentProvider = (props) => {

    const apiUrl = "api/comment";
    const [comments, setComments] = useState([]);

    const getCommentsByPostId = (postId) => {
        getToken().then((token) =>
            fetch(apiUrl + `/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((result) => result.json())
                .then(setComments));
    }

    return (
        <CommentContext.Provider value={{ comments, setComments, getCommentsByPostId }}>
            {props.children}
        </CommentContext.Provider>
    );
};