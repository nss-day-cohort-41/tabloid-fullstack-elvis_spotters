import React, { useState, createContext, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = createContext();

export function PostProvider(props) {
    const apiUrl = "/api/post";
    const { getToken } = useContext(UserProfileContext);
    const history = useHistory();

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    const getSubscriptions = async () => {
        const token = await getToken();
        const res = await fetch(`${apiUrl}/subscription`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const value = await res.json();
        setPosts(value);
    }

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

    const getMyPosts = () => {
        getToken().then((token) =>
            fetch(`${apiUrl}/user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setPosts));
    }

    const getPost = async (id) => {
        const token = await getToken()
        const res = await fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!res.ok) {
            history.push("/post");
        }
        const value = await res.json();
        return value;
    }

    const getCategories = () => {
        getToken().then((token) =>
            fetch(`${apiUrl}/category`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setCategories));
    }

    const saveNewPost = (post) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            }).then((res) => res.json())
        );
    }

    const updatePost = (post) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${post.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
        )
    }

    const deletePost = async (id) => {
        const token = await getToken();
        const res = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return null;
    }

    return (
        <PostContext.Provider value={{ posts, categories, setPosts, getSubscriptions, getAllPosts, getMyPosts, getPost, getCategories, saveNewPost, updatePost, deletePost }}>
            {props.children}
        </PostContext.Provider>
    );

}