import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  checkLoginValidity,
  fetchEditors,
  fetchUsers,
} from "../redux/ActionCreators";
import Home from "./HomeComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Editor from "./EditorComponent";
import Explore from "./ExploreComponent";
import User from "./UserComponent";

function Main() {
  const editors = useSelector((state) => state.editors);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginValidity());
    dispatch(fetchEditors());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="main">
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route
          exact
          path="/editor/untitled"
          component={() => <Editor untitled={true} />}
        />
        <Route
          exact
          path="/editor/:editorId"
          component={({ match }) => (
            <Editor
              untitled={false}
              editor={
                editors.editors.filter(
                  (editor) => editor._id === match.params.editorId
                )[0]
              }
              isLoading={editors.isLoading}
              errMess={editors.errMess}
            />
          )}
        />
        <Route
          exact
          path="/explore"
          component={() => (
            <Explore
              editors={editors.editors}
              isLoading={editors.isLoading}
              errMess={editors.errMess}
            />
          )}
        />
        <Route
          exact
          path="/user/:username"
          component={({ match }) => (
            <User
              user={
                users.users.filter((user) => {
                  return user.username === match.params.username;
                })[0]
              }              
              isLoading={users.isLoading}
              errMess={users.errMess}
            />
          )}
        />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
  );
}

export default Main;
