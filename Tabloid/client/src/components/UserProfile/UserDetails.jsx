import React from 'react';
import { ProfileContext } from "../../providers/ProfileProvider";
import "./userprofile.css"

const UserDetails = (props) => {
    const { getUserById } = React.useContext(ProfileContext);
    const [user, setUser] = React.useState({
        id: 0,
        firstName: "Jessica",
        lastName: " Jones",
        displayName: "JessicaJones",
        email: "Jessica@gmail.com",
        createDateTime: "2020-02-21",
        imageLocation: "https://demos.creative-tim.com/argon-dashboard/assets/img/theme/team-4.jpg",
        userTypeId: 1,
        userType: {
            id: 0,
            name: "No Logged In user"
        }

    })
    const getUser = async () => {
        let result = await getUserById(props.match.params.id);
        //setUser({ result })
        console.log(result);
    }
    React.useEffect(() => {
        getUser();
    })


    return (
        <div>
            <div>User Details</div>
            <div className="main-content">
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
                                                    src={user.Imagelocation || "https://demos.creative-tim.com/argon-dashboard/assets/img/theme/team-4.jpg"}
                                                    className="rounded-circle"
                                                    alt="users photo"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                                    <div className="d-flex justify-content-between">
                                        <a href="#" className="btn btn-sm btn-info mr-4">
                                            Connect
              </a>
                                        <a href="#" className="btn btn-sm btn-default float-right">
                                            Message
              </a>
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
                                       <button>Activate</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;

            
        </div>
    )
}
export default UserDetails;