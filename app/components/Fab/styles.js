import {StyleSheet} from 'react-native';
import {Global} from '../../utils';

module.exports = StyleSheet.create({
  container: {
    flex: 0,
  },

  main: {
    zIndex: 2,
    backgroundColor: '#08E2BE',
    height: 60,
    width: 60,
    position: 'absolute',
    justifyContent: 'center',
    right: 24,
    bottom: 24,
    // backgroundColor: 'white',
    borderRadius: 30,
    borderColor: '#ccc',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'white',
  },
});
