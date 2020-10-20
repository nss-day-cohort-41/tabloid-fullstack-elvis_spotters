import React from 'react';
import { ProfileContext } from "../../providers/ProfileProvider";
import ProfileListItems from "./UserProfileListItem";
import { useHistory } from "react-router-dom"

const UserProfiles = () => {
  const [activeUserProfiles, setUserProfiles] = React.useState([]);
  const { getUserProfiles } = React.useContext(ProfileContext);
  const history = useHistory();
  const getProfiles = async () => {
    let users = await getUserProfiles();
    let activeUsers = getActiveUsers(users);
    await setUserProfiles(activeUsers);
  }
  const getActiveUsers = (users) => {
    let count = 1;
    let activeUsers = users.map((ele, index) => {

      if (ele.isActive !== true) return;
      return <ProfileListItems key={index} user={ele} index={count++} />
    });
    return activeUsers;
  }


  React.useEffect(() => {
    getProfiles();
  }, [])

  return (
    <div className="container">
      <h1 className="text-center">User Profiles</h1>
      <h2 className="text-center">{"Active"} </h2>
      <button type="button" className="btn-sm btn btn-primary" onClick={e => history.push("/userprofiles/inactive")}>{"Go to inactive"}</button>
      {activeUserProfiles.length > 0 ? <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name </th>
            <th scope="col">Username</th>
            <th scope="col">Type</th>
            <th scope="col">Active Status</th>
            <th scope="col">Edit User Type</th>
          </tr>
        </thead>
        <tbody>
          {activeUserProfiles}
        </tbody>
      </table> : <small></small>}


    </div>
  )
}

export default UserProfiles;