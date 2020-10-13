import React from 'react';
import {ProfileContext} from "../../providers/ProfileProvider";
import ProfileListItems from "./UserProfileListItem";

const UserProfiles = () =>{
    const [userProfiles, setUserProfiles] = React.useState([]);

    const {getUserProfiles} = React.useContext(ProfileContext);

    const getProfiles = async () =>{
       let user = await getUserProfiles();
      await setUserProfiles(user.map((ele, index)=>{
          return <ProfileListItems key={index} user={ele} index={index+1}/>
      }))
    }


    React.useEffect(()=>{
       getProfiles();
    }, [])

    return (
    <div className="container">
        <h1 className="text-center">User Profiles</h1>
        {userProfiles.length > 0 ?  <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name </th>
        <th scope="col">Username</th>
        <th scope="col">Type</th>
      </tr>
    </thead>
    <tbody>
    {userProfiles}
    </tbody>
  </table> : <small>Not Working</small>}
   

    </div>
    )
}

export default UserProfiles;