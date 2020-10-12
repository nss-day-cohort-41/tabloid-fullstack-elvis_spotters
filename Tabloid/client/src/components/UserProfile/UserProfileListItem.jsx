import React from 'react';


export default ({ user, index }) => {


    return (
        <>
            <tr>
                <th scope="row">{index}</th>
                <td>{user.fullName}</td>
                <td>{user.displayName}</td>
                <td>{user.userType.name}</td>
            </tr>

        </>
    )
}