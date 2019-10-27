import React, { useState, useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useProfiler, merge } from './profiler';
import State from './State';
import Load from './Load';
import CallGraph from './CallGraph';
import Timeline from './Timeline';
import Focused from './Focused';
import Hovered from './Hovered';
import Duration from './Duration';
import Action from './Action';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        left: '50vw',
        top: '50vh',
        width: '90rem',
        height: '48rem',
        marginLeft: '-45rem',
        marginTop: '-24rem',
        fontFamily: 'DINCOND',
        color: '#FFFFFF',
    },
    rightPanel: {
        position: 'absolute',
        right: 0,
        width: '36rem',
    },
});

function App() {
    const classes = useStyles();
    const {
        status, backtraces, loads, startTime, stopTime, start: startProfiler, stop: stopProfiler,
    } = useProfiler();

    const [focused, setFocused] = useState([]);
    const [hovered, setHovered] = useState([]);
    const onFocus = useCallback(node => setFocused(node), []);
    const onEnter = useCallback(node => setHovered(node), []);
    const onExit = useCallback(() => setHovered([]), []);

    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const profileStart = startTime;
    const realStart = start || startTime;
    const profileEnd = status === 'stopped' ? stopTime : new Date();
    const realEnd = end || profileEnd;
    const filtered = backtraces.filter(({ timestamp: time }) => time >= realStart && time <= realEnd);
    const merged = useMemo(() => merge(filtered), [filtered]);

    return <div className={classes.root}>
        <State status={status} />
        <Load loads={loads} />
        {filtered.length > 0 && (
            <CallGraph onFocus={onFocus} onEnter={onEnter} onExit={onExit} status={status} backtraces={merged} />
        )}
        {status !== 'idle' && (
            <Timeline loads={loads} status={status} profileStart={profileStart} profileEnd={profileEnd} realStart={realStart} realEnd={realEnd} />
        )}
        <div className={classes.rightPanel}>
            <Focused backtraces={merged} focused={focused} />
            <Hovered backtraces={merged} hovered={hovered} />
        </div>
        <Duration status={status} profileStart={profileStart} profileEnd={profileEnd} setStart={setStart} setEnd={setEnd} />
        <Action status={status} startProfiler={startProfiler} stopProfiler={stopProfiler} />
    </div>;
}

export default App;