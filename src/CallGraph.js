import React, { useMemo, useCallback } from 'react';
import useWindowSize from '@rehooks/window-size';
import { makeStyles } from '@material-ui/styles';
import { merge } from './profiler';
import { FlameGraph } from './flame';
import { getREM, convertNode } from './utils';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    left: 0,
    top: '9.5rem',
    width: '16rem',
    bottom: '9rem',
  },
  subtitle: {
    fontWeight: 200,
    fontSize: '1.125rem',
    lineHeight: 1,
    marginBottom: '0.875rem',
    letterSpacing: 3,
  },
  rect: {
    stroke: '#262626',
    '&:hover': {
      fill: '#616161'
    }
  },
  label: {
    color: '#FFFFFF',
    fontSize: '1.6rem',
  },
});

function CallGraph({ onFocus, onEnter, onExit, status, backtraces }) {
  const { innerWidth } = useWindowSize();
  const rem = getREM(innerWidth);
  const classes = useStyles();
  const started = status !== 'idle';
  
  // const backtraces = profiler.backtraces.filter(({ time }) => time >= realStart && time <= realEnd);
  const data = useMemo(() => backtraces.transform(), [backtraces]);
  const onChange = useCallback((node) => onFocus(convertNode(node)), [onFocus]);
  const onMouseEnter = useCallback((node) => onEnter(convertNode(node)), [onEnter]);

  return (
    <div className={classes.root}>
      <div className={classes.subtitle}>CALL GRAPH</div>
      {started && <FlameGraph
        width={46 * rem}
        height={26 * rem}
        data={data}
        classes={{ rect: classes.rect, label: classes.label }}
        onChange={onChange}
        onEnter={onMouseEnter}
        onExit={onExit}/>}
    </div>
  );
}

export default CallGraph;
