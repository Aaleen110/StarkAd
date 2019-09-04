import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 200);
  }

  render() {
    return (
      <View style={style.container}>
        <Text style={style.inner}>Stark Digital...</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inner: {
    color: '#08E2BE',
    fontSize: 32,
    marginTop: 0,
    fontWeight: 'bold',
    alignSelf: 'center',
    height: 160,
  },
});
