import { combineReducers } from "redux";

import booksReducer from "./booksReducer";
import collectionsReducer from "./collectionsReducer";
import usersReducer from "./usersReducer";

const allReducers = combineReducers({
  books: booksReducer,
  collections: collectionsReducer,
  users: usersReducer
});

export default allReducers;
