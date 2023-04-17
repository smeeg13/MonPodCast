import loginForm from "../components/LoginForm";
import Head from "next/head";
import { Container, Typography, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LoginForm from "../components/LoginForm";
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  uploadContainer: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    // padding: useTheme().spacing(2, 0),
    "&::-webkit-scrollbar": {
      height: "0.5rem",
      backgroundColor: "#f5f5f5",
      borderRadius: "0.25rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ddd",
      borderRadius: "0.25rem",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#ccc",
    },
  },
}));

const loginScreen = () => {
  const classes = useStyles();

  const router = useRouter();

  useEffect(() => {
    if (router.query.message) {
      alert(`${router.query.message}`);
    }
  }, [router.query]);


  return (
    <div
      className={classes.uploadContainer}
      id="upload-container"
      style={{ marginTop: 100 }}
    >

      <Head>
        <title>Login</title>
      </Head>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
         Enter your information to login 
        </Typography>
        <LoginForm/>
        <a href="/registerScreen">Register</a>
      </Container>
    
    </div>
  );
};

export default loginScreen;
