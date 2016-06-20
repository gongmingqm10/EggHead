import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  Platform
} from 'react-native';

var Profile = require('./Profile');
var api = require('../Utils/api');
var Repositories = require('./Repositories');
var Notes = require('./Notes');

class Dashboard extends Component {

  makeBackground(btn) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    };
    if (btn == 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn == 1) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    return obj;
  }

  goToProfile() {
    this.props.navigator.push({
      title: 'Profile Page',
      component: Profile,
      id: 'profile',
      index: 2,
      passProps: {userInfo: this.props.userInfo}
    });
  }

  goToRepos() {
    api.getRepos(this.props.userInfo.login).then((res) => {
      if (res instanceof Array) {
        this.props.navigator.push({
          title: 'Repositories',
          index: 3,
          component: Repositories,
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        });
      } else {
        // do nothing if repos fetching failed
      }
    })
  }

  goToNotes() {
    api.getNotes(this.props.userInfo.login).then((res) => {
      this.props.navigator.push({
        title: 'Notes',
        component: Notes,
        index: 4,
        passProps: {
          userInfo: this.props.userInfo,
          notes: res || {}
        }
      });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image}/>
        <TouchableHighlight
          onPress={this.goToProfile.bind(this)}
          style={this.makeBackground(0)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.goToRepos.bind(this)}
          style={this.makeBackground(1)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>Go to Repos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.goToNotes.bind(this)}
          style={this.makeBackground(2)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>Go to Notes</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 65 : 56,
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

module.exports = Dashboard;