import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";
import ImageBubble from "./ImageBubble";

const useStyles = makeStyles(() => ({
  root: props => ({
    display: "flex",
    flexDirection: props.attachments !== null && props.attachments.length > 1
      ? "column-reverse"
      : "column",
    alignItems: "flex-start"
  }),
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  usernameDate: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    margin: "2.5px 0"
  },
  bubble: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "0 10px 10px 10px",
    margin: "5px 0"
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    padding: 8
  }
}));

const OtherUserBubble = (props) => {
  const classes = useStyles(props);
  const { text, time, otherUser, attachments } = props;
  return (
    <Box className={classes.root}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Typography className={classes.usernameDate}>
        {otherUser.username} {time}
      </Typography>
      {attachments !== null && attachments.length > 0 && <ImageBubble attachments={attachments} text={text} user="other" amount={attachments.length} />}
      <Box className={classes.bubble}>
        <Typography className={text && classes.text}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default OtherUserBubble;

