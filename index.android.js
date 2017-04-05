import { AppRegistry, UIManager } from 'react-native';
import App from './App/index';

UIManager.setLayoutAnimationEnabledExperimental
  && UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('dailyDozen', () => App);
