import React, { useContext } from "react";
import { Switch, Route, Redirect, useHistory, withRouter } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ProfileProvider } from "../providers/ProfileProvider";
import { PostProvider } from "../providers/PostProvider";
import { CategoryProvider } from "../providers/CategoryProvider";
import { CommentProvider } from "../providers/CommentProvider";
import Login from "./Login";
import Register from "./Register";
import Categories from "./Categories/Categories";
import Homepage from "./Posts/Homepage";
import PostList from "./Posts/PostList";
import MyPosts from "./Posts/MyPosts";
import PostDetails from "./Posts/PostDetails"
import NewPost from "./Posts/NewPost";
import EditPost from "./Posts/EditPost";
import DeletePost from "./Posts/DeletePost";
import TagList from "./Tags/TagList";
import CommentList from "./Comments/CommentList";
import CreateComment from "./Comments/CreateComment";
import DeleteComment from "./Comments/DeleteComment";
import EditComment from "./Comments/EditComment";
import { TagProvider } from "../providers/TagProvider";
import NotFound from "./NotFound"
import CreateCategory from "./Categories/CreateCategory";
import EditCategory from "./Categories/EditCategory";
import DeleteCategory from "./Categories/DeleteCategory";
import UserProfiles from "./UserProfile/UserProfiles";
import UserProfilesInActive from "./UserProfile/UserProfilesInActive";
import { PostTagProvider } from "../providers/PostTagProvider";
import AddPostTag from "./Tags/AddPostTag";
import UserDetails from "./UserProfile/UserDetails";
import UserEdit from "./UserProfile/UserEdit";

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
      name: "MyPosts",
      provider: PostProvider,
      component: withRouter(MyPosts),
      path: "/post/my",
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
      name: "EditPost",
      provider: PostProvider,
      component: withRouter(EditPost),
      path: "/post/:id/edit",
      to: "/login"
    },
    {
      name: "DeletePost",
      provider: PostProvider,
      component: withRouter(DeletePost),
      path: "/post/:id/delete",
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
      name: "AddPostTag",
      provider: PostTagProvider,
      component: withRouter(AddPostTag),
      path: "/post/tags/:id",
      to: "/login"
    },
    {
      name: "Default",
      provider: PostProvider,
      component: withRouter(Homepage),
      path: "/",
      to: "/login"
    },
    {
      name: "Comments",
      provider: CommentProvider,
      component: withRouter(CommentList),
      path: "/comments/:postId",
      to: "/login"
    },
    {
      name: "Add Comment",
      provider: CommentProvider,
      component: withRouter(CreateComment),
      path: "/comments/:postId/create",
      to: "/login"
    },
    {
      name: "Delete Comment",
      provider: CommentProvider,
      component: withRouter(DeleteComment),
      path: "/comments/:postId/delete/:commentId",
      to: "/login"
    },
    {
      name: "Edit Comment",
      provider: CommentProvider,
      component: withRouter(EditComment),
      path: "/comments/:postId/edit/:commentId",
      to: "/login"
    },
    {
      name: "UserProfile",
      provider: ProfileProvider,
      component: withRouter(UserDetails),
      path: "/userprofiles/details/:id",
      to: "/login"
    },
    {
      name:"UserProfile",
      provider:ProfileProvider,
      component:withRouter(UserProfiles),
      path:"/userprofiles/active",
      to:"/login"
    },
    {
      name:"UserProfile",
      provider:ProfileProvider,
      component:withRouter(UserProfilesInActive),
      path:"/userprofiles/inactive",
      to:"/login"
    },
    {
      name: "UserProfile",
      provider: ProfileProvider,
      component: withRouter(UserProfiles),
      path: "/userprofiles",
      to: "/login"
    },
    {
      name: "UserProfileDetails",
      provider: ProfileProvider,
      component: withRouter(UserEdit),
      path: "/userprofiles/edit/:id",
      to: "/login"
    },
  ]
  const { isLoggedIn } = useContext(UserProfileContext);
  //Mapping object array "AppViews" into an array of Routes and Components
  const routes = appViews.map((ele, index) => {
    return (
      <Route key={index} path={ele.path} exact>
        <ele.provider>
          {isLoggedIn ? <ele.component /> : <Redirect to={ele.to} />}
        </ele.provider>
      </Route>
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
