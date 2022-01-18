import React, { useState } from "react";
import { 
  FormControl, 
  FilledInput, 
  Dialog, 
  DialogTitle,
  DialogContent,
  Container,
  Button,
  Grid
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import imageIcon from "../../images/image-regular.svg";
import Image from './Image';

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    height: 70,
    width: "90%",
    backgroundColor: "#F4F6FA",
    borderRadius: "8px 0 0 8px"
  },
  imageIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
    height: "100%",
    borderRadius: "0 8px 8px 0",
    '&:hover': {
      cursor: "pointer",
      backgroundColor: "#D4D6DA"
    }
  },
  imageIcon: {
    width: "30px",
    opacity: "0.4"
  },
  dialogContainer: {
    '& .MuiPaper-root': {
      width: "60vw"
    }
  },
  container: {
    padding: 0,
    color: "#a6a6a6"
  },
  selectedImagesContainer: {
    maxHeight: "20vh",
    overflowY: "auto"
  },
  uploadedImagesTitle : {
    paddingLeft: 0
  },
  uploadedImages: {
    height: 70
  },
  btnContainer: {
    marginTop: 22
  },
  selectBtn: {
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(20,20,150,.1)",
    color: "#2196f3",
    padding: "10px 0",
    '&:hover': {
      backgroundColor: "#f7f7f7"
    },
  },
  uploadBtn: {
    padding: "10px 0"
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: attachments
    };
    await postMessage(reqBody);
    setText("");
    setAttachments([]);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleSelectedImageDelete = (index) => {
    const copySelectedAttachments = [...selectedAttachments];
    copySelectedAttachments.splice(index, 1);
    setSelectedAttachments(copySelectedAttachments);
  }

  const handleSelectedFile = event => {
    setSelectedAttachments([...selectedAttachments, ...event.target.files]);
  }

  const handleUpload = () => {
    const url = "https://api.cloudinary.com/v1_1/hatchway-images/image/upload";  
    const promises = selectedAttachments.map(async attachment => {
      const formData = new FormData();
      formData.append("file", attachment);
      formData.append("upload_preset", "rhbvvbla");
      const response = await fetch(url, {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      return data.url;
    });
    Promise.all(promises).then(url => {
      setAttachments([...attachments, ...url]);
    })
    setSelectedAttachments([]);
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl className={classes.inputContainer} fullWidth hiddenLabel>
        <Dialog className={classes.dialogContainer} open={open} onClose={handleClose}>
          <DialogTitle>Selected Images</DialogTitle>
          <DialogContent className={classes.dialogContentContainer}>
            <Container className={classes.container}>
              {selectedAttachments.length ? <Grid container className={classes.selectedImagesContainer}>{selectedAttachments.map((attachment, index) => (
                <Image key={index} onDelete={handleSelectedImageDelete} index={index} image={attachment} />))}</Grid> 
              : "Please select an image to upload."}
            </Container>
            {attachments.length ? <DialogTitle className={classes.uploadedImagesTitle}>Uploaded Images</DialogTitle> : ""}
            <Container className={classes.container}>
              {attachments.length ? <Grid spacing={2} container className={classes.selectedImagesContainer}>{attachments.map((attachment, index) => (
                <Grid key={index} item><img className={classes.uploadedImages} src={attachment} alt="uploadedImage"/></Grid>))}</Grid> 
              : ""}
            </Container>
            <Grid className={classes.btnContainer} container spacing={2}>
              <Grid item xs={6}>
                <input
                  onChange={handleSelectedFile}
                  accept="image/*"
                  className={classes.fileInput}
                  hidden
                  id="raisedButtonFile"
                  multiple
                  type="file"
                />
                <label htmlFor="raisedButtonFile">
                  <Button fullWidth variant="contained" component="span" className={classes.selectBtn}>
                    Select
                  </Button>
                </label> 
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" onClick={handleUpload} color="primary" className={classes.uploadBtn}>Upload</Button>
              </Grid>
            </Grid>
        </DialogContent>
        </Dialog>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
        <div onClick={handleOpen} className={classes.imageIconContainer}><img className={classes.imageIcon} src={imageIcon} alt="ImageIcon"></img></div>
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
