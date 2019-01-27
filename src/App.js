import React, { Component } from 'react';
import './App.css';

import AppContext from './Context';
import FormOfSend from './components/FormOfSend';
import AdList from './components/AdList';

class App extends Component {
  state = {
    adverts:
      localStorage.getItem('adverts') !== null && localStorage.getItem('adverts') !== undefined
        ? JSON.parse(localStorage.getItem('adverts'))
        : [],
  };

  reloadData = () => {
    let newData = JSON.parse(localStorage.getItem('adverts'));
    this.setState(prevState => ({ adverts: newData }));
  };
  render() {
    return (
      <AppContext.Provider value={{ reloadData: this.reloadData, ...this.state }}>
        <div className="App">
          <div className="Title">
            <span>Подать объявление</span>
          </div>
          <FormOfSend />
          <AdList />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
