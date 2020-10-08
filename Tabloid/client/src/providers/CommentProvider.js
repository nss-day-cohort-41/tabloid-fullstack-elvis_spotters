import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const CommentContext = createContext();

export const CommentProvider = (props) => {

    const [comments, setComments] = useState([]);


};