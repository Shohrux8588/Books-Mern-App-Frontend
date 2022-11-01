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

import { fetchApi } from "./../../services/api";

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_USERS_STARTED });
    return fetchApi("users").then(
      (users) => dispatch({ type: FETCH_USERS_SUCCESS, users: users }),
      (error) => dispatch({ type: FETCH_USERS_FAILURE, error })
    );
  };
};

export const deleteUser = (token, role, id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_USER_STARTED });
    return fetchApi(`users/${id}`, "DELETE", token, { role })
      .then((user) => {
        dispatch({ type: DELETE_USER_SUCCESS, user });
      })
      .catch((error) => dispatch({ type: DELETE_USER_FAILURE, error }));
  };
};

export const editUser = (token, role, id, editedField) => {
  return (dispatch) => {
    dispatch({ type: EDIT_USER_STARTED });
    return fetchApi(`users/${id}`, "POST", token, {
      role,
      editedUser: editedField,
    })
      .then((user) => dispatch({ type: EDIT_USER_SUCCESS, user }))
      .catch((error) => dispatch({ type: EDIT_USER_FAILURE, error }));
  };
};
