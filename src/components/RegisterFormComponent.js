import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/ActionCreators";
import {
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
  Col,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

function RegisterForm({ toggleModal }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordShown = () => setPasswordShown(!passwordShown);

  const toggleConfirmPasswordShown = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: "onChange" });

  const { ref: usernameRef, ...usernameRest } = register("username", {
    required: true,
    maxLength: "30",
  });
  const { ref: passwordRef, ...passwordRest } = register("password", {
    required: true,
    minLength: "8",
    maxLength: "30",
  });
  const { ref: confirmPasswordRef, ...confirmPasswordRest } = register(
    "confirmPassword",
    {
      required: true,
      minLength: "8",
      maxLength: "30",
      validate: () => {
        return getValues("confirmPassword") === getValues("password");
      },
    }
  );
  const { ref: fullNameRef, ...fullNameRest } = register("fullName", {
    required: true,
    pattern: /^[A-Za-z ]+$/,
    maxLength: "20",
  });
  const { ref: emailRef, ...emailRest } = register("email", {
    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    required: true,
  });
  const { ref: descriptionRef, ...descriptionRest } = register("description", {
    maxLength: "500",
  });

  const handleRegister = (userData) => {
    setIsFormSubmitted(true);
    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (isFormSubmitted && users.registerSuccess) {
      setIsFormSubmitted(false);
      setShowSuccess(true);
      setTimeout(() => toggleModal(), 2000);
    }
  }, [users.registerSuccess, isFormSubmitted, toggleModal]);

  useEffect(() => {
    if (isFormSubmitted && users.registerErrMess) {
      if (users.registerErrMess.name === "UserExistsError")
        setError("username", {
          type: "serverValidation",
          message: "Username Already Exists!",
        });
    }
  }, [users.registerErrMess, setError, isFormSubmitted]);

  return (
    <div className="register_form">
      {showSuccess && (
        <div className="p-5 text-center">
          <span className="text-success h5">User Registerd Successfully !</span>
        </div>
      )}
      <Form
        onSubmit={handleSubmit(handleRegister)}
        className={showSuccess ? "d-none" : ""}
      >
        <FormGroup row>
          <Label sm="3" htmlFor="username">
            <span className="fa fa-user" /> Username
            <span style={{ color: "red" }}>*</span> :
          </Label>
          <Col sm="9">
            <Input
              type="text"
              name="username"
              className="border border-dark"
              invalid={errors.username ? true : false}
              innerRef={usernameRef}
              {...usernameRest}
            />
            {errors.username && (
              <FormFeedback invalid>
                {errors.username.type === "required" && (
                  <span>Username Is Required!</span>
                )}
                {errors.username.type === "maxLength" && (
                  <span>Username Can Contain Maximum 30 Characters!</span>
                )}
                {errors.username.type === "serverValidation" && (
                  <span>{errors.username.message}</span>
                )}
              </FormFeedback>
            )}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm="3" htmlFor="password">
            <span className="fa fa-lock" /> Password
            <span style={{ color: "red" }}>*</span> :
          </Label>
          <Col sm="9">
            <InputGroup>
              <Input
                type={passwordShown ? "text" : "password"}
                name="password"
                className="border border-dark border-right-0"
                invalid={errors.password ? true : false}
                innerRef={passwordRef}
                {...passwordRest}
              />
              <InputGroupAddon
                addonType="append"
                className="border border-dark rounded-right"
              >
                <Button
                  className="shadow-none border-0 bg-white text-dark"
                  onClick={togglePasswordShown}
                >
                  {passwordShown ? (
                    <span className="fa fa-eye" />
                  ) : (
                    <span className="fa fa-eye-slash" />
                  )}
                </Button>
              </InputGroupAddon>
              {errors.password && (
                <FormFeedback invalid>
                  {errors.password.type === "required" && (
                    <span>Password Is Required!</span>
                  )}
                  {errors.password.type === "minLength" && (
                    <span>
                      Password Must Contain Atleast 8 Alphanumeric Characters!
                    </span>
                  )}
                  {errors.password.type === "maxLength" && (
                    <span>Password Can Contain Maximum 30 Characters!</span>
                  )}
                </FormFeedback>
              )}
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm="3" htmlFor="confirmPassword">
            <span className="fa fa-lock" /> Confirm Password
            <span style={{ color: "red" }}>*</span> :
          </Label>
          <Col sm="9">
            <InputGroup>
              <Input
                type={confirmPasswordShown ? "text" : "password"}
                name="confirmPassword"
                className="border border-dark border-right-0"
                invalid={errors.confirmPassword ? true : false}
                innerRef={confirmPasswordRef}
                {...confirmPasswordRest}
              />
              <InputGroupAddon
                addonType="append"
                className="border border-dark rounded-right"
              >
                <Button
                  className="shadow-none border-0 bg-white text-dark"
                  onClick={toggleConfirmPasswordShown}
                >
                  {confirmPasswordShown ? (
                    <span className="fa fa-eye" />
                  ) : (
                    <span className="fa fa-eye-slash" />
                  )}
                </Button>
              </InputGroupAddon>
              {errors.confirmPassword && (
                <FormFeedback invalid>
                  {errors.confirmPassword.type === "required" && (
                    <span>Confirm Password Is Required!</span>
                  )}
                  {errors.confirmPassword.type === "minLength" && (
                    <span>
                      Confirm Password Must Contain Atleast 8 Alphanumeric
                      Characters!
                    </span>
                  )}
                  {errors.confirmPassword.type === "maxLength" && (
                    <span>
                      Confirm Password Can Contain Maximum 30 Characters!
                    </span>
                  )}
                  {errors.confirmPassword.type === "validate" && (
                    <span>Confirm Password Should Match !</span>
                  )}
                </FormFeedback>
              )}
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm="3" htmlFor="fullName">
            <span className="fa fa-pencil-square-o" /> Full Name
            <span style={{ color: "red" }}>*</span> :
          </Label>
          <Col sm="9">
            <Input
              type="text"
              name="fullName"
              className="border border-dark"
              invalid={errors.fullName ? true : false}
              innerRef={fullNameRef}
              {...fullNameRest}
            />
            {errors.fullName && (
              <FormFeedback invalid>
                {errors.fullName.type === "required" && (
                  <span>Full Name Is Required!</span>
                )}
                {errors.fullName.type === "maxLength" && (
                  <span>Full Name Can Contain Maximum 20 Characters!</span>
                )}
                {errors.fullName.type === "pattern" && (
                  <span>Name Should Only Contain Letters!</span>
                )}
              </FormFeedback>
            )}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm="3" htmlFor="email">
            <span className="fa fa-envelope" /> Email
            <span style={{ color: "red" }}>*</span> :
          </Label>
          <Col sm="9">
            <Input
              type="email"
              name="email"
              className="border border-dark"
              invalid={errors.email ? true : false}
              innerRef={emailRef}
              {...emailRest}
            />
            {errors.email && (
              <FormFeedback invalid>
                {errors.email.type === "required" && (
                  <span>Email Is Required!</span>
                )}
                {errors.email.type === "pattern" && (
                  <span>Email Should Be Valid!</span>
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
              name="description"
              className="border border-dark"
              invalid={errors.description ? true : false}
              innerRef={descriptionRef}
              {...descriptionRest}
            />
            {errors.description && (
              <FormFeedback invalid>
                {errors.description.type === "maxLength" && (
                  <span>Description Can Contain Maximum 500 Characters!</span>
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
            <Button block type="submit" color="danger" disabled={!isValid}>
              Register
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default RegisterForm;
