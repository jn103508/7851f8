import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Link,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import bgImg from "./images/bg-img.png";
import bubble from "./images/bubble.svg";

export const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100vw",
    height: "100vh",
    backgroundColor: "white"
  },
  bgImg: {
    height: "100%",
    width: "auto",
    opacity: .2,
    '@media (max-width:1000px)': {
      display: "none",
    }
  },
  colorFilter: {
    position: "relative",
    backgroundImage: "linear-gradient(#1976d2, #9bc0ff)",
    height: "100%",
    '@media (max-width:1000px)': {
      display: "none"
    }
  },
  sloganContainer: {
    position: "absolute",
    top: "29%",
    width: "100%",
    textAlign: "center"
  },
  bubbleImg: {
    zIndex: 10,
    width: 100,
  },
  slogan: {
    marginTop: 40,
    color: "white",
    fontSize: 32,
  },
  mainContainer: {
    width: "calc(100% - 100vh/1.647)",
    '@media (max-width:1000px)': {
      margin: "0 auto",
      width: "100vw"
    }
  },
  topContainer: {
    alignItems: "center",
    padding: "40px 50px",
    justifyContent: "flex-end"
  },
  topHeader: {
    color: "#a6a6a6",
    fontSize: 15,
    padding: 10,
    '@media (max-width:480px)': {
      display: "none"
    }
  },
  topBtn: {
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(20,20,150,.1)",
    color: "#2196f3",
    padding: "16px 38px",
    marginLeft: "5%",
    '&:hover': {
      backgroundColor: "#f7f7f7"
    },
  },
  headerContainer: {
    width: "70%",
    display: "flex",
    justifyContent: "left",
    marginBottom: 10
  },
  header: {
    fontWeight: "bold",
    fontSize: "2em",
    '@media (max-width:360px)': {
      fontSize: "1.7em"
    }
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 55,
    '@media (max-height:720px)': {
      marginTop: 30
    },
    '@media (max-height:600px)': {
      marginTop: 10
    }
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "70%"
  },
  inputItemContainer: {
    width: "100%"
  },
  textField: {
    width: "100%",
    margin: "60px 0",
    "& .MuiFormLabel-root": {
      padding: "0px 4px",
      fontSize: "16px",
      color: "#a6a6a6"
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #d6d6d6"
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, -30px) scale(1)"
    },
    '@media (max-height:720px)': {
      margin: "40px 0"
    }
  },
  textInput: {
    padding: "8px 4px",
    fontSize: 16,

  },
  forgotPassword: {
    fontSize: 14,
    fontWeight: 500,
    color: "#2196f3",
    position: "absolute",
    right: "1%",
    bottom: "40%",
    zIndex: 10,
    '&:hover': {
      cursor: "pointer"
    }
  },
  passwordInput: {
    position: "relative",
    padding: "0px 4px",
    fontSize: 30,
  },
  submitBtn: {
    margin: "20px auto",
    padding: "14px 72px",
  }
}));


const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid className={classes.root} container>
      <Box className={classes.colorFilter}>
        <img className={classes.bgImg} src={bgImg} alt="backgroundImage" />
        <div className={classes.sloganContainer}>
          <img className={classes.bubbleImg} src={bubble} alt="bubbleImage" />
          <Typography className={classes.slogan}>Converse with anyone<br></br> with any language</Typography> 
        </div>
      </Box>
      <Box className={classes.mainContainer}>
        <Grid container item className={classes.topContainer}>
          <Typography className={classes.topHeader}>Don't have an account?</Typography>
          <Button 
            className={classes.topBtn}
            onClick={() => history.push("/register")}
            variant="contained"
            >
              Create Account
          </Button>
        </Grid>
        <form className={classes.form} onSubmit={handleLogin}>
          <Typography className={classes.headerContainer}><Typography className={classes.header} component="span">Welcome back!</Typography></Typography>
          <Grid className={classes.inputContainer}>
            <Grid className={classes.inputItemContainer}>
              <FormControl className={classes.inputItemContainer}>
                <TextField
                  InputLabelProps={{ required: false }}
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: classes.textInput,
                    },
                  }}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid className={classes.inputItemContainer}>
              <FormControl className={classes.inputItemContainer}>
                <Link className={classes.forgotPassword}>Forgot?</Link>
                <TextField
                  InputLabelProps={{ required: false }}
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: classes.passwordInput,
                    },
                  }}
                  label="Password"
                  aria-label="password"
                  type="password"
                  name="password"
                  required
                />
              </FormControl>
            </Grid>
            <Button className={classes.submitBtn} type="submit" variant="contained" size="large" color="primary">
              Login
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
