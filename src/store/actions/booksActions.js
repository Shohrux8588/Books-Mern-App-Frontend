import {
  FETCH_BOOKS_STARTED,
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_SUCCESS,
  DELETE_BOOK_STARTED,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  CREATE_BOOK_STARTED,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILURE,
  EDIT_BOOK_STARTED,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_FAILURE,
  FETCH_BOOK_STARTED,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_FAILURE,
} from "../actionTypes/booksActionTypes";

import { fetchApi } from "../../services/api";

export const fetchBooks = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_BOOKS_STARTED });
    return fetchApi("books", "GET").then(
      (books) => dispatch({ type: FETCH_BOOKS_SUCCESS, books: books }),
      (error) => dispatch({ type: FETCH_BOOKS_FAILURE, error })
    );
  };
};

export const deleteBook = (token, bookId) => {
  return (dispatch) => {
    dispatch({ type: DELETE_BOOK_STARTED });
    return fetchApi(`books/${bookId}`, "DELETE", token)
      .then((book) => dispatch({ type: DELETE_BOOK_SUCCESS, book }))
      .catch((error) => dispatch({ type: DELETE_BOOK_FAILURE, error }));
  };
};

export const createBook = (token, body) => {
  return (dispatch) => {
    dispatch({ type: CREATE_BOOK_STARTED });
    return fetchApi("books", "POST", token, body)
      .then((book) => dispatch({ type: CREATE_BOOK_SUCCESS, book }))
      .catch((error) => dispatch({ type: CREATE_BOOK_FAILURE, error }));
  };
};

export const editBook = (token, bookId, body) => {
  return (dispatch) => {
    dispatch({ type: EDIT_BOOK_STARTED });
    return fetchApi(`books/${bookId}`, "POST", token, body)
      .then((book) => dispatch({ type: EDIT_BOOK_SUCCESS, book }))
      .catch((error) => dispatch({ type: EDIT_BOOK_FAILURE, error }));
  };
};

export const fetchBook = (bookId) => {
  return (dispatch) => {
    dispatch({ type: FETCH_BOOK_STARTED });
    return fetchApi(`books/${bookId}`)
      .then((book) => dispatch({ type: FETCH_BOOK_SUCCESS, book }))
      .catch((error) => dispatch({ type: FETCH_BOOK_FAILURE, error }));
  };
};
