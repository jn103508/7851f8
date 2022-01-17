import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { register } from "./store/utils/thunkCreators";
import { useStyles as useSharedStyles } from "./sharedStyles";
import bgImg from "./images/bg-img.png";
import bubble from "./images/bubble.svg";

const useStyles = makeStyles(() => ({
  topBtn: {
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(20,20,150,.1)",
    color: "#2196f3",
    padding: "16px 52px",
    marginLeft: "5%",
    '&:hover': {
      backgroundColor: "#f7f7f7"
    }
  },
  header: {
    fontWeight: "bold",
    fontSize: "2em",
    '@media (max-width:420px)': {
      fontSize: "1.6em"
    }
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 55,
    '@media (max-height:820px)': {
      marginTop: 20
    },
    '@media (max-height:720px)': {
      marginTop: 0
    }
  },
  textField: {
    width: "100%",
    margin: "30px 0",
    "& .MuiFormLabel-root": {
      padding: "0px 4px",
      fontSize: 16,
      color: "#a6a6a6"
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #d6d6d6"
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, -15px) scale(1)"
    },
    '@media (max-height:820px)': {
      margin: "20px 0"
    }
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const sharedClass = useSharedStyles();
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid className={sharedClass.root} container justify="space-between">
      <Box className={sharedClass.colorFilter}>
        <img className={sharedClass.bgImg} src={bgImg} alt="backgroundImage" />
        <div className={sharedClass.sloganContainer}>
          <img className={sharedClass.bubbleImg} src={bubble} alt="bubbleImage" />
          <Typography className={sharedClass.slogan}>Converse with anyone<br></br> with any language</Typography> 
        </div>
      </Box>
      <Box className={sharedClass.mainContainer}>
        <Grid container item className={sharedClass.topContainer}>
          <Typography className={sharedClass.topHeader}>Already have an account?</Typography>
          <Button 
            className={classes.topBtn} 
            variant="contained" 
            onClick={() => history.push("/login")}
            >
              Login
          </Button>
        </Grid>
        <form className={classes.form} onSubmit={handleRegister}>
          <Typography className={sharedClass.headerContainer}><Typography className={classes.header} component="span">Create an account.</Typography></Typography>
          <Grid className={sharedClass.inputContainer}>
            <Grid className={sharedClass.inputItemContainer}>
              <FormControl className={sharedClass.inputItemContainer}>
                <TextField
                  InputLabelProps={{ required: false }}
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: sharedClass.textInput,
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
            <Grid className={sharedClass.inputItemContainer}>
              <FormControl className={sharedClass.inputItemContainer}>
                <TextField
                  InputLabelProps={{ required: false }}
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: sharedClass.textInput,
                    },
                  }}
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid className={sharedClass.inputItemContainer}>
              <FormControl className={sharedClass.inputItemContainer} error={!!formErrorMessage.confirmPassword}>
                <TextField
                  InputLabelProps={{ required: false }}
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: sharedClass.passwordInput,
                    },
                  }}
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid className={sharedClass.inputItemContainer}>
              <FormControl className={sharedClass.inputItemContainer} error={!!formErrorMessage.confirmPassword}>
                <TextField
                  InputLabelProps={{ required: false }}
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: sharedClass.passwordInput,
                    },
                  }}
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Button className={sharedClass.submitBtn} color="primary" type="submit" variant="contained" size="large">
              Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
