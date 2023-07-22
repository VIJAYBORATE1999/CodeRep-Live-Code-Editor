import * as ActionTypes from "./ActionTypes";

export const Users = (
  state = {
    isLoading: true,
    errMess: null,
    registerSuccess: false,
    registerErrMess: null,
    users: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_USERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        users: action.payload,
      };
    case ActionTypes.USERS_LOADING:
      return { ...state, isLoading: true, errMess: null, users: [] };
    case ActionTypes.USERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        users: [],
      };
    case ActionTypes.REGISTER_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        registerSuccess: false,
        registerErrMess: null,
      };
    case ActionTypes.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        registerErrMess: null,
        registerSuccess: true,
        users: [...state.users, action.payload],
      };
    case ActionTypes.REGISTER_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        registerSuccess: false,
        registerErrMess: action.payload,
      };
    default:
      return state;
  }
};
