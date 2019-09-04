import React, {Component} from 'react';
import { View,  FlatList} from 'react-native';
import Header from '../../../components/Header';
import {
  transmissionData,
  conditionData,
  registerData,
  warrantyData,
} from './datasource';
import colors from '../../../utils/consts/colors';
import Block from '../../../components/Block';

import {bindActionCreators} from 'redux';
import configstore from '../../../redux/configstore';
import {connect} from 'react-redux';
import * as actions from '../../../redux/actions/actions';

class ContainerType1 extends Component {
  state = {
    selectedIndex: 99,
    selected: false,
  };

  componentDidMount() {
    const {navigation} = this.props;
    const type = navigation.getParam('type', '');
    switch (type) {
      case 'Transmission':
        transmissionData.map((item, index) => {
          if (
            this.props.data.transmission &&
            this.props.data.transmission == item
          ) {
            this.setState({selectedIndex: index});
          }
        });

        break;

      case 'Condition':
        conditionData.map((item, index) => {
          if (this.props.data.condition && this.props.data.cionondit == item) {
            this.setState({selectedIndex: index});
          }
        });
        break;

      case 'Registration':
        registerData.map((item, index) => {
          if (
            this.props.data.registration &&
            this.props.data.registration == item
          ) {
            this.setState({selectedIndex: index});
          }
        });
        break;

      case 'Warranty':
        warrantyData.map((item, index) => {
          if (this.props.data.warranty && this.props.data.warranty == item) {
            this.setState({selectedIndex: index});
          }
        });
        break;

      default:
        return false;
    }
  }
  render() {
    const {navigation} = this.props;
    const type = navigation.getParam('type', 'Error');

    let datasource = '';
    let typeStore = '';
    switch (type) {
      case 'Transmission':
        datasource = transmissionData;
        typeStore = 'transmission';
        break;

      case 'Condition':
        datasource = conditionData;
        typeStore = 'condition';
        break;

      case 'Registration':
        datasource = registerData;
        typeStore = 'registration';
        break;

      case 'Warranty':
        datasource = warrantyData;
        typeStore = 'warranty';
        break;

      default:
        break;
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.appBackground,
        }}>
        <Header
          title={type}
          clearPress={() => {
            configstore.dispatch(actions.insertValue(typeStore, ''));
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
          renderItem={({item, index}) => (
            <View>
              <Block
                selected={this.state.selectedIndex == index ? true : false}
                callBack={() => {
                  configstore.dispatch(actions.insertValue(typeStore, item));
                  this.props.navigation.goBack();
                }}
                title={item}
              />
            </View>
          )}
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
)(ContainerType1);
