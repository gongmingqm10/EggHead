import React, {Component} from 'react';

import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Platform
} from 'react-native';

var Budge = require('./Budge');
var Separator = require('./Helpers/Separator');
var Web = require('./Helpers/Web');

class Repositories extends Component {
  openWebView(url) {
    this.props.navigator.push({
      title: 'Web View',
      component: Web,
      passProps: {
        html: url
      }
    });
  }

  render() {
    var repos = this.props.repos;
    var list = repos.map((repo, index) => {
      var descView = repo.description ? <Text style={styles.repoDesc}>{repo.description}</Text> : <View/>;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              underlayColor="rgba(0 ,0 ,0 ,0)"
              onPress={this.openWebView.bind(this, repo.html_url)}>
              <Text style={styles.repoTitle}>{repo.name}</Text>
            </TouchableHighlight>
            <Text style={styles.repoStars}>Stars: {repo.stargazers_count}</Text>
            {descView}
            <Separator />
          </View>
        </View>
      );
    });

    return(
      <ScrollView style={styles.container}>
        <Budge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: (Platform.OS === 'ios') ? 65 : 56
  },
  rowContainer: {
    paddingLeft: 8,
    paddingRight: 8
  },
  repoTitle: {
    fontSize: 18,
    color: '#48BBEC'
  },
  repoStars: {
    fontSize: 15,
    color: '#48BBEC'
  },
  repoDesc: {
    fontSize: 15,
    marginTop: 4
  }
});

Repositories.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  repos: React.PropTypes.array.isRequired
};

module.exports  = Repositories;

