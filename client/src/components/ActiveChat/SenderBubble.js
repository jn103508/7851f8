import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import ImageBubble from "./ImageBubble";

const useStyles = makeStyles({
  root: props => ({
    display: "flex",
    flexDirection: props.attachments !== null && props.attachments.length > 1
      ? "column-reverse"
      : "column",
    alignItems: "flex-end"
  }),
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    margin: "2.5px 0"
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
    margin: "5px 0"
  }
});

const SenderBubble = (props) => {
  const classes = useStyles(props);
  const { time, text, attachments } = props;

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {attachments?.length > 0 && <ImageBubble attachments={attachments} text={text} user="sender" amount={attachments.length} />}
      <Box className={classes.bubble}>
        <Typography className={text && classes.text}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default SenderBubble;
