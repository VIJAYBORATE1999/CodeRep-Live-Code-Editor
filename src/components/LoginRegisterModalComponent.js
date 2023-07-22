import { useState } from "react";
import LoginForm from "./LoginFormComponent";
import {
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import RegisterForm from "./RegisterFormComponent";

function LoginRegisterModal({ isModalOpen, toggleModal }) {
  const [activeTab, setActiveTab] = useState("loginTab");

  const toggleTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="login_register_modal">
      <Modal
        isOpen={isModalOpen}
        toggle={toggleModal}
        size="lg"
      >
        <ModalHeader
          toggle={toggleModal}
          className="bg-light border-0 pb-0"
        ></ModalHeader>
        <ModalBody className="bg-light">
          <Nav tabs fill>
            <NavItem>
              <NavLink
                className={
                  activeTab === "loginTab"
                    ? "active text-dark"
                    : "text-secondary"
                }
                onClick={() => toggleTab("loginTab")}
              >
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={
                  activeTab === "registerTab"
                    ? "active text-dark"
                    : "text-secondary"
                }
                onClick={() => toggleTab("registerTab")}
              >
                Register
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab} className="p-3 bg-white">
            <TabPane tabId="loginTab">
              <LoginForm toggleModal={toggleModal} />
            </TabPane>
            <TabPane tabId="registerTab">
              <RegisterForm toggleModal={toggleModal} />
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginRegisterModal;
