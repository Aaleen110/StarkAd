import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  TextInput,
  Alert,
  Image,
  ToastAndroid,
} from 'react-native';
import Modal from 'react-native-modalbox';

import Header from '../../components/Header';
import Colors from '../../utils/consts/colors';
import Block from '../../components/Block';
import Ripple from 'react-native-material-ripple';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../redux/actions/actions';
import Global from '../../utils';
import UserDefaults from '../../utils/handlers/localstorage';
import ImagePicker from 'react-native-image-crop-picker';

class Publish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      type: '',
      priceModal: false,

      title: '',
      description: '',

      price: '',
      name: '',
      email: '',
      contact: '',
      location: '',

      dataSource: [],
      imageArray: [
        {
          isUpload: false,
          placeholder: true,
          data: '',
          mime: '',
        },
        {
          isUpload: false,
        },
        {isUpload: false},
        {isUpload: false},
        {isUpload: false},
        {isUpload: false},
        {isUpload: false},
        {isUpload: false},
      ],
    };
  }

  navigate = (screen, type) => {
    this.props.navigation.navigate(screen, {type});
  };

  componentDidMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    UserDefaults.get('dataSource').then(dataSource => {
      console.log('LOCAL', dataSource);
      this.setState(dataSource);
    });
  }
  setModalVisible(visible) {
    this.setState({priceModal: visible});
  }

  publishAd = () => {
    let bool = this.validate();
    if (bool) {
      let dataSource = this.state.dataSource;
      let publishObj = {};

      publishObj.category = this.props.data.category;
      publishObj.make = this.props.data.make;
      publishObj.year = this.props.data.year;
      publishObj.cc = this.props.data.cc;
      publishObj.kilometer = this.props.data.kilometer;
      publishObj.transmission = this.props.data.transmission;
      publishObj.condition = this.props.data.condition;
      publishObj.registration = this.props.data.registration;
      publishObj.warranty = this.props.data.warranty;

      publishObj.title = this.state.title;
      publishObj.description = this.state.description;
      publishObj.location = this.state.location;
      publishObj.contact = this.state.contact;
      publishObj.email = this.state.email;
      publishObj.name = this.state.name;
      publishObj.price = this.state.price;
      publishObj.images = this.state.imageArray;

      dataSource.push(publishObj);

      Alert.alert('Ad posted sucessfully', 'Thank you');
      UserDefaults.set('dataSource', dataSource);
    } else {
      Alert.alert(
        'Something went wrong',
        'You are required to fill all the fields.',
      );
    }
  };

  validate = () => {
    if (
      this.state.title != '' &&
      this.state.description != '' &&
      this.state.name != '' &&
      this.state.email != '' &&
      this.state.contact != '' &&
      this.state.location != '' &&
      (this.props.data.hasOwnProperty('category') &&
        this.props.data.category != '') &&
      (this.props.data.hasOwnProperty('make') && this.props.data.make != '') &&
      (this.props.data.hasOwnProperty('year') && this.props.data.year != '') &&
      (this.props.data.hasOwnProperty('cc') && this.props.data.cc != '') &&
      (this.props.data.hasOwnProperty('kilometer') &&
        this.props.data.kilometer != '') &&
      (this.props.data.hasOwnProperty('transmission') &&
        this.props.data.transmission != '') &&
      (this.props.data.hasOwnProperty('registration') &&
        this.props.data.registration != '') &&
      (this.props.data.hasOwnProperty('warranty') &&
        this.props.data.warranty != '') &&
      (this.props.data.hasOwnProperty('condition') &&
        this.props.data.condition != '') &&
      this.state.imageArray.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  renderPriceModal = () => {
    return (
      <Modal
        style={{
          justifyContent: 'center',
          borderRadius: 6,
          backgroundColor: ' rgba(0, 0, 0, 0)',
          height: 200,
          width: 300,
        }}
        ref={'modal1'}
        swipeThreshold={200}
        isOpen={this.state.priceModal}
        swipeToClose={this.state.swipeToClose}
        onClosed={() => this.setState({priceModal: false})}
        position={'center'}
        backdrop={true}
        backButtonClose={true}
        keyboardTopOffset={Global.iOSPlatform ? 22 : 0}
        onOpened={this.onOpen}
        onClosingState={this.onClosingState}>
        <View
          style={{
            // flex: 1,
            backgroundColor: 'white',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <View style={{height: 150, width: '100%'}}>
            <Text style={{fontSize: 20, paddingTop: 16, paddingLeft: 16}}>
              Enter a relevant price
            </Text>
            <TextInput
              keyboardType="number-pad"
              style={{
                height: 40,
                paddingLeft: 16,
                color: 'grey',
                width: '100%',
                borderBottomColor: 'gray',
                borderBottomWidth: 0.5,
                alignSelf: 'center',
              }}
              onChangeText={price => this.setState({price})}
              value={this.state.price}
            />
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Text
                onPress={() => this.setState({priceModal: false, price: ''})}
                style={{
                  color: 'grey',
                  fontWeight: 'bold',
                  fontSize: 16,
                  alignSelf: 'flex-end',
                  padding: 16,
                }}>
                Cancel
              </Text>
              <Text
                onPress={() => this.setState({priceModal: false})}
                style={{
                  color: '#08E2BE',
                  fontWeight: 'bold',
                  fontSize: 16,
                  alignSelf: 'flex-end',
                  padding: 16,
                }}>
                Ok
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  changeLayout = type => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded: !this.state.expanded, type});
  };

  renderDetails = () => {
    return (
      <View
        style={{
          height: this.state.expanded && this.state.type == 1 ? null : 0,
          overflow: 'hidden',
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View
          style={{
            overflow: 'hidden',
            backgroundColor: 'white',
            padding: 16,
          }}>
          <Text style={{padding: 8}}>Title</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={title => this.setState({title})}
            value={this.state.title}
          />
        </View>

        <View
          style={{
            overflow: 'hidden',
            backgroundColor: 'white',
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}>
          <Text style={{padding: 8}}>Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={[
              styles.inputStyle,

              {
                height: 100,
                alignItems: 'flex-start',
                paddingTop: 0,
                paddingRight: 16,
              },
            ]}
            onChangeText={description => this.setState({description})}
            value={this.state.description}
          />
        </View>
      </View>
    );
  };

  renderBasicDetails = () => {
    return (
      <View
        style={{
          height: this.state.expanded && this.state.type == 2 ? null : 0,
          overflow: 'hidden',
          backgroundColor: 'white',
          flex: 1,
        }}>
        <View
          style={{
            overflow: 'hidden',
            backgroundColor: 'white',
            paddingHorizontal: 16,
          }}>
          <Text style={{padding: 8}}>Name</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={name => this.setState({name})}
            value={this.state.name}
          />
        </View>

        <View
          style={{
            overflow: 'hidden',
            backgroundColor: 'white',
            paddingHorizontal: 16,
          }}>
          <Text style={{padding: 8}}>Email</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.inputStyle}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
        </View>

        <View
          style={{
            overflow: 'hidden',
            backgroundColor: 'white',
            paddingHorizontal: 16,
          }}>
          <Text style={{padding: 8}}>Contact</Text>
          <TextInput
            style={styles.inputStyle}
            keyboardType="number-pad"
            onChangeText={contact => this.setState({contact})}
            value={this.state.contact}
          />
        </View>

        <View
          style={{
            overflow: 'hidden',
            backgroundColor: 'white',
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}>
          <Text style={{padding: 8}}>Location</Text>
          <TextInput
            style={styles.inputStyle}
            onChangeText={location => this.setState({location})}
            value={this.state.location}
          />
        </View>
      </View>
    );
  };

  showToast = msg => {
    ToastAndroid.showWithGravityAndOffset(
      msg,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  renderUploadImage = () => {
    let imageArray = this.state.imageArray;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: 250,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: this.state.expanded && this.state.type == 0 ? null : 0,
          overflow: 'hidden',
        }}>
        {imageArray.map((prop, key) => {
          return (
            <Ripple
              onPress={() => {
                this.showToast(
                  'Select upto 8 files to upload, hold for multiple selection',
                );
                ImagePicker.openPicker({
                  multiple: true,
                  includeBase64: true,
                }).then(images => {
                  if (images.length > 8) {
                    this.showToast(
                      'Sorry! Only 8 files will get uploaded rest will be ignored',
                    );
                  }

                  let newArr = [];
                  imageArray.map(element => {
                    if (!element.isUpload) {
                      newArr.push(element);
                    }
                  });

                  if (images.length > newArr.length && images.length != 1) {
                    this.showToast('Too many selections');
                  } else {
                    console.log('ARR', newArr);
                    let count = 0;

                    images.map((ins, index) => {
                      if (images.length == 1) {
                        imageArray[key].isUpload = true;
                        imageArray[key].data = ins.data;
                        imageArray[key].mime = ins.mime;
                        count = 0;
                      } else {
                        if (!imageArray.isUpload) {
                          imageArray[key + count].isUpload = true;
                          imageArray[key + count].data = ins.data;
                          imageArray[key + count].mime = ins.mime;
                        }
                        count = count + 1;
                      }
                    });
                  }
                  // mime: "video/mp4"
                  this.setState({imageArray});
                });
              }}
              style={{
                borderColor: '#ccc',
                borderWidth: 0.5,
                padding: 12,
                alignSelf: 'baseline',
              }}>
              <View
                style={{
                  height: 70,
                  width: 70,
                  backgroundColor: '#ccc',
                  justifyContent: 'center',
                }}>
                {prop.placeholder ? (
                  prop.isUpload ? (
                    <Image
                      onPress={() => {}}
                      style={{
                        width: 70,
                        height: 70,
                        resizeMode: 'contain',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      source={{uri: `data:${prop.mime};base64,${prop.data}`}}
                    />
                  ) : (
                    <Image
                      onPress={() => {}}
                      style={{
                        width: 26,
                        height: 26,
                        resizeMode: 'contain',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                      source={require('../../assets/common/camera.png')}
                    />
                  )
                ) : prop.isUpload ? (
                  <Image
                    onPress={() => {}}
                    style={{
                      width: 70,
                      height: 70,
                      resizeMode: 'contain',
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}
                    source={{uri: `data:${prop.mime};base64,${prop.data}`}}
                  />
                ) : (
                  <View
                    style={{
                      height: 26,
                      width: 26,
                      backgroundColor: 'grey',
                      borderRadius: 13,
                      justifyContent: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text style={{color: 'white', alignSelf: 'center'}}>
                      {key + 1}
                    </Text>
                  </View>
                )}
              </View>
            </Ripple>
          );
        })}
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Header
          showBack={true}
          backPress={() => this.props.navigation.goBack()}
          title="Post an Ad"
        />

        {/* {this.renderUploadImage()} */}

        <Block callBack={() => this.changeLayout(0)} title="Add Photos" />
        {this.renderUploadImage()}
        <Block
          callBack={() => this.navigate('CategorySelection')}
          title="Category"
        />
        <Block callBack={() => this.changeLayout(1)} title="Details" />
        {this.renderDetails()}
        <Block
          callBack={() => this.navigate('ContainerType1', 'Make')}
          title="Make"
        />
        <Block
          callBack={() => this.navigate('ContainerType1', 'Year')}
          title="Year"
        />
        <Block
          callBack={() => this.navigate('ContainerType1', 'CC')}
          title="CC"
        />
        <Block
          callBack={() => this.navigate('Kilometer', 'kilometer')}
          title="Kilometer"
        />
        <Block
          callBack={() => this.navigate('ContainerType2', 'Transmission')}
          title="Transmission Type"
        />
        <Block
          callBack={() => this.navigate('ContainerType2', 'Registration')}
          title="Registration"
        />
        <Block
          callBack={() => this.navigate('ContainerType2', 'Warranty')}
          title="Warranty"
        />
        <Block
          callBack={() => this.navigate('ContainerType2', 'Condition')}
          title="Condition"
        />
        <Block
          callBack={() => this.setState({priceModal: true})}
          title="Price"
        />
        <Block title="Basic Details" callBack={() => this.changeLayout(2)} />
        {this.renderBasicDetails()}

        {this.state.priceModal ? this.renderPriceModal() : null}

        <View style={{flex: 1}}>
          <Text
            onPress={() => this.showToast('Coming Soon!')}
            style={{
              marginTop: 6,
              alignSelf: 'center',
              color: '#0000FF',
              textDecorationLine: 'underline',
            }}>
            Preview Your Ad
          </Text>
          <Ripple
            onPress={this.publishAd}
            style={{
              flex: 1,
              margin: 16,
              height: 40,
              backgroundColor: '#08E2BE',
              borderRadius: 50,
              borderColor: '#ccc',
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <Text style={{alignSelf: 'center', color: 'white'}}>
              {'Save & Publish Ad'}
            </Text>
          </Ripple>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  inputStyle: {
    height: 40,
    paddingLeft: 16,
    flex: 1,
    color: 'grey',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    alignSelf: 'center',
  },
});

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
)(Publish);

console.disableYellowBox = true;
