import React, { useState, UseEffect } from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

const Comment = ({ comment }) => {
    return (
        <Card>
            <CardHeader>
                {comment.Subject}
            </CardHeader>
            <CardBody>
                {comment.Content}
            </CardBody>
        </Card>
    )
}

export default Comment;