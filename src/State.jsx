import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        left: 0,
        top: 0,
    },
    subtitle: {
        fontWeight: 200,
        fontSize: '1.125rem',
        lineHeight: 1,
        marginBottom: '0.875rem',
        letterSpacing: 3,
    },
    text: {
        fontWeight: 500,
        fontSize: '2rem',
        textTransform: 'uppercase',
    },
})

function State({ status }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.subtitle}>STATE</div>
            <div className={classes.text}>{status}</div>
        </div>
    );
}

export default State;