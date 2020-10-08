import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { PostProvider } from "../providers/PostProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import Categories from "./Categories/Categories";
import PostList from "./Posts/PostList";
import TagList from "./Tags/TagList";
import { TagProvider } from "../providers/TagProvider";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <PostProvider>
            {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
          </PostProvider>
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/category" component={Categories} />
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/tags" exact>
          <TagProvider>
            {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
          </TagProvider>
        </Route>

        <Route path="/post">
          {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </main>
  );
};
