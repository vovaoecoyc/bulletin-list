const helperRules = {
  checkRules: (value, rulesObject) => {
    if (rulesObject['mustRequire']) {
      if (value.length <= 0) {
        return { error: 'Заполните поле' };
      }
    }
    if (rulesObject['maxLength']) {
      if (value.length > rulesObject['maxLength']) {
        return { error: `Длина поля должна быть не больше ${rulesObject['maxLength']} символов` };
      }
    }
    if (rulesObject['minLength']) {
      if (value.length < rulesObject['maxLength']) {
        return { error: `Длина поля должна быть не меньше ${rulesObject['maxLength']} символов` };
      }
    }
    if (rulesObject['isPhone']) {
      if (value.search(/[^0-9]/i) !== -1 || +value[0] !== 7) {
        return { error: 'Неверный формат' };
      }
    }
    return { error: null };
  },
};

export { helperRules };
