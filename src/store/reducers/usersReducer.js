import {
  FETCH_USERS_STARTED,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER_STARTED,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  EDIT_USER_STARTED,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
} from "../actionTypes/usersActionTypes";

const initialState = {
  loading: false,
  error: null,
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DELETE_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      const users = state.users.filter((user) => user._id !== action.user._id);
      return {
        ...state,
        loading: false,
        users,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case EDIT_USER_STARTED:
      return {
        ...state,
        loading: true,
      };
    case EDIT_USER_SUCCESS:
      const filteredUsers = state.users.filter(
        (user) => user._id !== action.user._id
      );
      filteredUsers.unshift(action.user);
      return {
        ...state,
        loading: false,
        users: filteredUsers,
      };
    case EDIT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default usersReducer;
