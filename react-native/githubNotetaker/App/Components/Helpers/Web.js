import React, {Component} from 'react';

import {
  View,
  WebView,
  StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF'
  }
});

class Web extends Component {
  render() {
    return(
      <View style={styles.container}>
        <WebView source={{uri: this.props.html}} />
      </View>
    );
  }
}

Web.PropTypes = {
  html: React.PropTypes.string.isRequired
};

module.exports = Web;
