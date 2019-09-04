import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Header from '../../components/Header';
import Colors from '../../utils/consts/colors';
import RoundButton from '../../components/RoundButton';
import Categories from '../../components/Categories';
import Fab from '../../components/Fab';
import {bindActionCreators} from 'redux';
import configstore from '../../redux/configstore';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/actions';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  navigateToLogin = () => {};

  componentDidMount() {
    setTimeout(() => {
      this.navigateToLogin();
    }, 2000);
  }

  navigateToPublish = () => {
    this.props.navigation.navigate('Publish');
  };

  render() {
    return (
      <View style={style.container}>
        <Header title="Home" />
        <View
          style={{
            flexDirection: 'row',
            padding: 16,
            justifyContent: 'space-between',
          }}>
          <RoundButton title="All" highlight={false} />
          <RoundButton title="Categories" highlight={true} />
          <RoundButton title="Favourites" highlight={false} />
        </View>

        <Categories flexProperty={1} parentCallback={() => {}} />
        <Fab callBack={this.navigateToPublish} />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appBackground,
  },
  inner: {
    color: '#e40046',
    fontSize: 32,
    marginTop: 0,
    fontStyle: 'italic',
    fontWeight: 'bold',
    alignSelf: 'center',
    height: 160,
  },
});

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
)(Home);
