import React from 'react';

class PersonApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id: 1, name: 'Ming Gong'},
        {id: 2, name: 'Peter Li'},
        {id: 3, name: 'Dali Wang'},
        {id: 4, name: 'Mosh Shen'},
        {id: 5, name: 'Lightory'},
        {id: 6, name: 'Michael Chen'},
        {id: 7, name: 'Bruce Lu'},
        {id: 8, name: 'Louis Chen'},
        {id: 9, name: 'Momo Wang'}
      ]
    }
  }

  render() {
    let tableRows = this.state.data.map((person) => {
      return <PersonRow key={person.id} data={person} />
    });
    return (
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    )
  }
}

class PersonRow extends React.Component {
  render() {
    let person = this.props.data;
    return(
      <tr>
        <td>{person.id}</td>
        <td>{person.name}</td>
      </tr>
    )
  }
}

PersonRow.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default PersonApp;