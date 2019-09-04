import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import Global from '../../utils/consts/globals';
import colors from '../../utils/consts/colors';
import Ripple from 'react-native-material-ripple';

export default class RoundButton extends Component {
  render() {
    const {title = 'Title', highlight = false} = this.props;
    return (
      <Ripple
        style={{
          flex: 1,
          marginHorizontal: 8,
          height: 40,
          backgroundColor: highlight ? 'white' : colors.appBackground,
          borderRadius: 50,
          borderColor: '#ccc',
          borderWidth: 1,
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <Text style={{alignSelf: 'center'}}>{title}</Text>
      </Ripple>
    );
  }
}
