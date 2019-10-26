import React from 'react';
import { FlameGraph } from './flame';
import useWindowSize from '@rehooks/window-size';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    left: 100,
    top: 80,
    right: 400,
    bottom: 20,
    // backgroundColor: '#333333',
  },
  rect: {
    // stroke: '#333333',
  },
  label: {
    fontFamily: '\'Roboto Condensed\'',
    color: '#000000',
    fontWeight: 400,
  },
});

function Stack({ data, setFocused }) {
  const { innerWidth, innerHeight } = useWindowSize();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FlameGraph
        width={innerWidth - 500}
        height={innerHeight - 100}
        data={data}
        classes={{ rect: classes.rect, label: classes.label }}
        onChange={setFocused}/>
    </div>
  );
}

export default Stack;
