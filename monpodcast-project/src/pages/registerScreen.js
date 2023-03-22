import RegisterForm from "../components/registerForm";
import Head from "next/head";
import { Container, Typography, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import LoginForm from "../components/LoginForm";

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

const registerScreen = () => {
  const classes = useStyles();

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
         Enter your information to register 
        </Typography>
        <RegisterForm/>
        <a href="/loginScreen">login</a>
      </Container>
    </div>
  );
};

export default registerScreen;
