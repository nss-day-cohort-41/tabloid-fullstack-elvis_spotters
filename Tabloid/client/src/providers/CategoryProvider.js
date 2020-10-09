
import React, { useState, useEffect, createContext } from "react";

import { UserProfileContext } from "./UserProfileProvider";

import { Spinner } from "reactstrap";

export const CategoryContext = createContext();

export function CategoryProvider(props) {
    const apiUrl = "/api/category";
    const createURL = "/api/category/create";
    
    const { getToken } = React.useContext(UserProfileContext);
    const [categories, setCategories] = useState([]);
    const [ready, setReady] = useState(false);
    const getCategories = async () => {
        let token = await getToken();
       setCategories(await fetch(apiUrl, { headers: {
        Authorization: `Bearer ${token}`
    }})
            .then(res => res.json()))
            setReady(true);
    }
    const getCategoryById = async (id) =>{
        let token = await getToken();
        let category = await fetch(`${apiUrl}/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
        console.log(category)
        return category;
    }
    const createCategory = async (category) =>{
        let token = await getToken();
        await fetch(createURL, {
            method:"POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(category)
        }).then(getCategories())
    } 
    const deleteCategory = async (id)=>{
        let token = await getToken();
        await fetch(`${apiUrl}/${id}`, {
            method:"DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(getCategories())
    }
    const editCategory = async (category)=>{
        let token = await getToken();
        await fetch(`${apiUrl}/${category.id}`, {
            method:"PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            },
            body: JSON.stringify(category)
        }).then(getCategories())
    }


    const valueBag = {
        getCategories,
        createCategory,
        getCategoryById,
        editCategory,
        deleteCategory,
        categories
    }
    useEffect( () => {
            getCategories();
    }, [])

    return (
        <>
            <CategoryContext.Provider value={valueBag}>
                {ready
                    ? props.children
                    : <Spinner className="app-spinner dark" />}
            </CategoryContext.Provider>
        </>
    )
                }
            
//  <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register, getToken }}>
//  {isFirebaseReady
//    ? props.children
//    : <Spinner className="app-spinner dark"/>}
// </UserProfileContext.Provider>