import React, { useState, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';
import { useHistory} from "react-router-dom";

export const ProfileContext = createContext();

export function ProfileProvider(props) {
  const apiUrl = "/api/userprofile";
  const history = useHistory();
  const { getToken } = useContext(UserProfileContext);

  const [ProfileList, setProfileList] = useState([]);
  const [truthy, setTruthy] = useState(true);

  // Method gets all Profiles from API in alphabetical order
  const getUserProfiles = async () => {
    let token = await getToken();
    let userProfiles = await fetch(`${apiUrl}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
    await setProfileList(userProfiles);
    return userProfiles
}
    const getUserById = async (id) =>{
        let token = await getToken();
        let userProfile = await fetch(`${apiUrl}/details/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => res.json())
        .catch(err=>{
            history.push("/404")
        })
        if(!userProfile){
            history.push("/404")
            return
        }
        console.log(userProfile);
        return userProfile
    }

    const changeActiveStatus = async (data) =>{
        let token = await getToken();
        let userProfile = await fetch(`${apiUrl}/active/`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
          },
          body: JSON.stringify(data)
        }).then(res => res.json())
        .catch(err=>{
            history.push("/404")
        })
        return userProfile
    }
    const changeAdminStatus = async (data) =>{
        let token = await getToken();
        let userProfile = await fetch(`${apiUrl}/admin/`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
          },
          body: JSON.stringify(data)
        }).then(res => res.json())
        .catch(err=>{
            history.push("/404")
        })
        return userProfile
    }


  return (
    <ProfileContext.Provider value={{ ProfileList, getUserProfiles, getUserById, changeActiveStatus, changeAdminStatus, truthy, setTruthy}}>
      {props.children}
    </ProfileContext.Provider>
  )
}