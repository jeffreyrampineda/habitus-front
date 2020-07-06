import React, { Component } from 'react';
import { Provider } from 'react-redux';
import HabitusApp from './HabitusApp';

export default class Root extends Component {
  render() {
    const { store, currentUrl } = this.props;
    return (
      <Provider store={store}>
        <HabitusApp currentUrl={currentUrl}/>
      </Provider>
    );
  }
}
