import React from 'react';
import useWindowSize from '@rehooks/window-size';
import { makeStyles } from '@material-ui/styles';
import { FlameGraph } from './flame';
import { getREM } from './utils';
import data from './test.json';

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

function CallGraph({ onFocus, onEnter, onExit }) {
  const { innerWidth } = useWindowSize();
  const rem = getREM(innerWidth);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.subtitle}>CALL GRAPH</div>
      <FlameGraph
        width={46 * rem}
        height={29.5 * rem}
        data={data}
        classes={{ rect: classes.rect, label: classes.label }}
        onChange={onFocus}
        onEnter={onEnter}
        onExit={onExit}/>
    </div>
  );
}

export default CallGraph;
