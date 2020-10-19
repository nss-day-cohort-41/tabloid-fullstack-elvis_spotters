import React, { useEffect, useState, useContext } from 'react';
import { CommentContext } from "../../providers/CommentProvider";
import { useHistory, useParams } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

const EditComment = () => {

    const history = useHistory();
    const { postId, commentId } = useParams();
    const { getComment, editComment } = useContext(CommentContext);

    const [subject, setSubject] = useState();
    const [content, setContent] = useState();
    const [commentToEdit, setCommentToEdit] = useState();

    const handleEdit = (event) => {
        event.preventDefault();
        console.log(commentToEdit)
        console.log('content', content)
        const editedComment = commentToEdit;
        editedComment.subject = subject;
        editedComment.content = content;

        editComment(editedComment).then(() => history.push(`/comments/${postId}`))
    }

    useEffect(() => {

        const currentUser = JSON.parse(sessionStorage.userProfile);
        getComment(postId, commentId)
            .then(result => {
                if (currentUser.id === result.userProfileId) {
                    return result
                } else {
                    history.push(`/comments/${postId}`)
                }
            })
            .then(result => {
                try {
                    setSubject(result.subject)
                    setContent(result.content)
                    setCommentToEdit(result)
                }
                catch (err) {
                    history.push("/404");
                }
            });




    }, [])




    return (
        <>
            <h2>Edit Comment</h2>
            <hr />
            {commentToEdit === undefined ? <h4>Loading...</h4> :
                <Form onSubmit={handleEdit}>
                    <FormGroup >
                        <Label for="subject">Subject:</Label>
                        <Input
                            id="subject"
                            onChange={(event) => setSubject(event.target.value)}
                            maxLength="255"
                            defaultValue={commentToEdit.subject}
                            required
                        ></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="content">Content:</Label>
                        <Input
                            id="content"
                            type="textarea"
                            onChange={(event) => setContent(event.target.value)}
                            defaultValue={commentToEdit.content}
                            required
                        ></Input>
                    </FormGroup>
                    <FormGroup className="d-flex">
                        <Button className="btn bnt-primary m-2" type="submit">Submit</Button>
                        <button className="btn btn-danger m-2" type="button" onClick={() => history.push(`/comments/${postId}`)}>Nevermind</button>
                    </FormGroup>
                </Form>
            }

        </>
    )
}

export default EditComment;