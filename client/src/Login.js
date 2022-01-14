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
  loginContainer: {
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
  registerContainer: {
    alignItems: "center",
    color: "lightgrey",
    padding: "2rem 3rem",
    justifyContent: "flex-end",
    '@media (max-width:900px)': {
      padding: "1rem 2rem"
    },
    '@media (max-width:720px)': {
      padding: "0.7rem 1.8rem"
    }
  },
  registerHeader: {
    color: "#a6a6a6",
    fontSize: "15px",
    '@media (max-width:720px)': {
      fontSize: "13px"
    },
    '@media (max-width:480px)': {
      fontSize: "12px"
    },
    '@media (max-width:320px)': {
      display: "none"
    }
  },
  registerBtn: {
    backgroundColor: "white",
    color: "#2196f3",
    padding: "16px 38px",
    marginLeft: "7%",
    '&:hover': {
      backgroundColor: "#f7f7f7"
    },
    '@media (max-width:900px)': {
      padding: "8px 19px"
    }
  },
  loginHeaderContainer: {
    width: "70%",
    display: "flex",
    justifyContent: "left",
    marginBottom: "10px"
  },
  loginHeader: {
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
    marginTop: "55px",
    '@media (max-width: 1200px)': {
      marginTop: "30px"
    },
    '@media (max-width:1000px)': {
      marginTop: "10px"
    },
    '@media (max-width:900px)': {
      marginTop: "0px"
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
    margin: "40px 0",
    "& .MuiFormLabel-root": {
      padding: "0px 4px",
      fontSize: "16px",
      color: "#a6a6a6"
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #d6d6d6"
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, -15px) scale(1)"
    },
    '@media (max-width:900px)': {
      margin: "30px 0"
    }
  },
  textInput: {
    padding: "8px 4px",
    fontSize: "16px",
    '@media (max-width: 900px)': {
      fontSize: "14px"
    }
  },
  forgotPassword: {
    fontSize: "13px",
    color: "#2196f3",
    position: "absolute",
    right: "3%",
    bottom: "36%",
    zIndex: "10",
    '&:hover': {
      cursor: "pointer"
    }
  },
  passwordInput: {
    position: "relative",
    padding: "0px 4px",
    fontSize: "30px",
    '@media (max-width: 900px)': {
      fontSize: "24px"
    }
  },
  loginBtn: {
    margin: "20px auto",
    padding: "14px 72px",
    '@media (max-width:900px)': {
      padding: "8px 41px",
    }
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
        <img className={classes.bgImg} src={bgImg} alt="backgroundImage"></img>
        <div className={classes.sloganContainer}>
          <img className={classes.bubbleImg} src={bubble} alt="bubbleImage"></img>
          <Typography className={classes.slogan}>Converse with anyone<br></br> with any language</Typography> 
        </div>
      </Box>
      <Box className={classes.loginContainer}>
        <Grid container item className={classes.registerContainer}>
          <Typography className={classes.registerHeader}>Don't have an account?</Typography>
          <Button 
            className={classes.registerBtn}
            onClick={() => history.push("/register")}
            variant="contained"
            >
              Create Account
          </Button>
        </Grid>
        <form className={classes.form} onSubmit={handleLogin}>
          <Typography className={classes.loginHeaderContainer}><Typography className={classes.loginHeader} component="span">Welcome back!</Typography></Typography>
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
            <Button className={classes.loginBtn} type="submit" variant="contained" size="large" color="primary">
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
