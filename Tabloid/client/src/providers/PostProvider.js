import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = createContext();

export function PostProvider(props) {
    const apiUrl = "api/post";
    const { getToken } = useContext(UserProfileContext);

    const [posts, setPosts] = useState([]);

    const getAllPosts = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setPosts));
    }

    return (
        <PostContext.Provider value={{ posts, setPosts, getAllPosts }}>
            {props.children}
        </PostContext.Provider>
    );

}