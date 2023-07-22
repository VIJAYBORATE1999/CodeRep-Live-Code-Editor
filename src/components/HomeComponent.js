import { useState, useRef, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  CardBody,
  Card,
  CardTitle,
  CardText,
  CardGroup,
  Jumbotron,
} from "reactstrap";
import LoginRegisterModal from "./LoginRegisterModalComponent";

function Home() {
  const homeRef = useRef(null);
  const authentication = useSelector((state) => state.authentication);
  const [isLoginRegisterModalOpen, setIsLoginRegisterModalOpen] =
    useState(false);

  useLayoutEffect(() => {
    window.addEventListener("scroll", onScroll);

    function onScroll() {
      let reveals = homeRef.current.querySelectorAll(".reveal");
      for (let reveal of reveals) {
        let windowheight = window.innerHeight;
        let revealtop = reveal.getBoundingClientRect().top;
        let revealpoint = 100;
        if (revealtop < windowheight - revealpoint) {
          reveal.classList.add("active");
        } else {
          reveal.classList.remove("active");
        }
      }
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLoginRegisterModal = () => {
    setIsLoginRegisterModalOpen(!isLoginRegisterModalOpen);
  };

  return (
    <div className="home" ref={homeRef}>
      <LoginRegisterModal
        isModalOpen={isLoginRegisterModalOpen}
        toggleModal={toggleLoginRegisterModal}
      />
      <Jumbotron fluid className="bg-dark border-top border-secondary">
        <p className="text-white text-center">
          <span className="text-3d-white h1">CodeRep Live Code Editor</span>
        </p>
      </Jumbotron>
      <Container fluid>
        {authentication.isAuthenticated && (
          <Row className="mx-3 py-5 bg-warning text-center align-items-center">
            <Col sm={{ offset: "1", size: "4" }} className="p-3">
              <div className="fa-stack fa-5x">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-user fa-stack-1x fa-inverse"></i>
              </div>
            </Col>
            <Col sm="6" className="dark-hover">
              <div
                className="text-danger text-italic text-monospace"
                style={{ fontSize: "2rem" }}
              >
                Welcome @{authentication.username} !{" "}
                <span className="fa fa-hand-peace-o" />
              </div>
            </Col>
          </Row>
        )}
        <Row
          className={`m-3 p-3 align-items-center text-center 
            ${authentication.isAuthenticated ? "reveal bg-info" : "bg-warning "}
              `}
          style={{ fontSize: "calc(24px + 1.25vh)" }}
        >
          <Col xs="12" className="p-sm-5">
            <div>
              <p>Learning Together From the Comfort of Your Home</p>
            </div>
            <div>
              <span className="fa fa-leanpub" />
            </div>
            <div>
              <a
                href="#benefits"
                className="btn btn-lg button-hover  bg-white border border-dark rounded-0 mt-4"
              >
                Learn More
              </a>
            </div>
          </Col>
        </Row>
        {!authentication.isAuthenticated && (
          <Row className="mx-3 py-5 bg-info text-center align-items-center  reveal">
            <Col sm={{ offset: "1", size: "6" }} className="p-3 dark-hover">
              <div
                className="text-dark text-italic text-monospace"
                style={{ fontSize: "1.50rem" }}
              >
                Join CodeRep Today To Make Coding Fun!
              </div>
              <div role="button" onClick={toggleLoginRegisterModal}>
                <span className="fa-stack fa-2x pt-3">
                  <i className="fa fa-square fa-stack-2x"></i>
                  <i className="fa fa-user-plus fa-stack-1x fa-inverse"></i>
                </span>
              </div>
            </Col>
            <Col sm={{ offset: "1", size: "4" }} className="p-3">
              <div className="fa-stack fa-5x">
                <i className="fa fa-square fa-stack-2x"></i>
                <i className="fa fa-users fa-stack-1x fa-inverse"></i>
              </div>
            </Col>
          </Row>
        )}
        <Row className="m-3 py-5 bg-dark text-center align-items-center  reveal">
          <Col sm={{ offset: "1", size: "4" }} className="p-3">
            <span className="fa-stack fa-5x" style={{ color: "black" }}>
              <i className="fa fa-square fa-stack-2x"></i>
              <i className="fa fa-terminal fa-stack-1x fa-inverse"></i>
            </span>
          </Col>
          <Col sm="6" className="p-3 white-hover">
            <div
              className="text-italic text-monospace"
              style={{ fontSize: "1.50rem", color: "white" }}
            >
              Create You Own Editor Today !
            </div>
            <Link
              to="/editor/untitled"
              className="text-decoration-none text-reset stretched-link"
            >
              <span className="fa-stack fa-2x pt-3" style={{ color: "black" }}>
                <i className="fa fa-square fa-stack-2x fa-spin"></i>
                <i className="fa fa-keyboard-o fa-stack-1x fa-inverse"></i>
              </span>
            </Link>
          </Col>
        </Row>
        <Row className="p-3 align-items-center  reveal" id="benefits">
          <Col xs="12">
            <div className="designer-block">
              <h4>Our Platform Benefits</h4>
            </div>
          </Col>
          <Col>
            <CardGroup>
              <Card className="border-0 bg-light p-3 reveal">
                <CardText className="text-center">
                  <svg
                    data-bbox="20 20 160 160"
                    viewBox="20 20 160 160"
                    height="150"
                    width="150"
                    xmlns="http://www.w3.org/2000/svg"
                    data-type="color"
                    aria-hidden="true"
                  >
                    <defs />
                    <g fill="#000016">
                      <path
                        d="M180 180H20V20h160v160zm-154.775-5.225h149.549V25.225H25.225v149.55z"
                        data-color="1"
                      />
                      <path
                        d="M35.519 35.467v129.327h129.327V35.467H35.519zm124.102 26.189a37.305 37.305 0 00-8.465-12.894 37.364 37.364 0 00-12.083-8.069h20.548v20.963zm-63.642 38.503c-5.722 4.718-12.837 7.294-20.351 7.314h-.084c-7.539 0-14.684-2.579-20.431-7.317 5.722-4.718 12.837-7.294 20.351-7.314h.084c7.539 0 14.684 2.578 20.431 7.317zM92.58 75.367c-.02-7.919 2.842-15.182 7.588-20.808 4.875 5.772 7.546 12.999 7.565 20.643.02 7.7-2.654 14.99-7.568 20.807-4.71-5.583-7.565-12.783-7.585-20.642zm7.588 28.937c4.875 5.772 7.546 12.999 7.565 20.643.02 7.919-2.842 15.182-7.588 20.807-4.875-5.772-7.546-12.999-7.565-20.643-.02-7.918 2.842-15.181 7.588-20.807zm4.194-4.146a32.034 32.034 0 0120.324-7.317h.084c7.533 0 14.672 2.574 20.416 7.304-5.539 4.557-12.62 7.307-20.336 7.326h-.083a32.031 32.031 0 01-20.405-7.313zm20.311-12.542a37.188 37.188 0 00-15.091 3.232 37.283 37.283 0 003.377-15.66c-.023-9.043-3.241-17.581-9.1-24.347 5.609-4.805 12.88-7.725 20.827-7.745h.083c17.71 0 32.142 14.385 32.187 32.106.021 8.149-3.01 15.602-8.005 21.292-6.779-5.758-15.295-8.879-24.278-8.878zm-24.501-40.487a37.247 37.247 0 00-10.354-6.436h20.734a37.54 37.54 0 00-10.38 6.436zm-3.694 3.714c-5.698 6.586-9.147 15.166-9.124 24.537a37.299 37.299 0 003.368 15.443 37.305 37.305 0 00-15.175-3.207h-.098c-8.933.023-17.374 3.162-24.1 8.885-5.145-5.85-7.972-13.271-7.992-21.135-.045-17.749 14.357-32.225 32.106-32.27 7.775-.033 15.161 2.718 21.015 7.747zm-48.875 49.312a37.24 37.24 0 00-6.858 11.113V89.045a37.233 37.233 0 006.858 11.11zm3.747 3.656c6.755 5.748 15.232 8.888 24.193 8.887h.098a37.31 37.31 0 0015.112-3.22 37.164 37.164 0 00-3.398 15.648c.023 9.043 3.241 17.581 9.1 24.347-5.609 4.805-12.88 7.725-20.827 7.745h-.084c-8.566 0-16.625-3.326-22.7-9.369-6.095-6.064-9.464-14.138-9.486-22.736-.021-7.921 2.807-15.407 7.992-21.302zm48.806 49.387a37.275 37.275 0 0010.208 6.371H89.945a37.246 37.246 0 0010.211-6.371zm24.61 4.02c-7.755 0-15.089-2.734-20.916-7.734 5.91-6.821 9.133-15.438 9.109-24.549a37.299 37.299 0 00-3.368-15.443 37.305 37.305 0 0015.175 3.207h.098c9.181-.023 17.586-3.375 24.089-8.898 5.152 5.853 7.984 13.279 8.004 21.148.045 17.748-14.357 32.225-32.106 32.27l-.085-.001zm27.932-57.073a37.519 37.519 0 006.923-11.268v22.518a37.24 37.24 0 00-6.923-11.25zM61.246 40.692a37.347 37.347 0 00-12.223 8.204 37.327 37.327 0 00-8.278 12.621V40.692h20.501zm-20.502 98.047a37.612 37.612 0 0020.429 20.83H40.744v-20.83zm98.39 20.83a37.611 37.611 0 0020.487-20.963v20.963h-20.487z"
                        data-color="1"
                      />
                    </g>
                  </svg>
                </CardText>
                <CardBody className="text-center">
                  <CardTitle className="font-weight-bold" tag="h4">
                    Expert Developers
                    <hr className="bg-secondary" />
                  </CardTitle>
                  <CardText
                    style={{ lineHeight: "1.5rem", letterSpacing: "0.0625rem" }}
                  >
                    Professional and expert developers share their problems and
                    assessing their level of understanding and progress, and
                    they provide much more relevant, useful feedback. We are
                    always working to provide them with a valuable place to
                    work.
                  </CardText>
                </CardBody>
              </Card>
              <Card className="border-0 bg-light p-3 reveal">
                <CardText className="text-center">
                  <svg
                    data-bbox="20 20 160 160"
                    viewBox="20 20 160 160"
                    height="150"
                    width="150"
                    xmlns="http://www.w3.org/2000/svg"
                    data-type="color"
                    aria-hidden="true"
                  >
                    <defs />
                    <g fill="#000016">
                      <path
                        d="M20 20v160h160V20H20zm154.774 154.775H25.225V25.225h149.549v149.55z"
                        data-color="1"
                      />
                      <path
                        d="M164.742 35.467H35.467v129.275h129.275V35.467zm-28.723 61.711c-.179-7.742-1.169-15.23-2.892-22.167 2.63 1.043 5.128 2.209 7.451 3.508 9.232 5.164 14.755 11.712 15.85 18.659h-20.409zm-5.225 0h-27.939l.039-28.014c8.611.247 16.858 1.541 24.27 3.77 2.177 7.419 3.423 15.656 3.63 24.244zm-27.893-33.242l.029-20.761c6.887 1.155 13.373 6.668 18.497 15.828 1.383 2.472 2.616 5.141 3.708 7.959-6.946-1.773-14.458-2.811-22.234-3.026zm-5.195-20.791l-.029 20.778c-7.789.152-15.329 1.122-22.315 2.837 1.073-2.743 2.279-5.345 3.629-7.757 5.176-9.257 11.746-14.784 18.715-15.858zm-.037 26.002l-.039 28.031H69.624c.209-8.676 1.476-16.995 3.695-24.474 7.457-2.159 15.73-3.38 24.35-3.557zM64.398 97.178h-21.14c1.095-6.947 6.618-13.495 15.85-18.659 2.561-1.432 5.331-2.707 8.262-3.827-1.773 7.026-2.791 14.626-2.972 22.486zm.001 5.225c.188 7.823 1.206 15.387 2.97 22.382-2.931-1.12-5.701-2.395-8.262-3.828-9.185-5.138-14.702-11.646-15.836-18.554h21.128zm5.226 0h27.998l-.039 27.925c-8.589-.183-16.832-1.404-24.265-3.556-2.21-7.448-3.477-15.73-3.694-24.369zm27.951 33.151l-.029 20.755c-6.909-1.133-13.418-6.65-18.557-15.836-1.349-2.412-2.555-5.012-3.628-7.754 6.956 1.707 14.461 2.677 22.214 2.835zm5.196 20.769l.029-20.778c7.811-.208 15.357-1.247 22.334-3.027-1.092 2.817-2.325 5.485-3.707 7.956-5.164 9.229-11.71 14.752-18.656 15.849zm.037-26.006l.039-27.914h27.945c-.214 8.551-1.461 16.75-3.629 24.14-7.436 2.237-15.714 3.532-24.355 3.774zm33.209-27.914h20.396c-1.134 6.908-6.651 13.417-15.836 18.554-2.323 1.299-4.821 2.466-7.452 3.509 1.716-6.906 2.706-14.358 2.892-22.063zm7.111-28.443c-3.596-2.012-7.555-3.742-11.791-5.173-1.466-4.439-3.253-8.586-5.35-12.335-2.367-4.231-5.032-7.78-7.914-10.628 8.321 2.746 15.956 7.396 22.348 13.756 6.615 6.581 11.411 14.499 14.158 23.145-2.971-3.211-6.805-6.167-11.451-8.765zm-68.7-17.508c-2.056 3.675-3.817 7.731-5.267 12.072-4.541 1.482-8.781 3.297-12.605 5.436-4.246 2.375-7.805 5.05-10.657 7.944 2.756-8.232 7.379-15.785 13.68-22.119 6.51-6.543 14.331-11.303 22.867-14.065-2.922 2.864-5.623 6.45-8.018 10.732zm-17.872 69.067c3.825 2.139 8.065 3.954 12.606 5.437 1.45 4.34 3.21 8.394 5.266 12.068 2.719 4.861 5.831 8.826 9.215 11.85-8.91-2.665-17.081-7.5-23.859-14.244-6.684-6.651-11.515-14.665-14.247-23.417 2.908 3.034 6.596 5.832 11.019 8.306zm69.431 17.505c2.096-3.748 3.883-7.893 5.349-12.331 4.236-1.432 8.196-3.162 11.792-5.174 4.835-2.705 8.785-5.799 11.803-9.163-2.652 8.99-7.507 17.236-14.303 24.067-6.736 6.77-14.868 11.646-23.751 14.358 3.344-3.012 6.419-6.946 9.11-11.757zm33.528-62.022c-3.005-9.383-8.222-17.978-15.407-25.126-7.11-7.074-15.628-12.211-24.911-15.184h40.318v40.31zm-78.512-40.31c-9.384 3.005-17.98 8.222-25.129 15.408-7.074 7.11-12.211 15.628-15.183 24.913v-40.32h40.312zm-40.312 78.513c3.005 9.384 8.222 17.98 15.408 25.129 7.11 7.074 15.626 12.211 24.909 15.183H40.692v-40.312zm78.513 40.312c9.384-3.005 17.98-8.222 25.129-15.408 7.074-7.11 12.209-15.627 15.182-24.91v40.318h-40.311z"
                        data-color="1"
                      />
                    </g>
                  </svg>
                </CardText>
                <CardBody className="text-center">
                  <CardTitle className="font-weight-bold" tag="h4">
                    Online Community
                    <hr className="bg-secondary" />
                  </CardTitle>
                  <CardText
                    style={{ lineHeight: "1.5rem", letterSpacing: "0.0625rem" }}
                  >
                    Feel like home, with a "family of invisible friends over the
                    internet" , who are constanty sharing their work with others
                    to provide them with a good and friendly learning
                    environment.
                  </CardText>
                </CardBody>
              </Card>
              <Card className="border-0 bg-light p-3 reveal">
                <CardText className="text-center">
                  <svg
                    data-bbox="20 20 160 160"
                    viewBox="20 20 160 160"
                    height="150"
                    width="150"
                    xmlns="http://www.w3.org/2000/svg"
                    data-type="color"
                    aria-hidden="true"
                  >
                    <defs />
                    <g fill="#000016">
                      <path
                        d="M20 20v160h160V20H20zm154.798 154.798H25.202V25.202h149.597v149.596z"
                        data-color="1"
                      />
                      <path
                        d="M164.76 35.449H35.501v129.259H164.76V35.449zm-5.202 70.637h-52.797l52.797-45.759v45.759zm-56.853-3.367V56.983h52.77l-52.77 45.736zm-5.202.484l-54.064-46.22h54.064v46.22zm-4.632 2.883H40.702V61.487l52.169 44.599zm-52.169 5.201h52.116l-52.116 45.168v-45.168zm56.801 2.823v45.396H45.125l52.378-45.396zm5.202.383l52.653 45.013h-52.653v-45.013zm4.255-3.206h52.598v44.966l-52.598-44.966zm52.598-70.637v11.131H40.702V40.65h118.856z"
                        data-color="1"
                      />
                    </g>
                  </svg>
                </CardText>
                <CardBody className="text-center">
                  <CardTitle className="font-weight-bold" tag="h4">
                    Learn Professionalism
                    <hr className="bg-secondary" />
                  </CardTitle>
                  <CardText
                    style={{ lineHeight: "1.5rem", letterSpacing: "0.0625rem" }}
                  >
                    Being a learner you can adapt to industry standards by using
                    best practices and careful consideration of how people learn
                    and retain information with the ongoing tech trends in the
                    professional domain.
                  </CardText>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="12" className="text-center p-0">
            <hr className="bg-danger border-secondary border-bottom m-0 p-2"></hr>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
