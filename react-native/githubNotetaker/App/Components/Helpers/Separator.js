import React, {Component} from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
    marginLeft: 8,
    marginTop: 6
  }
});

class Separator extends Component {
  render() {
    return(
      <View style={styles.separator}></View>
    )
  }
}

module.exports = Separator;