import React, { Component } from 'react';
import PostItem from './PostItem';
import Container from 'react-bootstrap/Container';

export default class MainSection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      offset: 0
    };
  }

  debounce = (fn, time) => {
    let timeout;

    return function () {
      const functionCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  }

  componentDidMount() {
    // Initial load
    this.loadPosts();
  }

  loadPosts = () => {
    const { currentUrl, jumpSize } = this.props;

    this.props.actions.fetchPosts(currentUrl, null, jumpSize, this.state.offset);
    this.setState(prevState => ({
      offset: prevState.offset + jumpSize
    }));
  }

  render() {
    const { posts, currentUrl, jumpSize, actions } = this.props;

    let postsView = '';

    if (posts.items === null) {
      postsView = 'Unable to retrieve posts list';
    } else if (posts.items.length === 0) {
      postsView = "No posts yet. Why don't you post one?";
    }

    else {
      postsView = <div>
        {posts.items.map(post => {
          if (post.replyPostId) {
            // If a reply, don't render
            return (null);
          }
          return (<PostItem
            key={post.id}
            currentUrl={currentUrl}
            jumpSize={jumpSize}
            post={post}
            hasMore={posts.hasMore}
            fetchPosts={actions.fetchPosts}
            addPost={actions.addPost} />)
        }
        )}
      </div>
    }

    return (
      <Container fluid="md" style={{ marginBottom: '10px' }}>
        {postsView}
        <div style={{textAlign: 'center'}}>
          <a style={{
                  color: '#737373',
                  fontStyle: 'italic',
                  cursor: 'pointer'
              }}
              hidden={!this.props.posts.hasMore['root']}
              onClick={this.loadPosts}>Show more...
          </a>
        </div>
      </Container>
    );
  }
}
