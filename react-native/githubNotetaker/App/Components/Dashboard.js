import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(this.props.userInfo)}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
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