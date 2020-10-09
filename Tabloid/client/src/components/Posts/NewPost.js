import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Form, FormGroup, Col, Label, Input } from "reactstrap";
import { PostContext } from "../../providers/PostProvider";

const NewPost = (props) => {

    const { saveNewPost, categories, getCategories } = useContext(PostContext);

    const [newPost, setNewPost] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    const handleFieldChange = (evt) => {
        const stateToUpdate = { ...newPost };
        stateToUpdate[evt.target.name] = evt.target.value;
        setNewPost(stateToUpdate);
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Container>
            <div>
                <h1>Create a New Post</h1>
            </div>
            <Form>
                <FormGroup row>
                    <Label for="title" sm={2}>Title</Label>
                    <Col sm={10}>
                        <Input type="text" name="title" id="title" placeholder="Title your post" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="content" sm={2}>Post Content</Label>
                    <Col sm={10}>
                        <Input type="textarea" name="content" id="content" placeholder="Say what you want to say here..." />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="imageLocation" sm={2}>Image URL (optional)</Label>
                    <Col sm={10}>
                        <Input type="url" name="imageLocation" id="imageLocation" placeholder="https://website.com/mypic" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="publishDateTime" sm={2}>Date to Publish</Label>
                    <Col sm={10}>
                        <Input type="date" name="publishDateTime" id="publishDateTime" />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="categoryId" sm={2}>Category</Label>
                    <Col sm={10}>
                        <Input type="select" name="categoryId" id="categoryId">
                            {categories.map(category =>
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )}
                        </Input>
                    </Col>
                </FormGroup>
            </Form>
        </Container>
    )


}

export default NewPost;