import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import Global from '../../utils/consts/globals';
import colors from '../../utils/consts/colors';
import {categories} from '../../utils/consts/constants';
import Ripple from 'react-native-material-ripple';

export default class Categories extends Component {
  state = {
    flexProp: 0,
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({flexProp: 1});
    }, 200);
  }

  sendData = item => {
    this.props.parentCallback(item);
  };

  render() {
    const {columns = 3, callBack = () => {}, selected} = this.props;
    return (
      <View
        style={{
          flex: 1,
          margin: 12,
          height: 40,
          backgroundColor: 'white',
          borderRadius: 10,
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
        }}>
        <FlatList
          data={categories}
          removeClippedSubviews={false}
          extraData={this.state}
          renderItem={({item}) => (
            <Ripple
              onPress={() => this.sendData(item)}
              style={{
                borderColor: '#ccc',
                borderWidth: 0.5,
                padding: 12,
                alignSelf: 'baseline',
                flex: 1,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: selected ? '#D4AF37' : 'transparent',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: colors.appBackground,
                    borderRadius: 50,
                    width: 90,
                    height: 90,

                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      flex: this.state.flexProp,
                      width: 70,
                      height: 70,
                      resizeMode: 'contain',
                      alignSelf: 'center',
                    }}
                    source={item.path}
                  />
                </View>

                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 16,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {item.name}
                </Text>
              </View>
            </Ripple>
          )}
          numColumns={columns}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  linearGradient: {
    width: Global.screenWidth,
    height: Global.screenHeight / 6,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
