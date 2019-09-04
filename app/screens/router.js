import {createStackNavigator, createAppContainer} from 'react-navigation';
import SplashScreen from './Splash';
import Routes from './routes';
import Home from './Home';
import Publish from './Publish';
import CategorySelection from './Selections/CategorySelection';
import Kilometer from './Selections/Kilometer';
import ContainerType1 from './Selections/ContainerType1';
import ContainerType2 from './Selections/ContainerType2';

const AppNavigatorStack = createStackNavigator({
  splash: {
    screen: SplashScreen,
    key: Routes.splashScreen,
    navigationOptions: {header: null},
  },

  Home: {
    screen: Home,
    key: Routes.home,
    navigationOptions: {header: null},
  },
  Publish: {
    screen: Publish,
    key: Routes.publish,
    navigationOptions: {header: null},
  },

  CategorySelection: {
    screen: CategorySelection,
    key: Routes.categorySelection,
    navigationOptions: {header: null},
  },

  Kilometer: {
    screen: Kilometer,
    key: Routes.kilometer,
    navigationOptions: {header: null},
  },

  ContainerType1: {
    screen: ContainerType1,
    key: Routes.containerType1,
    navigationOptions: {header: null},
  },

  ContainerType2: {
    screen: ContainerType2,
    key: Routes.containerType2,
    navigationOptions: {header: null},
  },
});

export default createAppContainer(AppNavigatorStack);
