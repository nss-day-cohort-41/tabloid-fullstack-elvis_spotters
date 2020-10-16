import React from 'react';
import {Link} from 'react-router-dom';


export default ({ user, index }) => {


    return (
        <>
            <tr>
                <th scope="row">{index}</th><td>
                <Link to={`/userprofiles/details/${user.id}`}>
                {user.fullName}
                </Link>
                </td>
                <td>{user.displayName}</td>
                <td>{user.userType.name}</td>
                <Link to={`/userprofiles/edit/${user.id}`}>
                    <td>
                        <button className="btn btn-light m-0">Edit</button>
                    </td>
                </Link>
                
            </tr>

        </>
    )
}