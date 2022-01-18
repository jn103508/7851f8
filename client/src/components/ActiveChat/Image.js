import React from 'react';
import { Container, Typography, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    imageSelectedContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
        padding: 0
    },
    imageHeader: {
        width: "92%",
    },
    deleteBtn: {
        width: "8%",
        color: "#cacaca",
        fontSize: 16,
        fontWeight: "200"
    }
}));

const Image = (props) => {
    const { onDelete, index, image } = props;
    const classes= useStyles();

    return (
        <Container className={classes.imageSelectedContainer}>
            <Typography className={classes.imageHeader}>{image.name}</Typography>
            <Button onClick={() => onDelete(index)} variant="text" className={classes.deleteBtn}>x</Button>
        </Container>
    )
}

export default Image;