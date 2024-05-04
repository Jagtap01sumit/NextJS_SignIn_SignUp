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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MainContext } from "../../context/MainContext";

export default function PassVerify({ setselectedForm, handleLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const { loginEmail, setLoginEmail } = useContext(MainContext);

  const schema = yup.object().shape({
    password: yup.string().min(8, "Password must have minimum 8 characters."),
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
  console.log("login email", loginEmail);

  if (!loginEmail) {
    window.location.href = "/auth";
  }
  const onSubmit = async (data) => {
    const email = loginEmail;
    const { password } = data;
    console.log(email, password);
    try {
      const res = await fetch("/api/auth/verifyPass", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await res.json();

      console.log(responseData);
      if (res.ok) {
        console.log("hello");
        // window.location.href = "/auth";
        reset();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Box>
        <Typography variant="h1" className="fw-semibold text-dark">
          Log in
        </Typography>
        <Typography variant="h4" className=" text-dark">
          Email : <span className="font-thin">{loginEmail}</span>
        </Typography>
        <Box mt={6}>
          <form method="POST" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <InputLabel className="fw-medium mb-2">Password</InputLabel>
                  <Box className="passwordBox">
                    <TextField
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      label="Password"
                      name="password"
                      fullWidth
                      {...register("password")}
                    />
                    <IconButton
                      className="visibilityBtn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Box>
                  {errors && errors.password && errors.password.message ? (
                    <Typography className="text-danger">
                      {errors.password.message}
                    </Typography>
                  ) : null}
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
            Create new another account ?
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
