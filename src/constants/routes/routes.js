export const routes = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  BOOKS: {
    HOME: "/books",
    SINGLE: "books/:id",
    EDIT: "books/edit/:id",
    NEW: "books/new",
  },
  COLLECTIONS: {
    HOME: "/collections",
    NEW: "/collections/new",
    EDIT: "/collections/edit/:id",
    SINGLE: "/collections/:id",
  },
  USERS: {
    HOME: "/users",
  },
};
