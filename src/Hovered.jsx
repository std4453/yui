import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { formatInt } from './utils';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        width: '100%',
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
        fontSize: '3rem',
        width: '24rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    samples: {
        position: 'absolute',
        right: 0,
        width: '10rem',
        top: 0,
    },
    dim: {
        opacity: 0.3,
    },
});

function Hovered({ hovered }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.subtitle}>HOVERED</div>
            <div className={classes.text}>
                {hovered.name}
            </div>
            <div className={classes.samples}>
                <div className={classes.subtitle}>SAMPLES</div>
                <div className={classes.text}>
                    {formatInt(hovered.value)}
                    <span className={classes.dim}>/</span>
                    {(0.123 * 100).toFixed(1)}
                    <span className={classes.dim}>%</span>
                </div>
            </div>
        </div>
    );
}

export default Hovered;