import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
  const authentication = useSelector((state) => state.authentication);
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="justify-content-center bg-dark p-3">
          <Col xs="6" md={{ offset: 1, size: "3" }}>
            <h5>Links</h5>
            <ul className="list-unstyled d-flex flex-column h-75 justify-content-around">
              <li>
                <Link to="/home">
                  <span className="fa fa-home" /> Home
                </Link>
              </li>
              <li>
                <Link to="/explore">
                  <span className="fa fa-compass" /> Explore
                </Link>
              </li>
              {authentication.isAuthenticated && (
                <li>
                  <Link to={`/user/${authentication.username}`}>
                    <span className="fa fa-id-card" /> Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link to="/editor/untitled">
                  <span className="fa fa-code" /> Create Editor
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs="6" md="4">
            <h5>Tags</h5>
            <ul className="list-unstyled">
              <li>Fronted Online</li>
              <li>Online Editor</li>
              <li>On The Go Demo</li>
              <li>Code Sandbox</li>
            </ul>
          </Col>
          <Col xs="12" md="3" className="align-self-center">
            <div className="text-center d-flex justify-content-around">
              <a
                className="btn btn-social-icon btn-google"
                href="http://google.com/+"
              >
                <i className="fa fa-google-plus"></i>
              </a>
              <a
                className="btn btn-social-icon btn-facebook"
                href="http://www.facebook.com/profile.php?id="
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                className="btn btn-social-icon btn-linkedin"
                href="http://www.linkedin.com/in/"
              >
                <i className="fa fa-linkedin"></i>
              </a>
              <a
                className="btn btn-social-icon btn-twitter"
                href="http://twitter.com/"
              >
                <i className="fa fa-twitter"></i>
              </a>
              <a
                className="btn btn-social-icon btn-google"
                href="http://youtube.com/"
              >
                <i className="fa fa-youtube"></i>
              </a>
              <a className="btn btn-social-icon" href="mailto:">
                <i className="fa fa-envelope-o"></i>
              </a>
            </div>
          </Col>
        </Row>
        <Row className="bg-danger">
          <Col className="text-center pt-2">
            <p className="text-light">© Copyright - CodeRep Developers</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
