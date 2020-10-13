import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

const Comment = ({ Comment }) => {
    return (
        <Card className="border border-dark m-2">
            <CardHeader>
                <strong className="float-left">{Comment.subject}</strong>
                <p className="float-right">Posted on: {Comment.createDateTime.substring(0, 10)}</p>
            </CardHeader>
            <CardBody>
                {Comment.content}
            </CardBody>
        </Card>

    )
}

export default Comment;