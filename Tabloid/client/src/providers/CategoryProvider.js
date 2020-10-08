
import React, { useState, useEffect, createContext } from "react";

import { UserProfileContext } from "./UserProfileProvider";

import { Spinner } from "reactstrap";

export const CategoryContext = createContext();

export function CategoryProvider(props) {
    const apiUrl = "/api/category";
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