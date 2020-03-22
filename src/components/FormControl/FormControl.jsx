import React from 'react';
import mod from './FormControl.module.css';

export const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={mod.formControl + ' ' + (hasError && mod.error)}>
            <input {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
};