import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

const Comment = ({ Comment }) => {
    return (
        <Card className="border border-dark m-2">
            <CardHeader>
                <strong>{Comment.subject}</strong>
            </CardHeader>
            <CardBody>
                {Comment.content}
            </CardBody>
        </Card>

    )
}

export default Comment;