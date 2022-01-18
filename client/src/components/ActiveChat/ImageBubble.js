import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Dialog } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  senderImage: {
    height: "200px",
    borderRadius: "10px 10px 0 0",
    marginLeft: "10px",
    cursor: "pointer",
  },
  otherUserImage: {
    height: "200px",
    borderRadius: "10px 10px 0 0",
    marginRight: "10px",
    cursor: "pointer",
  },
  imageWithNoMessage: {
    height: "200px",
    borderRadius: "10px 10px 0 10px",
  }
}));

const ImageBubble = (props) => {
  const { attachments, text, user } = props;
  const classes = useStyles();

  const [imageOpen, setImageOpen] = useState(false);
  const [clickedImage, setClickedImage] = useState("");

  const handleImageClick = (img) => {
    setImageOpen(true);
    setClickedImage(img);
  };

  const handleClose = () => {
    setImageOpen(false);
  };

  return (
    <Box>
      {attachments.length
        ? attachments.map((attachment, index) => (
            <img
              key={index}
              onClick={() => handleImageClick(attachment)}
              className={
                text
                  ? user==="senderImage" ? `${classes.senderImage}`: `${classes.otherUserImage}`
                  : `${classes.image} ${classes.imageWithNoMessage}`
              }
              src={attachment}
              alt="senderImage"
            />
          ))
        : ""}
      <Dialog open={imageOpen} onClose={handleClose}>
        <img src={clickedImage} alt="focusedImage"></img>
      </Dialog>
    </Box>
  );
};

export default ImageBubble;
