import React, { useMemo, useState, useCallback } from 'react';
import State from './State';
import Load from './Load';
import CallGraph from './CallGraph';
import Focused from './Focused';
import Hovered from './Hovered';
import { makeStyles } from '@material-ui/styles';

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
    }
});

class Profiler {
    constructor() {
        this.status = 'profiling';
        this.loads = [{ value: 1.0 }];
    }
}

function App() {
    const classes = useStyles();
    const profiler = useMemo(() => new Profiler(/* options */), []);
    const [focused, setFocused] = useState(null);
    const [hovered, setHovered] = useState(null);
    const onFocus = useCallback(node => setFocused(node), []);
    const onEnter = useCallback(node => setHovered(node), []);
    const onExit = useCallback(() => setHovered(null), []);
    return <div className={classes.root}>
        <State profiler={profiler} />
        <Load profiler={profiler} />
        <CallGraph profiler={profiler} onFocus={onFocus} onEnter={onEnter} onExit={onExit} />
        <div className={classes.rightPanel}>
            <Focused focused={focused} />
            {hovered && <Hovered hovered={hovered} />}
        </div>
    </div>;
}

export default App;