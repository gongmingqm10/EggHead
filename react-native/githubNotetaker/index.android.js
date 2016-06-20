/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  Image,
  View,
  Navigator
} from 'react-native';

import Main from './App/Components/Main';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111'
  },
  leftNavButtonText: {
    fontSize: 16,
    color: 'white'
  },
  rightNavButtonText: {
    fontSize: 16,
    color: 'white'
  },
  title: {
    fontSize: 18,
    color: 'white'
  },
  navBar: {
    backgroundColor: '#2979FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  backImg: {
    height: 32,
    width: 32,
    margin: 12,
    resizeMode: 'stretch'
  },
  titleContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeMenu: {
    height: 32,
    width: 32,
    margin: 12,
    resizeMode: 'stretch'
  },
  leftNavContainer: {
    height: 56,
    width: 56
  }
});

class githubNotetaker extends Component {
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{component: Main, title: 'Notetaker', index: 0}}
        renderScene={this.navigatorRenderScene}
        configureScene={this.configureScene}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
  }

  navigatorRenderScene(route, navigator) {
    return <route.component navigator={navigator} title={route.title} {...route.passProps}/>
  }

  configureScene(route, routeStack) {
    if (route.type === 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }

}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index === 0) {
      return (<View>
        <Image style={styles.backImg} source={require('./images/ic_menu_white_36dp.png')} />
      </View>);
    } else {
      return (<TouchableHighlight
        style={styles.leftNavContainer}
        underlayColor="transparent"
        onPress={() => navigator.pop()}>
        <Image style={styles.backImg} source={require('./images/ic_arrow_back_white_36dp.png')} />
      </TouchableHighlight>);
    }
  },
  RightButton(route, navigator, index, navState) {
    if (route.onPress) {
      return (
        <TouchableHighlight
          onPress={() => route.onPress() }>
          <Text style={styles.rightNavButtonText}>
            {route.rightText}
          </Text>
        </TouchableHighlight>
      );
    }
  },
  Title(route, navigator, index, navState) {
    return <View style={styles.titleContainer}><Text style={styles.title}>{route.title}</Text></View>
  }
};

AppRegistry.registerComponent('githubNotetaker', () => githubNotetaker);
