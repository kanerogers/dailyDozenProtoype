import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './AppReducer';
import Homescreen from './Homescreen';
import ServingDetail from './ServingDetail';

const store = createStore(AppReducer);
const RouterWithRedux = connect()(Router);

export default () =>
  <Provider store={store}>
    <RouterWithRedux>
      <Scene title="Today" key="Homescreen" component={Homescreen} />
      <Scene key="ServingDetail" getTitle={param => param.title} component={ServingDetail} />
    </RouterWithRedux>
  </Provider>;
