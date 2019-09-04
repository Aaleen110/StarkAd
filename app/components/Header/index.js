import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Global from '../../utils/consts/globals';
import Ripple from 'react-native-material-ripple';

export default class Header extends Component {
  render() {
    const {
      title = 'Home',
      clearPress = () => {},
      backPress = () => {},
      showClear = false,
      showBack = false,
    } = this.props;
    return (
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#08E2BE', '#00D1C5', '#01C4CA']}
        style={styles.linearGradient}>
        {showBack ? (
          <Ripple style={{alignSelf: 'center', width: 50}} onPress={backPress}>
            <Image
              onPress={backPress}
              style={{
                flex: 1,
                width: 20,
                height: 20,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={require('../../assets/common/back.png')}
            />
          </Ripple>
        ) : (
          <View style={{alignSelf: 'center', width: 50}}></View>
        )}
        <Text style={styles.buttonText}>{title}</Text>
        {showClear ? (
          <Ripple
            style={{
              alignSelf: 'center',
              width: 80,
            }}
            onPress={clearPress}>
            <Text
              style={{
                // position: 'absolute',
                alignSelf: 'center',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                // right: 10,
                color: 'white',
              }}>
              Clear All
            </Text>
          </Ripple>
        ) : (
          <View style={{alignSelf: 'center', width: 80}}></View>
        )}
      </LinearGradient>
    );
  }
}

var styles = StyleSheet.create({
  linearGradient: {
    flexDirection: 'row',
    width: '100%',
    height: Global.screenHeight / 8,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
});
