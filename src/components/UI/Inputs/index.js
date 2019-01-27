import React from 'react';

import styles from './Input.module.css';

const Input = props => {
  return <input className={`${styles.InputStyle}`} {...props} />;
};

const TextArea = props => {
  return <textarea className={`${styles.TextAreaStyle}`} {...props} />;
};

const InputPhoto = props => {
  // console.log(props.children);
  return (
    <div className={`${styles.InputFileStyle}`}>
      <label htmlFor={props.id}>
        <button>Прикрепить фото</button>
      </label>
      <input {...props} />
    </div>
  );
};

const SelectInput = props => {
  return (
    <select className={`${styles.InputStyle}`} {...props}>
      {props.values.map((value, i) => (
        <option key={i * Math.random() * 100} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export { Input, TextArea, InputPhoto, SelectInput };
