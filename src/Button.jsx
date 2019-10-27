import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';

const useStyles = makeStyles({
    root: {
        width: '4rem',
        height: '4rem',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        transition: 'background-color linear 120ms',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&$disabled': {
            '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
            opacity: 0.3,
            cursor: 'not-allowed',
        },
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '0.5rem',
        fontSize: '2rem',
        lineHeight: 1,
        cursor: 'pointer',
    },
    disabled: {},
});

function Button(props) {
    const { disabled, children, onClick } = props;
    const classes = useStyles(props);
    return (
        <div 
            className={classNames(classes.root, { [classes.disabled]: disabled })}
            onClick={disabled ? null : onClick}>
            {children}
        </div>
    );
}

export default Button;