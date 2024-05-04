"use client";
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  TextField,
  Container,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { MainContext } from "../../context/MainContext";

export default function Login({ setselectedForm, handleLogin }) {
  const { loginEmail, setLoginEmail } = useContext(MainContext);

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email.").required("Email is required."),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email } = data;
    console.log(email);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const responseData = await res.json();

      if (res.ok) {
        console.log(responseData);
        console.log(email);
        setLoginEmail(email);
        console.log(loginEmail, "logs");

        setselectedForm("passVerification");
        reset();
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Box>
        <Typography variant="h1" className="fw-semibold text-dark">
          Log In
        </Typography>
        <Box mt={6}>
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <InputLabel className="fw-medium mb-2">
                    Your email address
                  </InputLabel>
                  <TextField
                    type="email"
                    variant="outlined"
                    label="work@gmail.com"
                    name="email"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" className="btn--color" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box mt={2} className="d-flex justify-content-between">
          <Button onClick={() => setselectedForm("reg")}>
            Create new account ?
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
