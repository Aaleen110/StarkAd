import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import Ripple from 'react-native-material-ripple';
import Header from '../../../components/Header';
import {datasource} from './datasource';
import {bindActionCreators} from 'redux';
import configstore from '../../../redux/configstore';
import {connect} from 'react-redux';
import * as actions from '../../../redux/actions/actions';

class Kilometer extends Component {
  componentDidMount() {
    let a = 0;
    datasource.map(item => {
      a = this.props.data.kilometer == item ? 'blue' : 'white';
    });

    console.log(a);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Header
          title="Kilometers"
          clearPress={() => {
            configstore.dispatch(actions.insertValue('kilometer', ''));
            this.props.navigation.goBack();
          }}
          backPress={() => {
            this.props.navigation.goBack();
          }}
          showClear={true}
          showBack={true}
        />
        <FlatList
          data={datasource}
          removeClippedSubviews={false}
          extraData={this.state}
          renderItem={({item}) => (
            <Ripple
              onPress={() => {
                configstore.dispatch(actions.insertValue('kilometer', item));
                this.props.navigation.goBack();
              }}
              style={{
                flex: 1,
                margin: 16,
                marginHorizontal: 8,
                height: 40,
                backgroundColor:
                  this.props.data.kilometer == item ? '#08E2BE' : 'white',

                borderRadius: 50,
                borderColor: '#ccc',
                borderWidth: 1,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: this.props.data.kilometer == item ? 'white' : 'black',
                }}>
                {item}
              </Text>
            </Ripple>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStatesToProps = state => {
  return {
    data: state.data,
  };
};
export default connect(
  mapStatesToProps,
  dispatch => ({
    actions: bindActionCreators(actions, dispatch),
  }),
)(Kilometer);
