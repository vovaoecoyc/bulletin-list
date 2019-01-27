import React from 'react';

import { ButtonSend } from '../UI/Buttons';
import { Input, TextArea, InputPhoto, SelectInput } from '../UI/Inputs';
import { helperRules } from '../helpers';
import validIcon from '../../images/valid.png';
import notValidIcon from '../../images/notvalid.png';
import styles from './Form.module.css';
import AppContext from '../../Context';

class FormOfSend extends React.Component {
  constructor(props) {
    super(props);
    this.refTitle = React.createRef();
    this.refDescription = React.createRef();
    this.refPhone = React.createRef();
  }
  static contextType = AppContext;
  state = {
    fields: {
      title: {
        name: 'title',
        value: '',
        touched: false,
        rules: {
          maxLength: 120,
          minLength: false,
          isPhone: false,
          mustRequire: true,
        },
      },
      description: {
        name: 'description',
        value: '',
        touched: false,
        rules: {
          maxLength: 300,
          minLength: false,
          isPhone: false,
          mustRequire: false,
        },
      },
      phone: {
        name: 'phone',
        value: '',
        touched: false,
        rules: {
          maxLength: 11,
          minLength: 11,
          isPhone: true,
          mustRequire: true,
        },
      },
      city: {
        name: 'city',
        value: '',
        touched: false,
        rules: {
          maxLength: false,
          minLength: false,
          isPhone: false,
          mustRequire: false,
        },
      },
      photo: {
        name: 'photo',
        value: '',
        touched: true,
        rules: {
          maxLength: false,
          minLength: false,
          isPhone: false,
          mustRequire: false,
        },
      },
    },
    isNotValidForm: true,
    errors: {
      title: null,
      description: null,
      phone: null,
      city: null,
    },
    cityValues: ['', 'Москва', 'Санкт-Петербург', 'Нижний Новрогорд', 'Ростов-на-Дону'],
  };

  handlerChange = e => {
    let value = e.target.value,
      name = e.target.name,
      rules = [],
      errorObj = {};
    console.log(e);
    for (let i in this.state.fields) {
      if (name === this.state.fields[i].name) {
        for (let k in this.state.fields[i].rules) {
          rules[k] = this.state.fields[i].rules[k];
        }
      }
    }
    errorObj = helperRules.checkRules(value, rules);
    this.setState(prevState => {
      let errorsArray = [],
        validForm;
      for (let i in prevState.errors) {
        if (i === name) {
          prevState.errors[i] = errorObj.error;
        }
      }
      prevState.fields[name].touched = true;
      for (let i in prevState.errors) {
        errorsArray.push(prevState.errors[i]);
      }
      validForm = errorsArray.every(value => value === null);
      for (let i in prevState.fields) {
        if (prevState.fields[i].touched === false && prevState.fields[i].rules.mustRequire) {
          validForm = false;
        }
      }
      prevState.fields[name].value = value;
      return { ...prevState, errors: prevState.errors, isNotValidForm: validForm ? false : true };
    });
  };

  handlerBlur = e => {
    this.handlerChange(e);
  };

  handlerSubmit = e => {
    e.preventDefault();
    let data = this.context.adverts.length > 0 ? this.context.adverts : [],
      dataItem = [];
    for (let i in this.state.fields) {
      let field = {
        name: i,
        value: this.state.fields[i].value,
      };
      dataItem.push(field);
    }
    data.push(dataItem);
    localStorage.setItem('adverts', JSON.stringify(data));
    this.context.reloadData();

    // обновляем значения полей состояний после добавления объявления
    this.setState(prevState => {
      for (let i in prevState.fields) {
        prevState.fields[i].value = '';
        prevState.fields[i].touched = false;
      }
      return { ...prevState, isNotValidForm: true };
    });
  };

  handlerLoadFile = e => {
    let reader = new FileReader(),
      file = e.target.files[0];
    reader.onloadend = () => {
      this.setState(prevState => {
        for (let i in prevState.fields) {
          if (i === 'photo') {
            prevState.fields[i].value = reader.result;
          }
        }
        return { ...prevState };
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    return (
      <form className={`${styles.FormStyle}`} onSubmit={this.handlerSubmit}>
        <div className={`${styles.FormItem}`}>
          <div className={`${styles.DataBlcok}`}>
            <label className={`${styles.LabelStyle}`} htmlFor="title">
              Заголовок
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              value={this.state.fields.title.value}
              onBlur={this.handlerBlur}
              onChange={this.handlerChange}
            />
          </div>
          <div
            className={
              this.state.errors.title
                ? `${styles.ErrorBlock} ${styles.NotValid}`
                : `${styles.ErrorBlock} ${styles.Valid}`
            }
          >
            {this.state.errors.title ? (
              <React.Fragment>
                <img src={notValidIcon} alt="notValid" />
                <span>{this.state.errors.title}</span>
              </React.Fragment>
            ) : this.state.fields.title.touched ? (
              <React.Fragment>
                <img src={validIcon} alt="valid" />
                <span>Заполнено</span>
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className={`${styles.FormItem}`}>
          <div className={`${styles.DataBlcok}`}>
            <label className={`${styles.LabelStyle}`} htmlFor="adText">
              Текст объявления
            </label>
            <TextArea
              id="adText"
              name="description"
              value={this.state.fields.description.value}
              onBlur={this.handlerBlur}
              onChange={this.handlerChange}
            />
          </div>
          <div
            className={
              this.state.errors.description
                ? `${styles.ErrorBlock} ${styles.NotValid}`
                : `${styles.ErrorBlock} ${styles.Valid}`
            }
          >
            {this.state.errors.description ? (
              <React.Fragment>
                <img src={notValidIcon} alt="notValid" />
                <span>{this.state.errors.description}</span>
              </React.Fragment>
            ) : this.state.fields.description.touched ? (
              <React.Fragment>
                <img src={validIcon} alt="valid" />
                <span>Заполнено</span>
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className={`${styles.FormItem}`}>
          <div className={`${styles.DataBlcok}`}>
            <label className={`${styles.LabelStyle}`} htmlFor="phone">
              Телефон
            </label>
            <Input
              id="phone"
              type="text"
              name="phone"
              value={this.state.fields.phone.value}
              placeholder="+7 (___) ___-__-__"
              onChange={this.handlerChange}
              onBlur={this.handlerBlur}
            />
          </div>
          <div
            className={
              this.state.errors.phone
                ? `${styles.ErrorBlock} ${styles.NotValid}`
                : `${styles.ErrorBlock} ${styles.Valid}`
            }
          >
            {this.state.errors.phone ? (
              <React.Fragment>
                <img src={notValidIcon} alt="notValid" />
                <span>{this.state.errors.phone}</span>
              </React.Fragment>
            ) : this.state.fields.phone.touched ? (
              <React.Fragment>
                <img src={validIcon} alt="valid" />
                <span>Заполнено</span>
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className={`${styles.FormItem}`}>
          <div className={`${styles.DataBlcok}`}>
            <label className={`${styles.LabelStyle}`} htmlFor="city">
              Город
            </label>

            <SelectInput
              name="city"
              onChange={this.handlerChange}
              value={this.state.fields.city.value}
              values={this.state.cityValues}
            />
          </div>
          <div
            className={
              this.state.errors.phone
                ? `${styles.ErrorBlock} ${styles.NotValid}`
                : `${styles.ErrorBlock} ${styles.Valid}`
            }
          >
            {this.state.errors.city ? (
              <React.Fragment>
                <img src={notValidIcon} alt="notValid" />
                <span>{this.state.errors.city}</span>
              </React.Fragment>
            ) : this.state.fields.city.touched ? (
              <React.Fragment>
                <img src={validIcon} alt="valid" />
                <span>Заполнено</span>
              </React.Fragment>
            ) : (
              ''
            )}
          </div>
        </div>

        <InputPhoto
          id="photo"
          type="file"
          accept=".jpeg,.jpg,.png"
          onChange={this.handlerLoadFile}
        />

        <div
          className={
            this.state.fields.photo.value ? `${styles.Image}` : `${styles.Image} ${styles.Hide}`
          }
          style={{ backgroundImage: `url(${this.state.fields.photo.value})` }}
        />

        <ButtonSend type="submit" disabled={this.state.isNotValidForm}>
          Подать
        </ButtonSend>
      </form>
    );
  }
}

export default FormOfSend;
