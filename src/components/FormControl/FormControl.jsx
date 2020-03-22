import React from 'react';
import mod from './FormControl.module.css';

const Textarea = ({input, meta, ...props}) => {
  return (
      <div className={mod.formControl + '' + mod.error}>
          <textarea {...input} {...props} />
      </div>
  )
};