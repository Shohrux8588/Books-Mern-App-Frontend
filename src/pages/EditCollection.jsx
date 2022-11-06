import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  TextField,
  Box,
  Button,
  FormControl,
  Chip,
  Container,
  Typography,
  Menu,
  MenuItem,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useUserContext from "./../hooks/useUserContext";
import {
  editCollection,
  fetchCollection,
} from "./../store/actions/collectionsActions";
import Field from "../components/Fields/Field";
import MultilineField from "../components/Fields/MultilineField";
import CheckboxField from "../components/Fields/CheckboxField";
import DateField from "./../components/Fields/DateField";
import { fetchBooks } from "./../store/actions/booksActions";

const EditCollection = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userContext = useUserContext();
  const [name, setName] = useState("");
  const [isTagsEmpty, setIsTagsEmpty] = useState(false);
  const [addedBooks, setAddedBooks] = useState([]);
  const [tags, setTags] = useState(["action", "horror", "comedy"]);
  const [currValue, setCurrValue] = useState("");
  const state = useSelector((state) => state);
  const booksState = state.books;
  const collectionsState = state.collections;
  const collection = collectionsState.collection;

  const [fieldsCounter, setFieldsCounter] = useState({
    integerFieldsCounter: 0,
    stringFieldsCounter: 0,
    multilineFieldsCounter: 0,
    checkboxFieldsCounter: 0,
    dateFieldsCounter: 0,
  });

  const [fields, setFields] = useState({
    integerFields: [
      { key: "", value: 0 },
      { key: "", value: 0 },
      { key: "", value: 0 },
    ],
    stringFields: [
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
    ],
    multilineFields: [
      { key: "", value: "" },
      { key: "", value: "" },
      { key: "", value: "" },
    ],
    checkboxFields: [
      { key: "", value: false },
      { key: "", value: false },
      { key: "", value: false },
    ],
    dateFields: [
      { key: "", value: null },
      { key: "", value: null },
      { key: "", value: null },
    ],
  });

  useEffect(() => {
    dispatch(fetchCollection(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (collection.name) {
      setName(collection.name);
      setTags(collection.tags);
      setAddedBooks(collection.books);
    }
    if (collection.checkboxFields && collection.checkboxFields.length > 0) {
      setFieldsCounter({
        ...fieldsCounter,
        checkboxFieldsCounter: collection.checkboxFields.length,
      });
      setFields({
        ...fields,
        checkboxFields: collection.checkboxFields
          .map((field) => ({
            key: field.key,
            value: field.value,
          }))
          .concat(
            fields.checkboxFields.slice(collection.checkboxFields.length)
          ),
      });
    }
    if (collection.integerFields && collection.integerFields.length > 0) {
      setFieldsCounter({
        ...fieldsCounter,
        integerFieldsCounter: collection.integerFields.length,
      });
      setFields({
        ...fields,
        integerFields: collection.integerFields
          .map((field) => ({
            key: field.key,
            value: field.value,
          }))
          .concat(fields.integerFields.slice(collection.integerFields.length)),
      });
    }
    if (collection.stringFields && collection.stringFields.length > 0) {
      setFieldsCounter({
        ...fieldsCounter,
        stringFieldsCounter: collection.stringFields.length,
      });
      setFields({
        ...fields,
        stringFields: collection.stringFields
          .map((field) => ({
            key: field.key,
            value: field.value,
          }))
          .concat(fields.stringFields.slice(collection.stringFields.length)),
      });
    }
    if (collection.multilineFields && collection.multilineFields.length > 0) {
      setFieldsCounter({
        ...fieldsCounter,
        multilineFieldsCounter: collection.multilineFields.length,
      });
      setFields({
        ...fields,
        multilineFields: collection.multilineFields
          .map((field) => ({
            key: field.key,
            value: field.value,
          }))
          .concat(
            fields.multilineFields.slice(collection.multilineFields.length)
          ),
      });
    }
    if (collection.dateFields && collection.dateFields.length > 0) {
      setFieldsCounter({
        ...fieldsCounter,
        dateFieldsCounter: collection.dateFields.length,
      });
      setFields({
        ...fields,
        dateFields: collection.dateFields
          .map((field) => ({
            key: field.key,
            value: new Date(field.value).toISOString().slice(0, 10),
          }))
          .concat(fields.dateFields.slice(collection.dateFields.length)),
      });
    }
  }, [collection]);
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleKeyUp = (e) => {
    if (e.keyCode === 32) {
      setTags((oldState) => [...oldState, e.target.value]);
      setCurrValue("");
    }
  };

  const handleChange = (e) => {
    setCurrValue(e.target.value);
  };

  const handleDelete = (item, index) => {
    let arr = [...tags];
    arr.splice(index, 1);
    setTags(arr);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFieldNumberChange = (e) => {
    const field = e.target.id + "FieldsCounter";
    if (fieldsCounter[field] >= 3) {
      return;
    }
    const newFieldsCounter = {
      ...fieldsCounter,
      [field]: fieldsCounter[field] + 1,
    };
    setFieldsCounter(newFieldsCounter);
  };

  const handleLabelChange = (e) => {
    let copyFields = JSON.parse(JSON.stringify(fields));
    copyFields[e.target.name][Number(e.target.id)]["key"] = e.target.value;
    setFields(copyFields);
  };

  const handleValueChange = (e) => {
    let copyFields = JSON.parse(JSON.stringify(fields));
    if (e.target.name === "checkboxFields") {
      copyFields[e.target.name][Number(e.target.id)]["value"] =
        e.target.checked;
    } else {
      copyFields[e.target.name][Number(e.target.id)]["value"] = e.target.value;
    }
    setFields(copyFields);
  };

  const handleAddBook = (bookId) => {
    let updatedBooks = [...addedBooks];
    if (addedBooks.includes(bookId)) {
      updatedBooks = updatedBooks.filter((id) => id !== bookId);
    } else {
      updatedBooks = [bookId, ...updatedBooks];
    }
    setAddedBooks(updatedBooks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags.length < 1) {
      setIsTagsEmpty(true);
      return;
    }
    dispatch(
      editCollection(id, userContext.state.token, {
        authorId: userContext.state._id,
        name,
        tags,
        books: addedBooks,
        integerFields: fields.integerFields.slice(
          0,
          fieldsCounter.integerFieldsCounter
        ),
        stringFields: fields.stringFields.slice(
          0,
          fieldsCounter.stringFieldsCounter
        ),
        multilineFields: fields.multilineFields.slice(
          0,
          fieldsCounter.multilineFieldsCounter
        ),
        checkboxFields: fields.checkboxFields.slice(
          0,
          fieldsCounter.checkboxFieldsCounter
        ),
        dateFields: fields.dateFields.slice(0, fieldsCounter.dateFieldsCounter),
      })
    );
    if (!collectionsState.error && !collectionsState.loading) {
      navigate("/collections");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        color="primary"
        sx={{ textAlign: "center" }}
        variant="h3"
        gutterBottom
      >
        {t("Collections.EditCollection")}
      </Typography>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ float: "left" }}
        >
          {t("Collections.NewField")}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem id="integer" onClick={handleFieldNumberChange}>
            {t("Collections.Field.Integer")}
          </MenuItem>
          <MenuItem id="string" onClick={handleFieldNumberChange}>
            {t("Collections.Field.String")}
          </MenuItem>
          <MenuItem id="multiline" onClick={handleFieldNumberChange}>
            {t("Collections.Field.Multiline")}
          </MenuItem>
          <MenuItem id="checkbox" onClick={handleFieldNumberChange}>
            {t("Collections.Field.Checkbox")}
          </MenuItem>
          <MenuItem id="date" onClick={handleFieldNumberChange}>
            {t("Collections.Field.Date")}
          </MenuItem>
        </Menu>
      </Grid>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          type="bookName"
          margin="normal"
          required
          fullWidth
          id="bookName"
          label="Name"
          autoComplete="bookName"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FormControl fullWidth>
          <div className={"container"}>
            {tags.map((item, index) => (
              <Chip
                size="small"
                onDelete={() => handleDelete(item, index)}
                label={item}
                key={item}
              />
            ))}
          </div>
          <TextField
            error={isTagsEmpty}
            value={currValue}
            onChange={handleChange}
            onKeyDown={handleKeyUp}
          />
        </FormControl>

        {fields.integerFields
          .slice(0, fieldsCounter.integerFieldsCounter)
          .map((integerField, index) => (
            <Fragment key={index}>
              <Field
                id={index}
                name="integerFields"
                label={`Integer field ${index + 1} label`}
                value={integerField.key}
                onChange={handleLabelChange}
              />
              <Field
                id={index}
                name="integerFields"
                label={`Integer field ${index + 1} value`}
                value={integerField.value}
                onChange={handleValueChange}
              />
            </Fragment>
          ))}
        {fields.stringFields
          .slice(0, fieldsCounter.stringFieldsCounter)
          .map((stringField, index) => (
            <Fragment key={index}>
              <Field
                id={index}
                name="stringFields"
                label={`String field ${index + 1} label`}
                value={stringField.key}
                onChange={handleLabelChange}
              />
              <Field
                id={index}
                name="stringFields"
                label={`String field ${index + 1} value`}
                value={stringField.value}
                onChange={handleValueChange}
              />
            </Fragment>
          ))}
        {fields.multilineFields
          .slice(0, fieldsCounter.multilineFieldsCounter)
          .map((multilineField, index) => (
            <Fragment key={index}>
              <Field
                id={index}
                name="multilineFields"
                label={`Multiline field ${index + 1} label`}
                value={multilineField.key}
                onChange={handleLabelChange}
              />
              <MultilineField
                id={index}
                name="multilineFields"
                label={`Multiline field ${index + 1} value`}
                value={multilineField.value}
                onChange={handleValueChange}
              />
            </Fragment>
          ))}
        {fields.checkboxFields
          .slice(0, fieldsCounter.checkboxFieldsCounter)
          .map((checkboxField, index) => (
            <Fragment key={index}>
              <Field
                id={index}
                name="checkboxFields"
                label={`Checkbox field ${index + 1} label`}
                value={checkboxField.key}
                onChange={handleLabelChange}
              />
              <CheckboxField
                id={index}
                name="checkboxFields"
                label={`Checkbox field ${index + 1} value`}
                value={checkboxField.value}
                onChange={handleValueChange}
              />
            </Fragment>
          ))}
        {fields.dateFields
          .slice(0, fieldsCounter.dateFieldsCounter)
          .map((dateField, index) => (
            <Fragment key={index}>
              <Field
                id={index}
                name="dateFields"
                label={`Date field ${index + 1} label`}
                value={dateField.key}
                onChange={handleLabelChange}
              />
              <DateField
                id={index}
                name="dateFields"
                label={null}
                value={dateField.value}
                onChange={handleValueChange}
                type="date"
              />
            </Fragment>
          ))}
        <List>
          {booksState.books &&
            booksState.books.map((book) => (
              <ListItemButton
                key={book._id}
                onClick={() => handleAddBook(book._id)}
              >
                <ListItemIcon>
                  {addedBooks.includes(book._id) ? (
                    <Tooltip title={t("Collection.RemoveBook")}>
                      <RemoveCircleIcon color="secondary" />
                    </Tooltip>
                  ) : (
                    <Tooltip title={t("Collection.AddBook")}>
                      <AddCircleIcon color="primary" />
                    </Tooltip>
                  )}
                </ListItemIcon>
                <ListItemText primary={book.name} />
              </ListItemButton>
            ))}
        </List>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t("Collections.Buttons.Edit")}
        </Button>
      </Box>
    </Container>
  );
};

export default EditCollection;
