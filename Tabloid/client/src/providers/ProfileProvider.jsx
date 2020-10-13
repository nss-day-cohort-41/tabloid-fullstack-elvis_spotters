import React, { useState, createContext, useContext } from 'react';
import { UserProfileContext } from './UserProfileProvider';
import { useHistory} from "react-router-dom";

export const ProfileContext = createContext();

export function ProfileProvider(props) {
  const apiUrl = "/api/userprofile";
  const history = useHistory();
  const { getToken } = useContext(UserProfileContext);

  const [ProfileList, setProfileList] = useState([]);

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
        return userProfile
    }


  return (
    <ProfileContext.Provider value={{ ProfileList, getUserProfiles, getUserById}}>
      {props.children}
    </ProfileContext.Provider>
  )
}