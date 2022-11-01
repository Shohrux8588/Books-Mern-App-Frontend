import {
  FETCH_BOOKS_STARTED,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  DELETE_BOOK_STARTED,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  EDIT_BOOK_STARTED,
  EDIT_BOOK_SUCCESS,
  EDIT_BOOK_FAILURE,
  CREATE_BOOK_STARTED,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILURE,
  FETCH_BOOK_STARTED,
  FETCH_BOOK_SUCCESS,
  FETCH_BOOK_FAILURE,
} from "../actionTypes/booksActionTypes";

const initialState = {
  loading: false,
  error: null,
  books: [],
  book: {},
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_STARTED:
      return { ...state, loading: true };
    case FETCH_BOOKS_SUCCESS:
      return { ...state, loading: false, books: action.books };
    case FETCH_BOOKS_FAILURE:
      return { ...state, loading: false, books: action.error };
    case DELETE_BOOK_STARTED:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOOK_SUCCESS:
      const books = state.books.filter((book) => book._id !== action.book._id);
      return {
        ...state,
        loading: false,
        books,
      };
    case DELETE_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case EDIT_BOOK_STARTED:
      return {
        ...state,
        loading: true,
      };
    case EDIT_BOOK_SUCCESS:
      const filteredBooks = state.books.filter(
        (book) => book._id !== action.book._id
      );
      filteredBooks.unshift(action.book);
      const isBookUpdated = state.book._id === action.book._id;
      return {
        ...state,
        loading: false,
        books: filteredBooks,
        book: isBookUpdated ? action.book : {},
      };
    case EDIT_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CREATE_BOOK_STARTED:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: [action.book, ...state.books],
      };
    case CREATE_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_BOOK_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        book: action.book,
      };
    case FETCH_BOOK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default booksReducer;
