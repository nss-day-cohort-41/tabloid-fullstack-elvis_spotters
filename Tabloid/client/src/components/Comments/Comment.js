import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

const Comment = ({ Comment }) => {
    return (
        <Card className="border border-dark m-2">
            <CardHeader className="pb-0">
                <div>
                    <strong className="">{Comment.subject}</strong>
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