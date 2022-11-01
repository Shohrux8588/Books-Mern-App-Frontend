import {
  FETCH_COLLECTIONS_STARTED,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
  DELETE_COLLECTION_STARTED,
  DELETE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_FAILURE,
  CREATE_COLLECTION_STARTED,
  CREATE_COLLECTION_SUCCESS,
  CREATE_COLLECTION_FAILURE,
  FETCH_COLLECTION_STARTED,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAILURE,
  EDIT_COLLECTION_STARTED,
  EDIT_COLLECTION_SUCCESS,
  EDIT_COLLECTION_FAILURE,
} from "../actionTypes/collectionsActionTypes";

import { fetchApi } from "../../services/api";

export const fetchCollections = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_COLLECTIONS_STARTED });
    return fetchApi("collections").then(
      (collections) =>
        dispatch({
          type: FETCH_COLLECTIONS_SUCCESS,
          collections: collections,
        }),
      (error) => dispatch({ type: FETCH_COLLECTIONS_FAILURE, error })
    );
  };
};

export const deleteCollection = (token, collectionId) => {
  return (dispatch) => {
    dispatch({ type: DELETE_COLLECTION_STARTED });
    return fetchApi(`collections/${collectionId}`, "DELETE", token)
      .then((collection) =>
        dispatch({ type: DELETE_COLLECTION_SUCCESS, collection })
      )
      .catch((error) => dispatch({ type: DELETE_COLLECTION_FAILURE, error }));
  };
};

export const createCollection = (token, body) => {
  return (dispatch) => {
    dispatch({ type: CREATE_COLLECTION_STARTED });
    return fetchApi("collections", "POST", token, body)
      .then((collection) =>
        dispatch({ type: CREATE_COLLECTION_SUCCESS, collection })
      )
      .catch((error) => dispatch({ type: CREATE_COLLECTION_FAILURE, error }));
  };
};

export const fetchCollection = (id) => {
  return (dispatch) => {
    dispatch({ type: FETCH_COLLECTION_STARTED });
    return fetchApi(`collections/${id}`, "GET")
      .then((collection) =>
        dispatch({ type: FETCH_COLLECTION_SUCCESS, collection })
      )
      .catch((error) => dispatch({ type: FETCH_COLLECTION_FAILURE, error }));
  };
};

export const editCollection = (id, token, body) => {
  return (dispatch) => {
    dispatch({ type: EDIT_COLLECTION_STARTED });
    return fetchApi(`collections/${id}`, "POST", token, body)
      .then((collection) =>
        dispatch({ type: EDIT_COLLECTION_SUCCESS, collection })
      )
      .catch((error) => dispatch({ type: EDIT_COLLECTION_FAILURE, error }));
  };
};
