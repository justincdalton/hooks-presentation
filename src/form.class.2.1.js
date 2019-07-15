import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { isRequired, isEmail } from './validations';
import './styles.css';

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <TextField
          label="Email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    );
  }
}
