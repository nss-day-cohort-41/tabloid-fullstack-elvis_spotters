import React from "react";
import { Card, CardHeader, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const Comment = ({ Comment, PostId, CurrentUser }) => {

    const history = useHistory();



    return (
        <Card className="border border-dark m-2">
            <CardHeader className="">
                <div className="d-flex justify-content-between">
                    <strong>{Comment.subject}</strong>
                    <div>
                        {CurrentUser !== Comment.userProfileId ? "" :
                            <Button className="btn btn-primary m-1" type="button" onClick={() => history.push(`/comments/${PostId}/edit/${Comment.id}`)}> Edit</Button>
                        }
                        <Button className="btn btn-danger m-1" type="button" onClick={() => history.push(`/comments/${PostId}/delete/${Comment.id}`)}> Delete</Button>
                    </div>
                </div>
                <div className="justify-content-between mt-2 mb-0">
                    <p className="float-left">Author: {Comment.userProfile.displayName}</p>
                    <p className="float-right">Posted on: {Comment.createDateTime.substring(0, 10)}</p>
                </div>
            </CardHeader>
            <CardBody>
                {Comment.content}
            </CardBody>
        </Card>

    )
}

export default Comment;