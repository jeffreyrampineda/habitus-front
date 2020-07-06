import * as types from '../constants/ActionTypes';

const INITIAL_STATE = {
  items: [],
  hasMore: {},
  isLoading: false,
};

const pushData = (exising, data) => {
  return [...exising, ...data];
}

const unshiftData = (existing, data) => {
  return [...data, ...existing];
}

const depthFirstInsert = (topNodes, replies, replyPostId, insertFunc) => {
  return topNodes.map(post => {
    if (post.id === replyPostId) {
      post.hasReply = true;
      post.replies = insertFunc(post.replies, replies);
    } else if (post.replies.length > 0) {
      post.replies = depthFirstInsert(post.replies, replies, replyPostId, insertFunc);
    }
    return post;
  });
}

const updatePosts = (oldPosts, newPosts, replyPostId, insertFunc) => {

  // Set default undefined replies to []
  newPosts = newPosts.map(item => {
    item.replies = [];
    return item;
  });

  // If updating replies, depthFirstInsert
  return replyPostId ? depthFirstInsert(oldPosts, newPosts, replyPostId, insertFunc):
    insertFunc(oldPosts, newPosts);
}

const posts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_POSTS:
      return Object.assign({}, state, {
        isLoading: action.isLoading
      })

    case types.REQUEST_POSTS_SUCCESS:
      return Object.assign({}, state, {
        items: updatePosts(state.items, action.posts, action.replyPostId, pushData),
        isLoading: action.isLoading,
        hasMore: Object.assign({}, state.hasMore, {
          [action.replyPostId || 'root']: action.hasMore
        })
      })

    case types.REQUEST_POSTS_FAILED:
      return Object.assign({}, state, {
        items: action.posts
      })

    case types.SEND_POST_SUCCESS:
      return Object.assign({}, state, {
        items: updatePosts(state.items, [action.post], action.post.replyPostId, unshiftData)
      })

    default:
      return state;
  }
};

export default posts;
