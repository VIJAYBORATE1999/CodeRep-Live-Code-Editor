import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
  createRating,
  updateRating,
  ratingFormStateReset,
} from "../redux/ActionCreators";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";
import Loading from "./LoadingComponent";

function SaveRatingModal({ isModalOpen, toggleModal, editorId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const authentication = useSelector((state) => state.authentication);
  const editors = useSelector((state) => state.editors);
  const [previousRatingValue, setPreviousRatingValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid, isDirty },
  } = useForm({
    mode: "onChange",
  });

  const { ref: ratingRef, ...ratingRest } = register("rating", {
    required: true,
    min: 0,
    max: 5,
  });

  const handleSaveRating = (formData) => {
    let ratingValue = formData.rating;
    if (previousRatingValue === "") {
      dispatch(createRating(editorId, Number(ratingValue)));
    } else {
      dispatch(
        updateRating(editorId, Number(ratingValue), Number(previousRatingValue))
      );
    }
  };

  useEffect(() => {
    const checkIfRated = () => {
      const bearer = "Bearer " + authentication.token;
      setIsLoading(true);
      axios({
        method: "get",
        url: baseUrl + "editors/" + editorId + "/rating",
        headers: {
          Authorization: bearer,
        },
      })
        .then((response) => {
          setIsLoading(false);
          if (response.data.success) {
            setPreviousRatingValue(response.data.rating.ratingValue);
            setValue("rating", response.data.rating.ratingValue.toString());
          } else {
            var error = new Error("Error " + response.data.status);
            error.response = response;
            throw error;
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) {
            if (error.response.data.status === "Rating Not Found!") {
              setPreviousRatingValue("");
            } else if (error.response.status === 401) {
              setPreviousRatingValue("");
            } else {
              alert("Error: " + error.response.data.err);
            }
          } else if (error.request) {
            alert("Error: Connection Failure!");
          }
        });
    };

    if (isModalOpen) checkIfRated();
  }, [authentication.token, editorId, isModalOpen, setValue]);

  useEffect(() => {
    if (editors.ratingFormSuccess) {
      alert("Rating Saved Successfully !");
      history.push("/editor/" + editors.lastSavedOrUpdatedEditorId);
      dispatch(ratingFormStateReset());
    } else if (editors.ratingFormErrMess) {
      alert(editors.ratingFormErrMess);
      dispatch(ratingFormStateReset());
    }
  }, [
    editors.ratingFormSuccess,
    editors.ratingFormErrMess,
    editors.lastSavedOrUpdatedEditorId,
    previousRatingValue,
    dispatch,
    history,
  ]);

  return (
    <div className="save_editor_modal">
      <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>
          {previousRatingValue === "" ? (
            <span>Create Rating</span>
          ) : (
            <span>Update Rating</span>
          )}
        </ModalHeader>
        <ModalBody>
          {!authentication.isAuthenticated && (
            <div className="p-5 text-center">
              <span className="text-danger h5">
                You are not logged in. Please Login First !
              </span>
            </div>
          )}
          {isLoading && <Loading />}
          <Form
            onSubmit={handleSubmit(handleSaveRating)}
            className={!authentication.isAuthenticated ? "d-none" : ""}
          >
            <FormGroup row className="p-3 text-center">
              <Label sm={{ offset: "2", size: "4" }} htmlFor="rating">
                <span className="h5">
                  <span className="fa fa-star text-warning" /> Rating
                  <span style={{ color: "red" }}>*</span> :
                </span>
              </Label>
              <Col sm="5" className="rating_container">
                <div className="rating_container d-flex justify-content-center flex-row-reverse">
                  <Input
                    type="radio"
                    id="star5"
                    name="rating"
                    value="5"
                    innerRef={ratingRef}
                    {...ratingRest}
                  />
                  <Label htmlFor="star5" title="5 Stars">
                    5
                  </Label>
                  <Input
                    type="radio"
                    id="star4"
                    name="rating"
                    value="4"
                    innerRef={ratingRef}
                    {...ratingRest}
                  />
                  <Label htmlFor="star4" title="4 Stars">
                    4
                  </Label>
                  <Input
                    type="radio"
                    id="star3"
                    name="rating"
                    value="3"
                    innerRef={ratingRef}
                    {...ratingRest}
                  />
                  <Label htmlFor="star3" title="3 Stars">
                    3
                  </Label>
                  <Input
                    type="radio"
                    id="star2"
                    name="rating"
                    value="2"
                    innerRef={ratingRef}
                    {...ratingRest}
                  />
                  <Label htmlFor="star2" title="2 Stars">
                    2
                  </Label>
                  <Input
                    type="radio"
                    id="star1"
                    name="rating"
                    value="1"
                    innerRef={ratingRef}
                    {...ratingRest}
                  />
                  <Label htmlFor="star1" title="1 Stars">
                    1
                  </Label>
                </div>
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

export default SaveRatingModal;
