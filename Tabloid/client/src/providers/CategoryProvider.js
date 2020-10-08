
import React, { useState, useEffect, createContext } from "react";
import { Redirect } from "react-router-dom";
import { Spinner } from "reactstrap";

export const CategoryContext = createContext();
const userProfile = sessionStorage.getItem("userProfile");

export function CategoryProvider(props) {
    const apiUrl = "/api/category";
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
    const [categories, setCategories] = useState([]);
    const [ready, setReady] = useState(false);
    const getCategories = async () => {
       setCategories(await fetch(apiUrl)
            .then(res => res.json()))
            setReady(true);
    }
    const valueBag = {
        getCategories,
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