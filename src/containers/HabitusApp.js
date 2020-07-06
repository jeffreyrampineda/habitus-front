import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Habitus/Header';
import MainSection from '../components/Habitus/MainSection';
import * as PostActions from '../actions/posts';
import Container from 'react-bootstrap/Container';

const JUMP_SIZE = 50;

class App extends Component {

  render() {
    const { currentUrl, posts, actions } = this.props;

    return (
      <Container>
        <Header addPost={actions.addPost} currentUrl={currentUrl} />
        <MainSection posts={posts} actions={actions} currentUrl={currentUrl} jumpSize={JUMP_SIZE}/>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { posts } = state

  return {
    posts
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PostActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)