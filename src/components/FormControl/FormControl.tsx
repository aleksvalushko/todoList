import React from 'react';
import mod from './FormControl.module.sass';

export const Input = ({input, meta, ...props}: any) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={mod.formControl + ' ' + (hasError && mod.error)}>
            <input {...input} {...props} />
            {hasError && <span>{meta.error}</span>}
        </div>
    )
};