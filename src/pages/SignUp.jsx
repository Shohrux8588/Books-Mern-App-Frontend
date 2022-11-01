import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import UserContext from "../context/UserContext";
import useFetch from "./../hooks/useFetch";

const SignUp = () => {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { loading, error, data, fetchData } = useFetch();

  const onSubmit = (body) => {
    fetchData("users/signup", "POST", "", body);
  };

  useEffect(() => {
    if (!loading && !error && data) {
      userContext.login(data);
    }
  }, [data]);

  const emailErrorMessage = (errorType) => {
    if (errorType === "EmailRequired") {
      return t("Form.Email.RequiredError");
    } else if (errorType === "EmailValidation") {
      return t("Form.Email.ValidationError");
    }
  };

  const passwordErrorMessage = (errorType) => {
    if (errorType === "PasswordRequired") {
      return t("Form.Password.RequiredError");
    } else if (errorType === "PasswordValidation") {
      return t("Form.Password.ValidationError");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("Signup.Title")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "EmailRequired",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "EmailValidation",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                margin="normal"
                required
                fullWidth
                id="email"
                label={t("Form.Email")}
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={
                  !!errors.email && emailErrorMessage(errors.email.message)
                }
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "PasswordRequired",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/,
                message: "PasswordValidation",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                name="password"
                label={t("Form.Password")}
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={
                  !!errors.password &&
                  passwordErrorMessage(errors.password.message)
                }
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("Signup.Button")}
          </Button>
          <Grid
            container
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid item>
              <Link to="/login">{t("Signup.HelpText")} </Link>
            </Grid>
            {error && (
              <Grid item>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  color="error"
                  textAlign="center"
                >
                  Something went wrong
                </Typography>
              </Grid>
            )}
            {loading && (
              <Grid
                item
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                mt={2}
              >
                <CircularProgress />
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
