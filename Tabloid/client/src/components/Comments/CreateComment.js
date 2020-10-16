import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, } from "reactstrap";
import { CommentContext } from "../../providers/CommentProvider";




const CreateComment = () => {

    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [currentUser, setCurrentUser] = useState();
    const history = useHistory();
    const { postId } = useParams();
    const { addComment } = useContext(CommentContext);


    const submitHandler = async (event) => {
        event.preventDefault();

        const newComment = {
            PostId: parseInt(postId, 10),
            UserProfileId: currentUser,
            Subject: subject,
            Content: content
        }
        await addComment(newComment)
        history.push(`/comments/${postId}`)
    };

    useEffect(() => {
        const user = JSON.parse(sessionStorage.userProfile);
        setCurrentUser(user.id);
    }, [])

    return (
        <div className="container">
            <div className="mt-2">
                <h2>Create New Comment</h2>
            </div>
            <hr />
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <Label for="subject">Subject:</Label>
                    <Input
                        id="subject"
                        onChange={(event) => setSubject(event.target.value)}
                        placeholder="ex. Mating habits of the Nicaraguan mountain parrot"
                        maxLength="255"
                        required
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="content">Content:</Label>
                    <Input
                        id="content"
                        type="textarea"
                        onChange={(event) => setContent(event.target.value)}
                        placeholder="Turns out parrots are gross 🦜"
                        required
                    ></Input>
                </FormGroup>
                <FormGroup className="d-flex justify-content-around">
                    <Button className="btn bnt-primary">Submit</Button>
                    <button className="btn btn-danger" type="button" onClick={() => history.push(`/comments/${postId}`)}>Nevermind</button>
                </FormGroup>
            </Form>
        </div>
    )
}


export default CreateComment;