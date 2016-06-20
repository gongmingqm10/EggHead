import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  TextInput,
  TouchableHighlight
} from 'react-native';

var api = require('../Utils/api');
var Budge = require('./Budge');
var Separator = require('./Helpers/Separator');

class Notes extends Component {
  constructor(props) {
    super(props);
    this.datasource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.datasource.cloneWithRows(this.props.notes),
      notes: this.props.notes,
      note: '',
      error: ''
    };
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text>{rowData}</Text>
        </View>
        <Separator />
      </View>
    )
  }

  handleChange(event) {
    this.setState({
      note: event.nativeEvent.text
    });
  }

  submitNote() {
    var note = this.state.note;
    var notes = this.state.notes;

    this.setState({
      note: ''
    });
    api.addNotes(this.props.userInfo.login, note)
      .then((data) => {
        notes[data] = note;
        this.setState({
          notes: notes,
          dataSource: this.datasource.cloneWithRows(notes)
        });
      }).catch((error) => {
      console.log('Request failed', error);
      this.setState({
        error: error
      });
    });
  }


  footer() {
    return (
      <View style={styles.footContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange.bind(this)}
          placeholder="New Note"
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.submitNote.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          enableEmptySections={true}
          renderHeader={() => <Budge userInfo={this.props.userInfo} />}
        />
        {this.footer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10
  },
  footContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

Notes.propTypes = {
  notes: React.PropTypes.object.isRequired,
  userInfo: React.PropTypes.object.isRequired
};

module.exports = Notes;