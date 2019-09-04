import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import Header from '../../../components/Header';
import {makeData, yearData, ccData} from './datasource';
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
      case 'Make':
        makeData.map((item, index) => {
          if (this.props.data.make && this.props.data.make == item) {
            this.setState({selectedIndex: index});
          }
        });

        break;

      case 'Year':
        yearData.map((item, index) => {
          if (this.props.data.year && this.props.data.year == item) {
            this.setState({selectedIndex: index});
          }
        });
        break;

      case 'CC':
        ccData.map((item, index) => {
          if (this.props.data.cc && this.props.data.cc == item) {
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
    const type = navigation.getParam('type', '');
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Header
          title={type}
          clearPress={() => {
            configstore.dispatch(
              actions.insertValue(
                type == 'Make' ? 'make' : type == 'Year' ? 'year' : 'cc',
                '',
              ),
            );
            this.props.navigation.goBack();
          }}
          backPress={() => {
            this.props.navigation.goBack();
          }}
          showClear={true}
          showBack={true}
        />
        <FlatList
          data={type == 'Make' ? makeData : type == 'Year' ? yearData : ccData}
          removeClippedSubviews={false}
          extraData={this.state}
          renderItem={({item, index}) => (
            <View>
              <Block
                selected={this.state.selectedIndex == index ? true : false}
                callBack={() => {
                  configstore.dispatch(
                    actions.insertValue(
                      type == 'Make' ? 'make' : type == 'Year' ? 'year' : 'cc',
                      item,
                    ),
                  );
                  this.props.navigation.goBack();
                }}
                title={item}
              />
              <View
                style={{
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 0.5,
                }}
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
  console.log(state);

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
