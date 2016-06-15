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
    marginTop: 4,
    marginBottom: 4
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