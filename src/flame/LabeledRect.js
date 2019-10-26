import React from 'react';
import { minWidthToDisplayText, textHeight } from './constants';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  g: {
    transition: 'all ease-in-out 200ms',
  },
  
  rect: {
    cursor: 'pointer',
    stroke: '#ffffff',
    transition: 'all ease-in-out 200ms',
  },
  
  foreignObject: {
    transition: 'all ease-in-out 200ms',
    display: 'block',
    pointerEvents: 'none',
  },
  
  div: {
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '18px',
    fontFamily: '\'Roboto Condensed\'',
    color: '#000000',
    marginLeft: '4px',
    marginRight: '4px',
    lineHeight: 1.5,
    padding: 0,
    fontWeight: 400,
    textAlign: 'left',
    transition: 'all ease-in-out 200ms',
    userSelect: 'none',
  }
});

function LabeledRect({
  backgroundColor,
  height,
  isDimmed = false,
  label,
  onClick,
  tooltip,
  width,
  x,
  y,
}) {
  const styles = useStyles();
  return (
    <g className={styles.g} transform={`translate(${x},${y})`}>
      <title>{tooltip != null ? tooltip : label}</title>
      <rect width={width} height={height} fill="white" className={styles.rect} />
      <rect
        width={width}
        height={height}
        fill={backgroundColor}
        onClick={onClick}
        className={styles.rect}
        style={{
          opacity: isDimmed ? 0.5 : 1,
        }}
      />
      {width >= minWidthToDisplayText && (
        <foreignObject
          width={width}
          height={height}
          className={styles.foreignObject}
          style={{
            opacity: isDimmed ? 0.75 : 1,
            paddingLeft: x < 0 ? -x : 0,
          }}
          y={height < textHeight ? -textHeight : 0}
        >
          <div className={styles.div}>
            {label}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

export default LabeledRect;