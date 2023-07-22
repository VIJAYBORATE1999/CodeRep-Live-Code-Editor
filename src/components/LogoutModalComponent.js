import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/ActionCreators";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

function LogoutModal({ isModalOpen, toggleModal }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toggleModal();
  };

  return (
    <div className="logout_modal">
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Logout</ModalHeader>
        <ModalBody>Are You Sure You Want To Logout?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleLogout}>
            Confirm Logout
          </Button>
          <Button color="dark" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default LogoutModal;
