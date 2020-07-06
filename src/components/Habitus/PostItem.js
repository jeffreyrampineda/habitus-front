import React, { Component } from 'react';
import PostTextInput from './PostTextInput';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class PostItem extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            showReplies: false,
            showReplyTextInput: false,
            initialLoad: true,
            offset: 0,
            replyPostIdString: this.props.post.id != null ? this.props.post.id.toString() : 'null'
        }
    }

    handleSave = (content) => {
        const { currentUrl, post } = this.props;

        if (content.length !== 0) {
            if (!this.state.showReplies) {
                this.toggleReplies();
            }
            this.props.addPost(currentUrl, post.id, content);
        }
    };

    loadReplies = () => {
        const { currentUrl, jumpSize, post, fetchPosts, hasMore } = this.props;

        // Return if not initalLoad or if no more to load
        if (!this.state.initialLoad && !hasMore[this.state.replyPostIdString]) { return; }

        fetchPosts(currentUrl, post.id, jumpSize, this.state.offset);
        this.setState(prevState => ({
            offset: prevState.offset + jumpSize
        }));
    }

    toggleReplies() {
        if (this.state.initialLoad) {
            this.loadReplies();
            this.setState({
                initialLoad: false
            });
        }
        this.setState(prevState => ({
            showReplies: !prevState.showReplies
        }));
    }

    toggleReplyTextInput() {
        this.setState(prevState => ({
            showReplyTextInput: !prevState.showReplyTextInput
        }));
    }

    render() {
        const { post, currentUrl, jumpSize, hasMore } = this.props;
        const { showReplies, showReplyTextInput } = this.state;

        let showRepliesText;
        let replyToView = post.replyPostId ? <Card.Subtitle className="mb-2 text-muted">Reply to <a href={"#" + post.replyPostId}>#{post.replyPostId}</a></Card.Subtitle> : null;

        if (showReplies) {
            showRepliesText = 'Hide replies';
        } else {
            showRepliesText = post.hasReply ? 'Show replies' : '';
        }

        return (
            <Row style={{ marginTop: '8px', marginBottom: '8px' }}>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title className="d-flex">
                                <a name={post.id} href={"#" + post.id}>
                                    #{post.id}
                                </a>
                                <small className="ml-auto">
                                    {new Intl.DateTimeFormat('en-GB').format(new Date(post.createdAt))}
                                </small>
                            </Card.Title>
                            {replyToView}
                            <Card.Text>
                                <span style={{ whiteSpace: 'pre-line' }}>{post.content}</span>
                            </Card.Text>
                            <Card.Link style={{
                                color: '#737373',
                                fontStyle: 'italic',
                                cursor: 'pointer'
                            }} onClick={this.toggleReplies.bind(this)}>{showRepliesText}</Card.Link>
                            <div style={{ float: 'right' }}>
                                <Button onClick={this.toggleReplyTextInput.bind(this)}>Reply</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    <div hidden={!showReplyTextInput}>
                        <PostTextInput
                            onSave={this.handleSave}
                            placeholder="Post a reply" />
                    </div>
                    <div hidden={!showReplies} style={{ width: '98%', float: 'right' }}>
                        {post.replies.map(reply =>
                            <PostItem
                                key={reply.id}
                                currentUrl={currentUrl}
                                jumpSize={jumpSize}
                                post={reply}
                                hasMore={hasMore}
                                fetchPosts={this.props.fetchPosts}
                                addPost={this.props.addPost} />
                        )}

                        <Card.Link style={{
                                color: '#737373',
                                fontStyle: 'italic',
                                cursor: 'pointer'
                            }}
                            hidden={!hasMore[this.state.replyPostIdString]}
                            onClick={this.loadReplies}>Show more replies...
                        </Card.Link>
                    </div>
                </Col>
            </Row>
        );
    }
}
