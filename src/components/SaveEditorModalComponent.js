import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  saveEditor,
  updateEditor,
  editorFormStateReset,
} from "../redux/ActionCreators";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Col,
} from "reactstrap";

function SaveEditorModal({
  isModalOpen,
  toggleModal,
  previousEditorData,
  editorInputData,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const authentication = useSelector((state) => state.authentication);
  const editors = useSelector((state) => state.editors);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: previousEditorData ? previousEditorData.name : "",
      description: previousEditorData ? previousEditorData.description : "",
    },
  });

  const { ref: nameRef, ...nameRest } = register("name", {
    required: true,
    maxLength: "50",
  });

  const { ref: descriptionRef, ...descriptionRest } = register("description", {
    maxLength: "500",
  });

  const handleSaveEditor = (formData) => {
    let editorData = { ...formData, ...editorInputData };
    if (previousEditorData) {
      dispatch(updateEditor(previousEditorData._id, editorData));
    } else {
      dispatch(saveEditor(editorData));
    }
  };

  useEffect(() => {
    if (editors.editorFormSuccess) {
      alert("Editor Saved Successfully !");
      history.push("/editor/" + editors.lastSavedOrUpdatedEditorId);
      dispatch(editorFormStateReset());
    } else if (editors.editorFormErrMess) {
      alert(editors.editorFormErrMess);
      dispatch(editorFormStateReset());
    }
  }, [
    editors.editorFormSuccess,
    editors.editorFormErrMess,
    editors.lastSavedOrUpdatedEditorId,
    dispatch,
    history,
  ]);

  return (
    <div className="save_editor_modal">
      <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Save editor</ModalHeader>
        <ModalBody>
          {!authentication.isAuthenticated && (
            <div className="p-5 text-center">
              <span className="text-danger h5">
                You are not logged in. Please Login First !
              </span>
            </div>
          )}
          <Form
            onSubmit={handleSubmit(handleSaveEditor)}
            className={!authentication.isAuthenticated ? "d-none" : ""}
          >
            <FormGroup row>
              <Label sm="3" htmlFor="name">
                <span className="fa fa-user" /> Name
                <span style={{ color: "red" }}>*</span> :
              </Label>
              <Col sm="9">
                <Input
                  type="text"
                  name="name"
                  invalid={errors.name ? true : false}
                  innerRef={nameRef}
                  {...nameRest}
                />
                {errors.name && (
                  <FormFeedback invalid>
                    {errors.name.type === "required" && (
                      <span>Name Is Required!</span>
                    )}
                    {errors.name.type === "maxLength" && (
                      <span>Name Can Contain Maximum 50 Characters!</span>
                    )}
                  </FormFeedback>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm="3" htmlFor="description">
                <span className="fa fa-list-alt" /> Description :
              </Label>
              <Col sm="9">
                <Input
                  type="textarea"
                  rows="6"
                  name="description"
                  invalid={errors.description ? true : false}
                  innerRef={descriptionRef}
                  {...descriptionRest}
                />
                {errors.description && (
                  <FormFeedback invalid>
                    {errors.description.type === "maxLength" && (
                      <span>
                        Description Can Contain Maximum 500 Characters!
                      </span>
                    )}
                  </FormFeedback>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ offset: "6", size: "3" }} className="p-2">
                <Button
                  block
                  type="button"
                  color="dark"
                  onClick={() => reset()}
                  disabled={!isDirty}
                >
                  Reset
                </Button>
              </Col>
              <Col sm="3" className="p-2">
                <Button block type="submit" color="success" disabled={!isValid}>
                  Save
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SaveEditorModal;
