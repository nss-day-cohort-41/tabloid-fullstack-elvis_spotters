import React from 'react';
import {ProfileContext} from "../../providers/ProfileProvider";

const UserProfiles = () =>{
    const [userProfiles, setUserProfiles] = React.useState([]);

    const {getUserProfiles, ProfileList} = React.useContext(ProfileContext);

    const getProfiles = async () =>{
       let user = await getUserProfiles();
      await setUserProfiles(user)
       console.log(ProfileList, "Profile List", user, userProfiles);
    }


    React.useEffect(()=>{
       getProfiles();
    }, [])

    return (
    <div>{userProfiles.length > 0 ? <h1>Working!!!</h1> : <small>Not Working</small>}</div>
    )
}

export default UserProfiles;