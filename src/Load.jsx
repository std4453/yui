import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        left: '13.5rem',
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
    },
})

function Load({ loads }) {
    const classes = useStyles();
    const { value } = loads[loads.length - 1] || {};
    return (
        <div className={classes.root}>
            <div className={classes.subtitle}>CPU LOAD</div>
            <div className={classes.text}>{value ? value.toFixed(3) : '-'}/1min</div>
        </div>
    );
}

export default Load;