import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

export default class PostTextInput extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      content: ''
    };
  }

  handleSubmit = (evt) => {
    const sContent = this.state.content.trim();
    if (evt.type === 'click' || evt.which === 13) {
      this.props.onSave(sContent);
      this.setState({ content: '' });
    }
  };

  handleChange = (evt) => {
    this.setState({ content: evt.target.value });
  };

  render() {
    return (
      <InputGroup className="mb-3" style={{ marginTop: '1em' }} >
        <FormControl
          as="textarea" rows="3"
          placeholder={this.props.placeholder}
          aria-label={this.props.placeholder}
          autoFocus={true}
          value={this.state.content}
          onChange={this.handleChange}
        />
        <InputGroup.Append>
          <Button onClick={this.handleSubmit}>Post</Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
