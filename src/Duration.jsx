import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from './Button';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        right: 0,
        width: '36rem',
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
})

function Duration({ status, profileStart: startTime, profileEnd: stopTime, setStart, setEnd }) {
    const classes = useStyles();
    const idle = status === 'idle';
    const length = stopTime - startTime;
    const set1m = useCallback(() => {
        setStart(stopTime - 1 * 60 * 1000);
        setEnd(stopTime);
    }, [setStart, setEnd, stopTime]); 
    const set5m = useCallback(() => {
        setStart(stopTime - 5 * 60 * 1000);
        setEnd(stopTime);
    }, [setStart, setEnd, stopTime]); 
    const set15m = useCallback(() => {
        setStart(stopTime - 15 * 60 * 1000);
        setEnd(stopTime);
    }, [setStart, setEnd, stopTime]); 
    const setAll = useCallback(() => {
        setStart(null);
        setEnd(null);
    }, [setStart, setEnd]);
    return (
        <div className={classes.root}>
            <div className={classes.subtitle}>DURATION</div>
            <div className={classes.buttons}>
                <Button disabled={idle || length < 1 * 60 * 1000} onClick={set1m}>1m</Button>
                <Button disabled={idle || length < 5 * 60 * 1000} onClick={set5m}>5m</Button>
                <Button disabled={idle || length < 15 * 60 * 1000} onClick={set15m}>15m</Button>
                <Button disabled={idle} onClick={setAll}>ALL</Button>
            </div>
        </div>
    );
}

export default Duration;