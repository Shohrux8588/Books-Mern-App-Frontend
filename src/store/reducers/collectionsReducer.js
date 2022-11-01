import {
  FETCH_COLLECTIONS_STARTED,
  FETCH_COLLECTIONS_SUCCESS,
  FETCH_COLLECTIONS_FAILURE,
  CREATE_COLLECTION_STARTED,
  CREATE_COLLECTION_SUCCESS,
  CREATE_COLLECTION_FAILURE,
  DELETE_COLLECTION_STARTED,
  DELETE_COLLECTION_SUCCESS,
  DELETE_COLLECTION_FAILURE,
  FETCH_COLLECTION_STARTED,
  FETCH_COLLECTION_SUCCESS,
  FETCH_COLLECTION_FAILURE,
  EDIT_COLLECTION_STARTED,
  EDIT_COLLECTION_SUCCESS,
  EDIT_COLLECTION_FAILURE,
} from "../actionTypes/collectionsActionTypes";

const collectionsReducer = (
  state = {
    loading: false,
    error: null,
    collections: [],
    collection: {},
  },
  action
) => {
  switch (action.type) {
    case FETCH_COLLECTIONS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        collections: action.collections,
      };
    case FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DELETE_COLLECTION_STARTED:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COLLECTION_SUCCESS:
      const collections = state.collections.filter(
        (collection) => collection._id !== action.collection._id
      );
      return {
        ...state,
        loading: false,
        collections,
      };
    case DELETE_COLLECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CREATE_COLLECTION_STARTED:
      return {
        ...state,
        loading: true,
      };
    case CREATE_COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        collections: [action.collection, ...state.collections],
      };
    case CREATE_COLLECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_COLLECTION_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        collection: action.collection,
      };
    case FETCH_COLLECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case EDIT_COLLECTION_STARTED:
      return {
        ...state,
        loading: true,
      };
    case EDIT_COLLECTION_SUCCESS:
      const filteredCollections = state.collections.filter(
        (collection) => collection._id !== action.collection._id
      );
      const isCollectionUpdated =
        state.collection._id === action.collection._id;
      return {
        ...state,
        loading: false,
        collections: [action.collection, ...filteredCollections],
        collection: isCollectionUpdated ? action.collection : {},
      };
    case EDIT_COLLECTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default collectionsReducer;
