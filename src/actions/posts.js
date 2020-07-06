import * as types from '../constants/ActionTypes';

function requestPosts() {
  return {
    type: types.REQUEST_POSTS,
    isLoading: true
  }
}

function requestPostsSuccess(replyPostId, data) {
  return {
    type: types.REQUEST_POSTS_SUCCESS,
    posts: data ? data.posts : [],
    replyPostId: replyPostId,
    hasMore: data ? data.hasMore : false,
    isLoading: false
  }
}

function requestPostsFailed(error) {
  return {
    type: types.REQUEST_POSTS_FAILED,
    error: error.message,
    posts: null
  }
}

export function fetchPosts(url, replyPostId = null, limit = 50, offset = 0) {
  let qs = `&limit=${limit}&offset=${offset}`;
  qs += replyPostId != null ? `&replyPostId=${replyPostId}` : '';

  return dispatch => {
    dispatch(requestPosts());
    return fetch(`/api/posts?url=${url}${qs}`)
      .then(response => response.json())
      .then(data => dispatch(requestPostsSuccess(replyPostId, data)))
      .catch(error => dispatch(requestPostsFailed(error)))
  };
}

function sendPost() {
  return {
    type: types.SEND_POST,
  }
}

function sendPostSuccess(data) {
  return {
    type: types.SEND_POST_SUCCESS,
    post: data.post
  }
}

function sendPostFailed(error) {
  return {
    type: types.SEND_POST_FAILED,
    error: error.message,
  }
}

export function addPost(url, replyPostId = null, content = '') {
  return dispatch => {
    dispatch(sendPost());
    fetch('/api/posts', {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ url, replyPostId, content })
    })
      .then(response => response.json())
      .then(data => dispatch(sendPostSuccess(data)))
      .catch(error => dispatch(sendPostFailed(error)));
  };
}
