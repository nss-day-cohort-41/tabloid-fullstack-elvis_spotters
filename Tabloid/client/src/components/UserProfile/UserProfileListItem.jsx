import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default ({ user, index }) => {
    const history = useHistory();

    return (
        <>
            <tr>
                <th scope="row">{index}</th>
                <td>
                    {user.fullName}
                </td>
                <td>{user.displayName}</td>
                <td>{user.userType.name}</td>
                <td>  <Link to={`/userprofiles/details/${user.id}`}>

                    <button className="btn btn-sm btn-light m-0">{user.isActive === true ? "Deactivate" : "Activate"}</button>

                </Link></td>
                <td>
                    <button type="button" className="btn btn-sm btn-light mr-0" onClick={e => history.push(`/userprofiles/edit/${user.id}`)}>Edit</button>
                </td>

            </tr>

        </>
    )
}