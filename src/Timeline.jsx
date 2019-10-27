import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { VictoryArea, VictoryChart } from 'victory';
import Draggable from 'react-draggable';
import useWindowSize from '@rehooks/window-size';
import { getREM } from './utils';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        left: 0,
        bottom: '1.5rem',
        width: '46rem',
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
    opaque: {
        position: 'absolute',
        bottom: 0,
        height: '5rem',
        backgroundColor: '#262626',
        opacity: 0.5,
    },
    bar: {
        position: 'absolute',
        // bottom: 0,
        // height: '4.2rem',
        height: '100%',
        width: 2,
        marginLeft: -1,
        marginRight: -1,
        backgroundColor: '#FFFFFF',
        transition: 'all linear 80ms',
        '&:hover': {
            width: 6,
            marginLeft: -3,
            marginRight: -3,
        },
        cursor: 'pointer',
    },
    selected: {
        position: 'absolute',
        bottom: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #FFF 10px, #FFF 11px)',
        height: '4.2rem',
        opacity: 0.5,
    },
    barContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '4.2rem',
    }
});

function Timeline({ loads, profileStart, profileEnd, realStart, realEnd, setStart, setEnd }) {
    const { innerWidth } = useWindowSize();
    const rem = getREM(innerWidth);
    const classes = useStyles();
    const leftPct = `${((realStart - profileStart) / (profileEnd - profileStart) * 100).toFixed(2)}%`;
    const rightPct = `${((profileEnd - realEnd) / (profileEnd - profileStart) * 100).toFixed(2)}%`;
    const onLeftDrag = useCallback((_, data) => {
        const { x } = data;
        const t = x / rem / 46;
        const newStart = new Date(profileStart.getTime() + t * (profileEnd - profileStart));
        setStart(newStart);
    }, [profileStart, profileEnd, setStart, rem]);
    const onRightDrag = useCallback((_, data) => {
        const { x } = data;
        const t = x / rem / 46;
        const newEnd = new Date(profileStart.getTime() + t * (profileEnd - profileStart));
        setEnd(newEnd);
    }, [profileStart, profileEnd, setEnd, rem]);
    return (
        <div className={classes.root}>
            <svg height="0">
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </linearGradient>
                </defs>
            </svg>
            <div className={classes.subtitle}>TIMELINE</div>
            <VictoryChart padding={0} width={14 * 46} height={14 * 4}>
                <VictoryArea
                    data={loads}
                    x="timestamp"
                    y="value"
                    style={{
                        data: {
                            fill: 'url(#gradient1)',
                            stroke: '#FFFFFF',
                        }
                    }} />
            </VictoryChart>
            <div
                className={classes.opaque}
                style={{
                    left: 0,
                    width: leftPct,
                }} />
            <div
                className={classes.opaque}
                style={{
                    right: 0,
                    width: rightPct,
                }} />
            <div
                className={classes.selected}
                style={{
                    left: leftPct,
                    right: rightPct,
                }} />
            <div className={classes.barContainer}>
                <Draggable
                    axis="x"
                    bounds="parent"
                    position={{ x: (realStart - profileStart) / (profileEnd - profileStart) * rem * 46, y: 0 }}
                    onDrag={onLeftDrag}>
                    <div className={classes.bar} />
                </Draggable>
                <Draggable
                    axis="x"
                    bounds="parent"
                    position={{ x: (realEnd - profileStart) / (profileEnd - profileStart) * rem * 46, y: 0 }}
                    onDrag={onRightDrag}>
                    <div className={classes.bar} />
                </Draggable>
            </div>
        </div>
    );
}

export default Timeline;