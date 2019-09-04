import {Dimensions} from 'react-native';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Global = {
  screenWidth: deviceWidth,
  screenHeight: deviceHeight,
};

export default Global;
