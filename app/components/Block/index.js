import React, {Component} from 'react';
import {StyleSheet, Text, Image} from 'react-native';
import Ripple from 'react-native-material-ripple';

export default class Block extends Component {
  render() {
    const {
      title = 'Default',
      callBack = () => {},
      value,
      selected = false,
    } = this.props;
    return (
      <Ripple
        onPress={callBack}
        style={[
          styles.container,
          {backgroundColor: selected ? '#08E2BE' : 'white'},
        ]}>
        <Text style={styles.textStyle}>{title}</Text>
        {value != null ? <Text style={styles.textStyle2}>Aaleen</Text> : null}
        <Image
          style={{
            flex: 1,
            width: 20,
            height: 20,
            resizeMode: 'contain',
            alignSelf: 'center',
            position: 'absolute',
            right: 10,
          }}
          source={require('../../assets/common/next.png')}
        />
      </Ripple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 2,
    padding: 16,
    flexDirection: 'row',
  },
  textStyle: {},
  textStyle2: {
    position: 'absolute',
    right: 50,
    alignSelf: 'center',
    color: 'grey',
  },
});
