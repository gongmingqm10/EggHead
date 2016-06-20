import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Platform,
  ActivityIndicatorIOS,
  ProgressBarAndroid
} from 'react-native';

var api = require('../Utils/api');
var Dashboard = require('./Dashboard');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    }
  }

  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text
    })
  }

  handleSubmit(event) {
    this.setState({
      isLoading: true,
      error: false
    });
    api.getBio(this.state.username)
      .then((res) => {
        if (res.message === 'Not Found') {
          this.setState({
            error: 'User not found',
            isLoading: false
          })
        } else {
          this.props.navigator.push({
            title: res.name || 'Select an option',
            component: Dashboard,
            index: 1,
            passProps: {userInfo: res}
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          })
        }
      });
  }

  platformProgressBar(){
    return (Platform.OS === 'android' ?
      <ProgressBarAndroid color="#111" style={styles.indicator} /> :
      <ActivityIndicatorIOS animating={true} size="large" color="#111" style={styles.indicator} />);
  };

  render() {
    var showError = (
      this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : <View />
    );

    var showLoading = (
      this.state.isLoading ? this.platformProgressBar() : <View/>
    );

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for Github User</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
        {showLoading}
        {showError}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 65 : 56,
    padding: 30,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  title: {
    marginTop: 36,
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#2979FF'
  },
  searchInput: {
    height: 36,
    padding: 6,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: '#111'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#2979FF',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  errorText: {
    fontSize: 18,
    color: 'pink',
    marginTop: 8
  },
  indicator: {
    marginTop: 20
  }
});


module.exports = Main;