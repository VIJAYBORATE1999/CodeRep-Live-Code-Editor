import { Alert, Col, Container, Input, Row } from "reactstrap";
import { useSelector } from "react-redux";
import Loading from "./LoadingComponent";
import Explore from "./ExploreComponent";

function User({ user, isLoading, errMess }) {
  const editors = useSelector((state) => state.editors);
  const authentication = useSelector((state) => state.authentication);
  const ownsEditors = user
    ? editors.editors.filter(
        (editor) => editor.owner.username === user.username
      )
    : [];

  const userName = user ? user.username : "";
  const fullName = user ? user.fullName : "";
  const description =
    user && user.description ? user.description : "No Description About User";
  const email = user ? user.email : "";
  const createdAt = user
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "long",
        timeZoneName: "long",
      }).format(new Date(Date.parse(user.createdAt)))
    : "";
  const updatedAt = user
    ? new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        weekday: "long",
        timeZoneName: "long",
      }).format(new Date(Date.parse(user.updatedAt)))
    : "";

  if (isLoading) {
    return <Loading />;
  } else if (errMess != null) {
    return (
      <Alert color="danger" className="p-5 m-5 h5 text-center">
        {errMess}
      </Alert>
    );
  } else if (user == null) {
    return (
      <Alert color="danger" className="p-5 m-5 h5 text-center">
        No Such User
      </Alert>
    );
  } else {
    return (
      <div className="user">
        <Container fluid>
          <Row className="bg-light">
            <Col xs="12" className="px-0 pb-3">
              <p className="py-3 m-0 text-center h5 bg-dark text-white">
                <span className="fa fa-id-card" />{" "}
                <b>
                  {user.username === authentication.username ? "Your" : "User"}{" "}
                  Profile Details :
                </b>
                <hr className="mt-2 bg-white" />
              </p>
            </Col>
            <Col xs="12" className="px-5 py-5">
              <p>
                <span className="fa fa-user" /> Username : {userName}
              </p>
              <p>
                <span className="fa fa-user-circle-o" /> Full Name : {fullName}
              </p>
              <p>
                <span className="fa fa-envelope" /> Email : {email}
              </p>
              <Container fluid className="p-0 my-3">
                <Row>
                  <Col xs="12" md="auto" className="mb-2">
                    <span className="fa fa-list-alt" /> Description :{" "}
                  </Col>
                  <Col xs="12" md="10">
                    <Input
                      type="textarea"
                      value={description}
                      rows="5"
                      readOnly
                    />
                  </Col>
                </Row>
              </Container>
              <p>
                <span className="fa fa-calendar" />{" "}
                <span>Profile Updated At : {updatedAt}</span>
              </p>
              <p>
                <span className="fa fa-calendar" />{" "}
                <span> Profile Created At : {createdAt}</span>
              </p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" className="p-0">
              <p className="p-3 m-0 text-center h5 bg-dark text-white">
                Editors Owned By{" "}
                {user.username === authentication.username ? "You" : "User"}{" "}
              </p>
              <hr className="bg-light my-0" />
            </Col>
            <Col xs="12" className="p-0">
              <Explore
                editors={ownsEditors}
                isLoading={editors.isLoading}
                errMess={editors.errMes}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default User;
