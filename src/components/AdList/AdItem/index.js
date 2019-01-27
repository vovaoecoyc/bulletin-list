import React from 'react';

import phoneIcon from '../../../images/phone.png';
import cityIcon from '../../../images/city.png';
import { ButtonRemove, ButtonEdit } from '../../UI/Buttons';
import styles from './AdItem.module.css';
import AppContext from '../../../Context';

class AdItem extends React.Component {
  constructor(props) {
    super(props);
    this.id = this.props.id;
    this.title = this.props.item[0].value;
    this.description = this.props.item[1].value;
    this.city = this.props.item[3].value;
    this.phone = this.props.item[2].value;
    this.photo = this.props.item[4].value;
    this.phone =
      '+' + this.phone.slice(0, 1) + '(' + this.phone.slice(1, 4) + ')' + this.phone.slice(4);
  }

  static contextType = AppContext;

  handlerClickRemove = () => {
    console.log(this.context.adverts);
    const newData = this.context.adverts.filter((value, i) => {
      return i === this.id - 1 ? false : true;
    });
    console.log('newData', newData);
    localStorage.setItem('adverts', JSON.stringify(newData));
    this.context.reloadData();
  };

  render() {
    return (
      <div className={`${styles.ItemBlock}`}>
        <div className={`${styles.LeftBlock}`}>
          <span className={`${styles.TitleAd}`}>{this.title}</span>
          <span className={`${styles.DescriptionAd}`}>{this.description}</span>
          <div className={`${styles.Image}`} style={{ backgroundImage: `url(${this.photo})` }} />
        </div>
        <div className={`${styles.RightBlock}`}>
          <div className={`${styles.RightBlockTop}`}>
            <div>
              <img src={phoneIcon} alt="phone" />
              <span>{this.phone}</span>
            </div>
            <div>
              <img src={cityIcon} alt="city" />
              <span>{this.city}</span>
            </div>
          </div>
          <div className={`${styles.RightBlockBottom}`}>
            <ButtonRemove onClick={this.handlerClickRemove}>Удалить</ButtonRemove>
            <ButtonEdit>Редактировать</ButtonEdit>
          </div>
        </div>
      </div>
    );
  }
}

export default AdItem;
