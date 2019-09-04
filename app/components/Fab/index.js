import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Ripple from 'react-native-material-ripple';

export default class Fab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Ripple onPress={this.props.callBack} style={styles.main}>
          <Text style={styles.textStyle}>+</Text>
        </Ripple>
      </View>
    );
  }
}
