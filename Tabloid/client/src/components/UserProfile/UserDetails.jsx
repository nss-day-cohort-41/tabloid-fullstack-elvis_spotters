import React from 'react';
import { ProfileContext } from "../../providers/ProfileProvider";
import { Link, useHistory } from "react-router-dom";
import "./userprofile.css"
import { useState, useEffect, useContext } from 'react';

const UserDetails = (props) => {
    const { getUserById, changeActiveStatus, getAdminCount } = useContext(ProfileContext);
    const [originalState, setOriginalState] = useState(true);
    const [throttle, setThrottle] = useState({
        count: 0
    });
    const [usersPage, setUsersPage] = useState(false);

    const isUsersPage = (id) => {
        
        JSON.parse(window.sessionStorage.getItem("userProfile")).id == id ? setUsersPage(false) : setUsersPage(true)
    }

    const [user, setUser] = useState({
        id: 0,
        firstName: "Jessica",
        lastName: " Jones",
        displayName: "JessicaJones",
        email: "Jessica@gmail.com",
        createDateTime: "2020-02-21",
        imageLocation: "https://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png?format=1500w",
        userTypeId: 1,
        isActive: true,
        userType: {
            id: 0,
            name: "No Logged In user"
        },
        arrOfUsers: []

    })
    const history = useHistory();
    const getUser = async () => {
        let result = await getUserById(props.match.params.id);
        if (!result) return;
        setOriginalState(result.isActive);
        setUser(result)
        checkImage();
        isUsersPage(props.match.params.id);
    }
    const checkImage = () => {
        const image = document.getElementById('profileImg');
        if (image) {
            image.onerror = () => {
                image.src = "https://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png?format=1500w";
            }
        }

    }
    const setIsActive = async (e) => {
        if (throttle.count >= 1) return;
        setThrottle({ count: 1 });
        e.preventDefault();
        const adminCount = await getAdminCount();
        if (adminCount === 1 && user.isActive === true && user.userTypeId == 1) {
            window.alert("Please assign another Admin before deactivating this user");
        } else {
            setUser((prevState) => {

                return {
                    ...prevState,
                    isActive: !user.isActive
                }
            })
            await changeActiveStatus(user);
            history.push(`/userprofiles/${originalState === true ? "active" : "inactive"}`);
        }
    }


    useEffect(() => {
        getUser();
    }, [])


    return (
        <div>

            <div className="main-content">
                <h1 className="container text-center">User Details</h1>
                <div className="container mt-7">
                    {/* Table */}

                    <div className="row">

                        <div className="col-xl-8 m-auto order-xl-2 mb-5 mb-xl-0">
                            <div className="card card-profile shadow">
                                <div className="row justify-content-center">
                                    <div className="col-lg-3 order-lg-2">

                                        <div className="card-profile-image">
                                            <a href="#">
                                                <img
                                                    id="profileImg"
                                                    src={user.imageLocation}
                                                    className="rounded-circle"
                                                    alt="users photo"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">
                                        <button type="button" onClick={e => history.push(`/userprofiles/${originalState === true ? "active" : "inactive"}`)} className="btn btn-sm btn-info mr-4">
                                            Cancel
                                        </button>
                                        {usersPage === true ? originalState === true ? <>  <button type="button" onClick={setIsActive} className="btn btn-sm btn-default float-right">
                                            Confirm Deactivate
                                        </button></> : <>  <button type="button" onClick={setIsActive} className="btn btn-sm btn-default float-right">
                                                Confirm Activate
                                        </button></> : <></>}


                                    </div>
                                </div>
                                <div className="card-body pt-0 pt-md-4">
                                    <div className="row">
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-5">

                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3>
                                            {`${user.firstName} ${user.lastName}`}
                                        </h3>
                                        <div className="h5 font-weight-300">
                                            <i className="ni location_pin mr-2" />
               @{user.displayName}
                                        </div>
                                        <div className="h5 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />
                                            {user.email}
                                        </div>
                                        <div>
                                            <i className="ni education_hat mr-2" />
               Creation Date: {user.createDateTime}
                                        </div>
                                        <hr className="my-4" />
                                        <h3>
                                            {user.userType.name}
                                        </h3>
                                        {user.isActive === true ? <><h3 >Active</h3></> : <><h3>Deactivated</h3></>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default UserDetails;