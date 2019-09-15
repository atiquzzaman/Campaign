import React from 'react';

export default class Status extends React.Component {
  render() {
    return (
      <span className={this.props.active ? 'active' : 'inactive'}>
        {this.props.active ? 'Active' : 'Inactive'}
      </span>
    )
  }
}