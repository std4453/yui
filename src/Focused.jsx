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
    spacing: {
        marginTop: '2.5rem',
    },
    spacing2: {
        marginTop: '3.5rem',
    },
    attr: {
        marginBottom: '0.25rem',
    },
    key: {
        padding: '0 0.5625rem',
        fontSize: '1.5rem',
        lineHeight: 1.1,
        backgroundColor: '#4E4E4E',
        textTransform: 'uppercase',
        display: 'inline-block',
    },
    value: {
        padding: '0 0.5625rem',
        fontSize: '1.5rem',
        lineHeight: 1.1,
        display: 'inline-block',
    },
});

function Focused({ focused }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.subtitle}>SELECTED</div>
            <div className={classes.text}>
                {focused ? focused.name : 'N/A'}
            </div>
            <div className={classes.samples}>
                <div className={classes.subtitle}>SAMPLES</div>
                <div className={classes.text}>
                    {focused ? formatInt(focused.value) : '-'}
                    <span className={classes.dim}>/</span>
                    {focused ? (0.123 * 100).toFixed(1) : '-'}
                    <span className={classes.dim}>%</span>
                </div>
            </div>
            <div className={classes.spacing} />
            {focused && [
                { key: 'address', value: '0xDEADCAFE' }
            ].map(({ key, value }, n) => (
                <div className={classes.attr} key={n}>
                    <span className={classes.key}>{key}</span>
                    <span className={classes.value}>{value}</span>
                </div>
            ))}
            <div className={classes.spacing2} />
        </div>
    );
}

export default Focused;