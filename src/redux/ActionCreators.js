import * as ActionTypes from "./ActionTypes";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";

// Add Action Creators Here

// Editors Action Creaters

export const addEditors = (editors) => {
  return {
    type: ActionTypes.ADD_EDITORS,
    payload: editors,
  };
};

export const editorsLoading = () => {
  return {
    type: ActionTypes.EDITORS_LOADING,
  };
};

export const editorsFailed = (errmess) => {
  return {
    type: ActionTypes.EDITORS_FAILED,
    payload: errmess,
  };
};

export const fetchEditors = () => (dispatch) => {
  dispatch(editorsLoading());

  return axios
    .get(baseUrl + "editors")
    .then((response) => {
      if (response.data.success) {
        dispatch(addEditors(response.data.editors));
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) dispatch(editorsFailed(error.response.data.err));
      else if (error.request) dispatch(editorsFailed("Connection Failure!"));
    });
};

export const saveEditorRequest = () => {
  return {
    type: "SAVE_EDITOR_REQUEST",
  };
};

export const saveEditorSuccess = (editor) => {
  return {
    type: "SAVE_EDITOR_SUCCESS",
    payload: editor,
  };
};

export const saveEditorFailure = (errMess) => {
  return {
    type: "SAVE_EDITOR_FAILURE",
    payload: errMess,
  };
};

export const saveEditor = (editorData) => (dispatch) => {
  dispatch(saveEditorRequest());

  const bearer = "Bearer " + localStorage.getItem("token");

  return axios({
    method: "post",
    url: baseUrl + "editors",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    data: editorData,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch(saveEditorSuccess(response.data.editor));
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) {
        dispatch(saveEditorFailure(error.response.data.err));
      } else if (error.request) {
        dispatch(saveEditorFailure("Connection Failure!"));
      }
    });
};

export const updateEditorRequest = () => {
  return {
    type: "UPDATE_EDITOR_REQUEST",
  };
};

export const updateEditorSuccess = (updatedEditor) => {
  return {
    type: "UPDATE_EDITOR_SUCCESS",
    payload: updatedEditor,
  };
};

export const updateEditorFailure = (errMess) => {
  return {
    type: "UPDATE_EDITOR_FAILURE",
    payload: errMess,
  };
};

export const updateEditor = (editorId, editorDataToUpdate) => (dispatch) => {
  dispatch(updateEditorRequest());

  const bearer = "Bearer " + localStorage.getItem("token");

  return axios({
    method: "put",
    url: baseUrl + "editors/" + editorId,
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    data: editorDataToUpdate,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch(updateEditorSuccess(response.data.editor));
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) {
        dispatch(updateEditorFailure(error.response.data.err));
      } else if (error.request) {
        dispatch(updateEditorFailure("Connection Failure!"));
      }
    });
};

export const editorFormStateReset = () => {
  return {
    type: "EDITOR_FORM_STATE_RESET",
  };
};

export const createRatingRequest = () => {
  return {
    type: "CREATE_RATING_REQUEST",
  };
};

export const createRatingSuccess = (ratingData) => {
  return {
    type: "CREATE_RATING_SUCCESS",
    payload: ratingData,
  };
};

export const createRatingFailure = (errMess) => {
  return {
    type: "CREATE_RATING_FAILURE",
    payload: errMess,
  };
};

export const createRating = (editorId, ratingValue) => (dispatch) => {
  dispatch(createRatingRequest());

  const bearer = "Bearer " + localStorage.getItem("token");

  return axios({
    method: "post",
    url: baseUrl + "editors/" + editorId + "/rating",
    headers: {
      "Content-Type": "application/json",
      Authorization: bearer,
    },
    data: { ratingValue: ratingValue },
  })
    .then((response) => {
      if (response.data.success) {
        let ratingData = {
          editorId: editorId,
          ratingValue: ratingValue,
        };
        dispatch(createRatingSuccess(ratingData));
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) {
        dispatch(createRatingFailure(error.response.data.err));
      } else if (error.request) {
        dispatch(createRatingFailure("Connection Failure!"));
      }
    });
};

export const updateRatingRequest = () => {
  return {
    type: "UPDATE_RATING_REQUEST",
  };
};

export const updateRatingSuccess = (ratingData) => {
  return {
    type: "UPDATE_RATING_SUCCESS",
    payload: ratingData,
  };
};

export const updateRatingFailure = (errMess) => {
  return {
    type: "UPDATE_RATING_FAILURE",
    payload: errMess,
  };
};

export const updateRating =
  (editorId, ratingValue, previousRatingValue) => (dispatch) => {
    dispatch(updateRatingRequest());

    const bearer = "Bearer " + localStorage.getItem("token");

    return axios({
      method: "put",
      url: baseUrl + "editors/" + editorId + "/rating",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      data: { ratingValue: ratingValue },
    })
      .then((response) => {
        if (response.data.success) {
          let ratingData = {
            editorId: editorId,
            ratingValue: ratingValue,
            previousRatingValue: previousRatingValue,
          };
          dispatch(updateRatingSuccess(ratingData));
        } else {
          var error = new Error("Error " + response.data.status);
          error.response = response;
          throw error;
        }
      })
      .catch((error) => {
        if (error.response) {
          dispatch(updateRatingFailure(error.response.data.err));
        } else if (error.request) {
          dispatch(updateRatingFailure("Connection Failure!"));
        }
      });
  };

export const ratingFormStateReset = () => {
  return {
    type: "RATING_FORM_STATE_RESET",
  };
};

// Login Action Creaters

export const loginRequest = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
  };
};

export const loginSuccess = (userData) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFailure = (errMess) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    payload: errMess,
  };
};

export const loginUser = (userCredentials) => (dispatch) => {
  dispatch(loginRequest());

  return axios({
    method: "post",
    url: baseUrl + "users/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: userCredentials,
  })
    .then((response) => {
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", userCredentials.username);
        let loginDate = new Date();
        let tokenExpiryDate = loginDate.setHours(loginDate.getHours() + 48);
        localStorage.setItem("tokenExpiryDate", tokenExpiryDate);
        dispatch(
          loginSuccess({
            token: response.data.token,
            username: userCredentials.username,
          })
        );
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) dispatch(loginFailure(error.response.data.err));
      else if (error.request) dispatch(loginFailure("Connection Failure!"));
    });
};

// Logout Action Creaters

export const logoutRequest = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  };
};

export const logoutSuccess = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  };
};

export const logoutFailure = () => {
  return {
    type: ActionTypes.LOGOUT_FAILURE,
    payload: "Logout Failed !",
  };
};

export const logoutUser = () => (dispatch) => {
  dispatch(logoutRequest());
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("tokenExpiryDate");
  if (
    localStorage.getItem("token") === null &&
    localStorage.getItem("username") === null &&
    localStorage.getItem("tokenExpiryDate") === null
  ) {
    dispatch(logoutSuccess());
  } else {
    dispatch(logoutFailure());
  }
};

// Check Login Validity Action Creator

export const checkLoginValidity = () => (dispatch) => {
  const bearer = "Bearer " + localStorage.getItem("token");
  if (
    localStorage.getItem("token") &&
    localStorage.getItem("username") &&
    localStorage.getItem("tokenExpiryDate")
  ) {
    return axios({
      method: "get",
      url: baseUrl + "users/checkJWTToken",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
    })
      .then((response) => {
        if (response.data.success) {
          let tokenExpiryDate = localStorage.getItem("tokenExpiryDate");
          let now = new Date().getTime();
          if (tokenExpiryDate > now) {
            let remainingTimeInMilliseconds = tokenExpiryDate - now;
            let remainingMinutes = parseInt(
              (remainingTimeInMilliseconds / 1000) % 60
            );
            let remainingHours = parseInt(
              remainingTimeInMilliseconds / (60 * 60 * 1000)
            );

            if (remainingHours < 2) {
              let alertUser = setInterval(() => {
                if (remainingHours === 0 && remainingMinutes === 0) {
                  dispatch(checkLoginValidity());
                  clearInterval(alertUser);
                }
                alert(
                  "Your Login Will Be Invalidated After " +
                    remainingHours +
                    " Hours & " +
                    remainingMinutes +
                    " Minutes. \n" +
                    "Please Login Again Before Invalidation, Else You Might Lose Some Changes That You May Have Made !"
                );
              }, 10 * 60 * 1000);
            } else {
              setTimeout(() => {
                dispatch(checkLoginValidity());
              }, 90 * 60 * 1000);
            }
          }
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            alert(
              "Check For Login Validity Indicated That You Have An Invalid Login.\n" +
                "You Are Being Logged Out !"
            );
          } else {
            alert(
              "Server Responded With An Error While Checking For Login Validity.\n" +
                "You Are Being Logged Out !"
            );
          }
          dispatch(logoutUser());
        } else if (error.request) {
          alert(
            "Unable To Connect To Server & Check For Login Validity Due To Connection Error.\n" +
              "You Are Being Logged Out !"
          );
          dispatch(logoutUser());
        }
      });
  }
};

// Users Action Creator

export const registerUserRequest = () => {
  return {
    type: "REGISTER_USER_REQUEST",
  };
};

export const registerUserSuccess = (userData) => {
  return {
    type: "REGISTER_USER_SUCCESS",
    payload: userData,
  };
};

export const registerUserFailure = (errMess) => {
  return {
    type: "REGISTER_USER_FAILURE",
    payload: errMess,
  };
};

export const registerUser = (userData) => (dispatch) => {
  dispatch(registerUserRequest());

  return axios({
    method: "post",
    url: baseUrl + "users/register",
    headers: {
      "Content-Type": "application/json",
    },
    data: userData,
  })
    .then((response) => {
      if (response.data.success) {
        dispatch(registerUserSuccess(response.data.user));
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) {
        dispatch(registerUserFailure(error.response.data.err));
      } else if (error.request) registerUserFailure("Connection Failure!");
    });
};

export const addUsers = (users) => {
  return {
    type: ActionTypes.ADD_USERS,
    payload: users,
  };
};

export const usersLoading = () => {
  return {
    type: ActionTypes.USERS_LOADING,
  };
};

export const usersFailed = (errmess) => {
  return {
    type: ActionTypes.USERS_FAILED,
    payload: errmess,
  };
};

export const fetchUsers = () => (dispatch) => {
  dispatch(usersLoading());

  return axios
    .get(baseUrl + "users")
    .then((response) => {
      if (response.data.success) {
        dispatch(addUsers(response.data.users));
      } else {
        var error = new Error("Error " + response.data.status);
        error.response = response;
        throw error;
      }
    })
    .catch((error) => {
      if (error.response) dispatch(usersFailed(error.response.data.err));
      else if (error.request) dispatch(usersFailed("Connection Failure!"));
    });
};
