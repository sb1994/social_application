import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import { storage } from "../../firebase";
import { isEmpty } from "lodash";
import { log } from "util";

export class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      latitude: "",
      longitude: "",
      post_pic: {},
      postPicURL: ""
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleFileChange(e) {
    if (e.target.files[0]) {
      const post_pic = e.target.files[0];
      this.setState({
        post_pic,
        postImgURL: URL.createObjectURL(post_pic)
      });
    }
  }
  onSubmit(e) {
    // e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        //check if both inputs have values
        if (isEmpty(this.state.post_pic) && this.state.text !== "") {
          console.log("Will post text not image");
          const newPost = {
            text: this.state.text,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log(newPost);
          this.props.addPost(newPost);
          this.setState({
            text: "",
            latitude: "",
            longitude: ""
          });
        } else if (
          isEmpty(this.state.post_pic) === false &&
          this.state.text === ""
        ) {
          console.log("Will post new image not text");
        } else {
          const newPost = {
            text: this.state.text,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            post_pic: this.state.post_pic,
            postImgURL: ""
          };
          const uploadTask = storage
            .ref(`post_imgs/${newPost.post_pic.name}`)
            .put(newPost.post_pic);
          uploadTask.on(
            "state_changed",
            snapshot => {
              console.log(snapshot);
            },
            error => {
              console.log(error);
            },
            () => {
              console.log("IMAGE UPLOADED");
              //what happens whent the postIm has finished uploading
              storage
                .ref("post_imgs")
                .child(newPost.post_pic.name)
                .getDownloadURL()
                .then(url => {
                  let postImgUrl = url;
                  console.log(postImgUrl);
                  newPost.postImgURL = postImgUrl;
                  this.props.addPost(newPost);
                  // console.log(newPost);
                  this.setState({
                    text: "",
                    latitude: "",
                    longitude: "",
                    post_pic: {},
                    postImgURL: ""
                  });
                })
                .catch(err => {
                  console.log(err);
                });
            }
          );
        }

        // if (Object.keys(this.state.post_pic).length ===  && this.state.text !== "") {

        // }
        // console.log(position.coords);
        //will just upload a text post
        // if (this.state.post_pic ===  && this.state.text !== "") {
        // const newPost = {
        //   text: this.state.text,
        //   latitude: position.coords.latitude,
        //   longitude: position.coords.longitude
        // };
        // console.log(newPost);
        // this.props.addPost(newPost);
        // this.setState({
        //   text: "",
        //   latitude: "",
        //   longitude: ""
        // });
        // } else {
        //   const newPost = {
        //     text: this.state.text,
        //     latitude: position.coords.latitude,
        //     longitude: position.coords.longitude,
        //     post_pic: this.state.post_pic,
        //     postImgURL: ""
        //   };
        //   // const uploadTask = storage
        //   //   .ref(`post_imgs/${newPost.post_pic.name}`)
        //   //   .put(newPost.post_pic);
        //   // uploadTask.on(
        //   //   "state_changed",
        //   //   snapshot => {
        //   //     console.log(snapshot);
        //   //   },
        //   //   error => {
        //   //     console.log(error);
        //   //   },
        //   //   () => {
        //   //     console.log("IMAGE UPLOADED");
        //   //     //what happens whent the postIm has finished uploading
        //   //     storage
        //   //       .ref("post_imgs")
        //   //       .child(newPost.post_pic.name)
        //   //       .getDownloadURL()
        //   //       .then(url => {
        //   //         let postImgUrl = url;
        //   //         console.log(postImgUrl);
        //   //         newPost.postImgURL = postImgUrl;
        //   //         this.props.addPost(newPost);
        //   //         // console.log(newPost);
        //   //         this.setState({
        //   //           text: "",
        //   //           latitude: "",
        //   //           longitude: "",
        //   //           post_pic: "",
        //   //           postImgURL: ""
        //   //         });
        //   //       })
        //   //       .catch(err => {
        //   //         console.log(err);
        //   //       });
        //   //   }
        //   // );
        // }
      });
    }
    // const { user } = this.props.auth;

    //  this.props.addPost(newPost);
    //  this.setState({ text: "" });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { postImgURL } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Something....
          </div>
          <div className="card-body">
            {/* <form onSubmit={this.onSubmit}> */}
            <div className="form-group">
              <input
                type="text"
                value={this.state.text}
                placeholder="Speack your mind"
                onChange={this.onChange}
                name="text"
              />
            </div>
            <div className="form-group">
              <img
                src={postImgURL}
                className="img-responsive card-img"
                alt=""
              />
              <input
                type="file"
                value={this.state.profile_pic}
                name="avatar"
                id="avatar"
                onChange={this.handleFileChange}
              />
            </div>
            <button className="btn btn-dark" onClick={this.onSubmit}>
              Submit
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
