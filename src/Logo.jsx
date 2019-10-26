import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        left: 20,
        top: 20,
        width: 60,
        height: 60,
        backgroundColor: '#000000',
    },
});

function Logo() {
    const classes = useStyles();
    return (
        <div className={classes.root}/>
    );
}

export default Logo;
