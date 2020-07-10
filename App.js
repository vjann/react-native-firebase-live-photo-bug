/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const RNFBSTRG = storage();
export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      livePhoto:"",
    }
  }
  goToImagePicker = () => {
    console.log('image picker called');
    ImagePicker.openPicker({
      multiple: false,
      maxFiles:300,
      mediaType: 'photo',
      compressImageQuality: 1,
      loadingLabelText: 'CHANGE LATER',
      writeTempFile: false,
    }).then(image => {
      console.log(image);
      this.setState({livePhoto: 'ph://' + image.localIdentifier});
    });
  }
  uploadToFirebase = () => {
    console.log('upload called');
    const task = RNFBSTRG.ref('test/testPhoto').putFile(this.state.livePhoto);
    task.then(result => {
      if (result.state != 'success') {
        console.warn("ERRRRRROOORRRR upload to firebase2")
        // alert('Sorry, Try again.');
      }
      console.log("Uploaded: ", this.state.livePhoto);
    }).catch(err => console.warn(err));
  }
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.touchable} onPress={this.goToImagePicker}>
            <Text>
              pick live photo
            </Text>
          </TouchableOpacity>
          <Text>
            photo path {this.state.livePhoto}
          </Text>
          <TouchableOpacity style={styles.touchable} onPress={this.uploadToFirebase}>
            <Text>
              upload to firebase
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lighter,
  },
  touchable: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  }
});
