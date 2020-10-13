import React from 'react';
import {Link} from 'react-router-dom';


export default ({ user, index }) => {


    return (
        <>
            <tr>
                <th scope="row">{index}</th>
                <Link to={`/userprofiles/details/${user.id}`}>
                
                <td>{user.fullName}</td></Link>
                <td>{user.displayName}</td>
                <td>{user.userType.name}</td>
                
            </tr>

        </>
    )
}