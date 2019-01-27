import React from 'react';

import styles from './Buttons.module.css';

const ButtonSend = props => {
  return (
    <button className={`${styles.ButtonSend}`} {...props}>
      {props.children}
    </button>
  );
};

const ButtonRemove = props => {
  return (
    <button className={`${styles.ButtonRemove}`} {...props}>
      {props.children}
    </button>
  );
};

const ButtonEdit = props => {
  return (
    <button className={`${styles.ButtonEdit}`} {...props}>
      {props.children}
    </button>
  );
};

export { ButtonSend, ButtonRemove, ButtonEdit };
