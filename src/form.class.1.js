import React from 'react';
import {
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import './styles.css';

const validations = [isRequired('name'), isEmail('email')];

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      errors: {},
      submitted: false,
      submitting: false,
    };
  }

  validate = () => {
    const values = {
      name: this.state.name,
      email: this.state.email,
    };
    errors = {};

    validations.forEach((validate) => {
      validate(values, errors);
    });

    return errors;
  };

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

  handleNameBlur = () => {
    const errors = this.validate();

    this.setState({
      errors: {
        ...this.state.errors,
        name: errors.name,
      },
    });
  };

  handleEmailBlur = () => {
    const errors = this.validate();

    this.setState({
      errors: {
        ...this.state.errors,
        email: errors.email,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();

    if (Object.keys(errors).length) {
      this.setState({
        errors,
      });

      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitted: true,
        submitting: false,
      });
    }, 1000);
  };

  render() {
    if (this.state.submitted) {
      return <div>Submitted! Yayay!</div>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label="Name"
          value={this.state.name}
          onChange={this.handleNameChange}
          onBlur={this.handleNameBlur}
          error={this.state.errors.name}
        />
        <TextField
          label="Email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          onBlur={this.handleEmailBlur}
          error={this.state.errors.email}
        />
        <Button type="submit">
          {this.state.submitting && (
            <CircularProgress className="loader" size={20} />
          )}
          Submit
        </Button>
      </form>
    );
  }
}
