import React, { useMemo } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        left: 100,
        top: 20,
        height: 40,
        fontFamily: 'Roboto Condensed',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        textAlign: 'right',
        maxWidth: 'calc(100vw - 500px)',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        fontSize: 18,
    },
    name: {
        backgroundColor: '#DDD',
        padding: '4px 6px',
        display: 'inline-block',
    }
});

const maxLength = 3;
const getBacktrace = node => node ? [...getBacktrace(node.parent), node] : [];

function Breadcrumb({ focused }) {
    const backtrace = useMemo(() => getBacktrace(focused), [focused]);
    const clipped = backtrace.length > maxLength 
        ? backtrace.slice(backtrace.length - maxLength) : backtrace; 
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {focused ? clipped.map(({ name }, n) => <React.Fragment key={n}>
                {n > 0 && <span className={classes.arrow}>&gt;</span>}
                <span className={classes.name}>{name}</span>
            </React.Fragment>) : <span className={classes.name}>No Focus</span>}
        </div>
    )
}

export default Breadcrumb;
