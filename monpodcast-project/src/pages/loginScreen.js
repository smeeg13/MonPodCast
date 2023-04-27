import LoginForm from "../components/LoginForm";
import Head from "next/head";
import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  uploadContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    overflowX: "auto",
    whiteSpace: "nowrap",
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
    <div className={classes.uploadContainer} id="upload-container">
      <Head>
        <title>Login</title>
      </Head>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom align="center">
          Enter your information to login
        </Typography>
        <LoginForm />
      </Container>
    </div>
  );
};

export default loginScreen;
