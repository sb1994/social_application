import axios from "axios";

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_INPUT_ERRORS
} from "./action_types";

// Add Post
export const addPost = postData => dispatch => {
  // dispatch(clearInputErrors());
  const { text, latitude, longitude, postImgURL } = postData;
  // console.log(postData);
  console.log(postData);
  // const dispatch = dispatch;

  axios
    .post("/api/posts/create", { text, latitude, longitude, postImgURL })
    .then(
      res =>
        dispatch({
          type: ADD_POST,
          payload: res.data
        })
      // console.log(res)
    )
    .then(() => {
      dispatch(setPostLoading());
      axios
        .get("/api/posts/")
        .then(res =>
          dispatch({
            type: GET_POSTS,
            payload: res.data
          })
        )
        .catch(err =>
          dispatch({
            type: GET_POSTS,
            payload: null
          })
        );
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts/")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};
// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Add Like
export const addPostLike = id => dispatch => {
  //sends the post_id off to the the backend
  //then it gets a fresh list of the posts
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
  // console.log(id);
};
// Clear post input errors
export const clearInputErrors = () => {
  return {
    type: CLEAR_INPUT_ERRORS
  };
};
// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
