import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Dialog } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  image: props => ({
    margin: props.user === 'sender' 
      ? "0 0 0 10px"
      : "0 10px 0 0", 
    height: "200px",
    borderRadius: props.amount === 1 && props.text.length
      ? "10px 10px 0px 0px"
      : "10px 10px 0 10px",
    cursor: "pointer",
  }),
  imageWithNoMessage: {
    height: "200px",
    borderRadius: "10px 10px 0 10px",
  },
}));

const ImageBubble = (props) => {
  const { attachments } = props;
  const classes = useStyles(props);

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
      {attachments.length > 0 &&
        attachments.map((attachment, index) => (
          <img
            key={index}
            onClick={() => handleImageClick(attachment)}
            className={classes.image}
            src={attachment}
            alt="senderImage"
          />
        ))}
      <Dialog open={imageOpen} onClose={handleClose}>
        <img src={clickedImage} alt="focusedImage"/>
      </Dialog>
    </Box>
  );
};

export default ImageBubble;
