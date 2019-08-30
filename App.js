import React from 'react';
import AppNavigatorStack from './app/screens/router';
import {Provider} from 'react-redux';
import configstore from './app/redux/configstore';

const App = () => {
  return (
    <Provider store={configstore}>
      <AppNavigatorStack />
    </Provider>
  );
};

export default App;
