import React from 'react';

import AdItem from './AdItem';
import AppContext from '../../Context';
import styles from './AdList.module.css';

class AdList extends React.Component {
  static contextType = AppContext;
  render() {
    return (
      <AppContext.Consumer>
        {context => {
          return (
            <div className={`${styles.ListBlock}`}>
              {this.context.adverts.length > 0 ? (
                <div className={`${styles.Title}`}>
                  <span>Объявления</span>
                </div>
              ) : (
                ''
              )}
              {this.context.adverts.reverse().map((value, i) => (
                <AdItem key={i + Math.random() * 100} id={i + 1} item={value} />
              ))}
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default AdList;
