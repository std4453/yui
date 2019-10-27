import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from './Button';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        right: 0,
        width: '12rem',
        bottom: '1.5rem',
    },
    subtitle: {
        fontWeight: 200,
        fontSize: '1.125rem',
        lineHeight: 1,
        marginBottom: '0.875rem',
        letterSpacing: 3,
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    play: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderLeftColor: '#FFFFFF',
        borderWidth: '0.75rem 0 0.75rem 0.94rem',
        marginLeft: '0.1rem',
    },
    stop: {
        width: '1rem',
        height: '1rem',
        backgroundColor: '#FFFFFF',
    },
})

function Action({ status, startProfiler, stopProfiler }) {
    const classes = useStyles();
    const start = useCallback(() => startProfiler(50), [startProfiler]);
    const stop = useCallback(() => stopProfiler(), [stopProfiler]);
    return (
        <div className={classes.root}>
            <div className={classes.subtitle}>ACTION</div>
            <div className={classes.buttons}>
                <Button disabled={status === 'profiling'} onClick={start}>
                    <div className={classes.play} />
                </Button>
                <Button disabled={status !== 'profiling'} onClick={stop}>
                    <div className={classes.stop} />
                </Button>
            </div>
        </div>
    );
}

export default Action;