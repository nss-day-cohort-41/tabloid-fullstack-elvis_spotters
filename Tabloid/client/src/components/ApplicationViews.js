import React, { useContext } from "react";
import { Switch, Route, Redirect, useHistory, withRouter } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { PostProvider } from "../providers/PostProvider";
import { CategoryProvider } from "../providers/CategoryProvider"
import Login from "./Login";
import Register from "./Register";
import Categories from "./Categories/Categories";
import PostList from "./Posts/PostList";
import PostDetails from "./Posts/PostDetails"
import NewPost from "./Posts/NewPost";
import TagList from "./Tags/TagList";
import { TagProvider } from "../providers/TagProvider";
import NotFound from "./NotFound"
import CreateCategory from "./Categories/CreateCategory";
import EditCategory from "./Categories/EditCategory";
import DeleteCategory from "./Categories/DeleteCategory";

function ApplicationViews(props) {
  //Add Views to this array, follow the pattern
  const appViews = [
    {
      name: "Categories",
      provider: CategoryProvider,
      component: withRouter(Categories),
      path: "/category",
      to: "/login"
    },
    {
      name: "CreateCategories",
      provider: CategoryProvider,
      component: withRouter(CreateCategory),
      path: "/category/create",
      to: "/login"
    },
    {
      name: "EditCategory",
      provider: CategoryProvider,
      component: withRouter(EditCategory),
      path: "/category/edit/:id",
      to: "/login"
    },
    {
      name: "Post",
      provider: PostProvider,
      component: withRouter(PostList),
      path: "/post",
      to: "/login"
    },
    {
      name: "PostDetails",
      provider: PostProvider,
      component: withRouter(PostDetails),
      path: "/post/:id/details",
      to: "/login"
    },
    {
      name: "NewPost",
      provider: PostProvider,
      component: NewPost,
      path: "/post/new",
      to: "/login"
    },
    {
      name: "DeleteCategory",
      provider: CategoryProvider,
      component: withRouter(DeleteCategory),
      path: "/category/delete/:id",
      to: "/login"

    },
    {
      name: "Tags",
      provider: TagProvider,
      component: withRouter(TagList),
      path: "/tags",
      to: "/login"
    },
    {
      name: "Default",
      provider: PostProvider,
      component: withRouter(PostList),
      path: "/",
      to: "/login"
    }
  ]
  const { isLoggedIn } = useContext(UserProfileContext);
  //Mapping object array "AppViews" into an array of Routes and Components
  const routes = appViews.map((ele, index) => {
    return (
      <Route key={index} path={ele.path} exact>
        <ele.provider>
          {isLoggedIn ? <ele.component props={props} /> : <Redirect to={ele.to} />}
        </ele.provider>
      </Route >
    )
  })
  return (
    <main>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        {routes}

        <Route component={NotFound} />
      </Switch>
    </main>
  );
};

export default withRouter(ApplicationViews);
