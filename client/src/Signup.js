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
import bgImg from "./images/bg-img.png";
import bubble from "./images/bubble.svg";

const useStyles = makeStyles(() => ({
  '@global': {
    body: {
      backgroundColor: "#f0f0f0"
    }
  },
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "1150px",
    height: "800px",
    backgroundColor: "white",
    boxShadow: "0 0 8px 2px rgba(0,0,0,0.2)",
    borderRadius: "4px",
    '@media (max-width:1200px)': {
      width: "980px",
      height: "700px"
    },
    '@media (max-width:1000px)': {
      width: "870px",
      height: "600px"
    },
    '@media (max-width:900px)': {
      width: "704px",
      height: "450px"
    },
    '@media (max-width:720px)': {
      flexDirection: "column-reverse",
      height: "882px",
      width: "375px",
      overflow: "hidden",
      top: "0",
      left: "50%",
      transform: "translate(-50%, 0%)",
    },
    '@media (max-width:480px)': {
      width: "100vw",
      borderRadius: "0"
    }
  },
  bgImg: {
    height: "800px",
    borderRadius: "4px 0 0 4px",
    opacity: "0.2",
    '@media (max-width:1200px)': {
      height: "700px"
    },
    '@media (max-width:1000px)': {
      height: "600px"
    },
    '@media (max-width:900px)': {
      height: "450px"
    },
    '@media (max-width:720px)': {
      height: "618px",
      borderRadius: "0 0 4px 4px"
    },
    '@media (max-width:480px)': {
      width: "100vw",
      height: "auto",
      borderRadius: "0"
    }
  },
  colorFilter: {
    position: "relative",
    backgroundImage: "linear-gradient(#1976d2, #9bc0ff)",
    height: "800px",
    borderRadius: "4px 0 0 4px",
    '@media (max-width:1200px)': {
      height: "700px"
    },
    '@media (max-width:1000px)': {
      height: "600px"
    },
    '@media (max-width:900px)': {
      height: "450px"
    },
    '@media (max-width:720px)': {
      width: "375px",
      borderRadius: "0 0 4px 4px"
    },
    '@media (max-width:480px)': {
      width: "100vw",
      borderRadius: "0"
    }
  },
  sloganContainer: {
    position: "absolute",
    top: "29%",
    width: "100%",
    textAlign: "center"
  },
  bubbleImg: {
    zIndex: "10",
    '@media (max-width:900px)': {
      width: "50px"
    }
  },
  slogan: {
    marginTop: "40px",
    color: "white",
    fontSize: "1.7rem",
    '@media (max-width:900px)': {
      marginTop: "20px",
      fontSize: "1.2rem"
    }
  },
  registerContainer: {
    width: "660px",
    '@media (max-width:1200px)': {
      width: "550px"
    },
    '@media (max-width:1000px)': {
      width: "500px"
    },
    '@media (max-width:900px)': {
      width: "430px"
    },
    '@media (max-width:720px)': {
      width: "375px"
    },
    '@media (max-width:480px)': {
      width: "100vw"
    }
  },
  loginContainer: {
    alignItems: "center",
    color: "lightgrey",
    padding: "2rem 3rem",
    justifyContent: "flex-end",
    '@media (max-width:1000px)': {
      padding: "1rem 2rem"
    },
    '@media (max-width:900px)': {
      padding: ".6rem 1.2rem"
    },
    '@media (max-width:720px)': {
      padding: "0.7rem 1.8rem"
    }
  },
  loginHeader: {
    color: "#a6a6a6",
    fontSize: "15px",
    '@media (max-width:480px)': {
      fontSize: "12px"
    },
    '@media (max-width:320px)': {
      display: "none"
    }
  },
  loginBtn: {
    backgroundColor: "white",
    color: "#2196f3",
    padding: "16px 50px",
    marginLeft: "7%",
    '&:hover': {
      backgroundColor: "#f7f7f7"
    },
    '@media (max-width:900px)': {
      padding: "8px 25px"
    }
  },
  registerHeaderContainer: {
    width: "70%",
    display: "flex",
    justifyContent: "left",
    marginBottom: "7px",
  },
  registerHeader: {
    fontWeight: "bold",
    fontSize: "2em",
    '@media (max-width:900px)': {
      fontSize: "1.5em"
    },
    '@media (max-width:720px)': {
      fontSize: "1.3em"
    }
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "45px",
    '@media (max-width: 1200px)': {
      marginTop: "11px"
    },
    '@media (max-width:1000px)': {
      marginTop: "0px"
    },
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
    margin: "26px 0",
    "& .MuiFormLabel-root": {
      padding: "0px 4px",
      fontSize: "16px",
      color: "#a6a6a6"
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #d6d6d6"
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, -13px) scale(1)"
    },
    '@media (max-width:1000px)': {
      margin: "20px 0",
      "& .MuiInputLabel-shrink": {
        transform: "translate(0, -4px) scale(1)"
      },
    },
    '@media (max-width:900px)': {
      margin: "12px 0",
      "& .MuiInputLabel-shrink": {
        transform: "translate(0, 1px) scale(1)"
      },
      "& .MuiFormLabel-root": {
        fontSize: "14px",
      },
    },
    '@media (max-width:720px)': {
      margin: "9px 0"
    }
  },
  textInput: {
    padding: "8px 4px",
    fontSize: "16px",
    '@media (max-width: 900px)': {
      fontSize: "14px"
    }
  },
  passwordInput: {
    padding: "0px 4px",
    fontSize: "30px",
    '@media (max-width: 900px)': {
      fontSize: "24px"
    }
  },
  createBtn: {
    margin: "20px auto",
    padding: "14px 72px",
    '@media (max-width:900px)': {
      padding: "8px 41px",
      margin: "5px auto"
    }
  }
}));

const Login = (props) => {
  const classes = useStyles();
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
    <Grid className={classes.root} container justify="space-between">
      <Box className={classes.colorFilter}>
        <img className={classes.bgImg} src={bgImg} alt="backgroundImage"></img>
        <div className={classes.sloganContainer}>
          <img className={classes.bubbleImg} src={bubble} alt="bubbleImage"></img>
          <Typography className={classes.slogan}>Converse with anyone<br></br> with any language</Typography> 
        </div>
      </Box>
      <Box className={classes.registerContainer}>
        <Grid container item className={classes.loginContainer}>
          <Typography className={classes.loginHeader}>Already have an account?</Typography>
          <Button 
            className={classes.loginBtn} 
            variant="contained" 
            onClick={() => history.push("/login")}
            >
              Login
          </Button>
        </Grid>
        <form className={classes.form} onSubmit={handleRegister}>
          <Typography className={classes.registerHeaderContainer}><Typography className={classes.registerHeader} component="span">Create an account.</Typography></Typography>
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
                <TextField
                  InputLabelProps={{ required: false }}
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: classes.textInput,
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
            <Grid className={classes.inputItemContainer}>
              <FormControl className={classes.inputItemContainer} error={!!formErrorMessage.confirmPassword}>
                <TextField
                  InputLabelProps={{ required: false }}
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: classes.passwordInput,
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
            <Grid className={classes.inputItemContainer}>
              <FormControl className={classes.inputItemContainer} error={!!formErrorMessage.confirmPassword}>
                <TextField
                  InputLabelProps={{ required: false }}
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: classes.passwordInput,
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
            <Button className={classes.createBtn} color="primary" type="submit" variant="contained" size="large">
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
