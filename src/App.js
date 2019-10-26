import React from 'react';
import { FlameGraph } from './flame';
import useWindowSize from '@rehooks/window-size';
import data from './test.json';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    padding: 20,
  },
  label: {
    fontFamily: '\'Roboto Condensed\'',
    color: '#000000',
    fontWeight: 400,
  },
});

function App() {
  const { innerWidth, innerHeight } = useWindowSize();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <FlameGraph
        width={innerWidth - 40}
        height={innerHeight - 40}
        data={data}
        classes={{ label: classes.label }}/>
    </div>
  );
}

export default App;
