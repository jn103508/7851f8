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
import { login } from "./store/utils/thunkCreators";
import { useStyles as useSharedStyles } from "./sharedStyles";
import bgImg from "./images/bg-img.png";
import bubble from "./images/bubble.svg";

const Login = (props) => {
  const classes = useSharedStyles();
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
        <Box className={classes.sloganContainer}>
          <img className={classes.bubbleImg} src={bubble} alt="bubbleImage" />
          <Typography className={classes.slogan}>Converse with anyone<br></br> with any language</Typography> 
        </Box>
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
