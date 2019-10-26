import React, { useCallback } from 'react';
import { minWidthToDisplayText, textHeight } from './constants';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  g: {
    transition: 'all ease 120ms',
  },
  
  rect: {
    cursor: 'pointer',
    stroke: '#ffffff',
    transition: 'all ease 120ms',
    strokeWidth: 3,
  },
  
  foreignObject: {
    transition: 'all ease 120ms',
    display: 'block',
    pointerEvents: 'none',
  },
  
  label: {
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '18px',
    marginLeft: '8px',
    marginRight: '8px',
    lineHeight: 1.5,
    padding: 0,
    // textAlign: 'left',
    // transition: 'all ease-in-out 200ms',
    userSelect: 'none',
  }
});

function LabeledRect(props) {
  const {
    backgroundColor,
    height,
    isDimmed = false,
    label,
    onClick,
    tooltip,
    width,
    x,
    y,
    onEnter,
    onExit,
    node
  } = props;
  const styles = useStyles(props);
  const onMouseEnter = useCallback(() => onEnter && onEnter(node), [onEnter, node]);
  const onMouseExit = useCallback(() => onExit && onExit(node), [onExit, node]);
  return (
    <g
      className={styles.g}
      transform={`translate(${x},${y})`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseExit}
    >
      <title>{tooltip != null ? tooltip : label}</title>
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
            opacity: isDimmed ? 0.3 : 1,
            paddingLeft: x < 0 ? -x : 0,
          }}
          y={height < textHeight ? -textHeight : 0}
        >
          <div className={styles.label}>
            {label}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

export default LabeledRect;