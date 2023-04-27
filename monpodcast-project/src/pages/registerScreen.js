import RegisterForm from "../components/registerForm";
import Head from "next/head";
import { Container, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
        <title>Register</title>
      </Head>
      <Container maxWidth="md">
        <Box className={classes.formContainer}>
          <Typography variant="h4" gutterBottom>
            Enter your information to register
          </Typography>
          <RegisterForm />
          <a href="/loginScreen">login</a>
        </Box>
      </Container>
    </div>
  );
};

export default registerScreen;
