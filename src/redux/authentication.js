import * as ActionTypes from "./ActionTypes";

export const Authentication = (
  state = {
    isLoading: false,
    errMess: null,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
    username: localStorage.getItem("username"),
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        isAuthenticated: false,
        token: null,
        username: null,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        isAuthenticated: true,
        token: action.payload.token,
        username: action.payload.username,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        isAuthenticated: false,
        token: null,
        username: null,
      };
    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        isAuthenticated: true,
        token: state.token,
        username: state.username,
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        isAuthenticated: false,
        token: null,
        username: null,
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        isAuthenticated: true,
        token: state.token,
        username: state.username,
      };
    default:
      return state;
  }
};
