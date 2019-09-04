import React, {Component} from 'react';
import {View} from 'react-native';
import Categories from '../../../components/Categories';
import Header from '../../../components/Header';

import {bindActionCreators} from 'redux';
import configstore from '../../../redux/configstore';
import {connect} from 'react-redux';
import * as actions from '../../../redux/actions/actions';

class CategorySelection extends Component {
  callBack = data => {
    configstore.dispatch(actions.insertValue('category', data.name));
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}>
        <Header
          title="Select a category"
          clearPress={() => {}}
          backPress={() => {
            this.props.navigation.goBack();
          }}
          showClear={true}
          showBack={true}
        />
        <Categories
          columns={2}
          flexProperty={1}
          parentCallback={data => this.callBack(data)}
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
)(CategorySelection);
