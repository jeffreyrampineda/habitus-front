import React, { Component } from 'react';
import PostTextInput from './PostTextInput';
import logo from '../../assets/logo_transparent.png';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';

export default class Header extends Component {

  handleSave = (content) => {
    const { currentUrl } = this.props;

    if (content.length !== 0) {
      this.props.addPost(currentUrl, null, content);
    }
  };

  render() {
    return (
      <header>
        <div className="text-center">
          <Image src={logo} fluid style={{maxWidth: "30%", marginTop: "10px"}} />
        </div>
        <Container fluid="md">
          <PostTextInput
            onSave={this.handleSave}
            placeholder="Post a comment"
          />
        </Container>
      </header>
    );
  }
}