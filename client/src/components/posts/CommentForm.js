import React, { Component } from "react";
import { connect } from "react-redux";
// import { addComment } from "../../actions/postActions";
import { storage } from "../../firebase";
export class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      latitude: "",
      longitude: "",
      comment_pic: {},
      commentPicURL: ""
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleFileChange(e) {
    if (e.target.files[0]) {
      const comment_pic = e.target.files[0];
      this.setState({
        comment_pic,
        commentImgURL: URL.createObjectURL(comment_pic)
      });
    }
  }
  onSubmit(e) {
    // e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position.coords);
        //will just upload a text comment
        if (this.state.comment_pic === "" && this.state.text !== "") {
          const newComment = {
            text: this.state.text,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          console.log(newComment);
        } else {
          // const newComment = {
          //   text: this.state.text,
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          //   comment_pic: this.state.comment_pic,
          //   commentImgURL: ""
          // };
          // const uploadTask = storage
          //   .ref(`comment_imgs/${newComment.comment_pic.name}`)
          //   .put(newComment.comment_pic);
          // uploadTask.on(
          //   "state_changed",
          //   snapshot => {
          //     console.log(snapshot);
          //   },
          //   error => {
          //     console.log(error);
          //   },
          //   () => {
          //     console.log("IMAGE UPLOADED");
          //     //what happens whent the commentIm has finished uploading
          //     storage
          //       .ref("comment_imgs")
          //       .child(newComment.comment_pic.name)
          //       .getDownloadURL()
          //       .then(url => {
          //         let commentImgUrl = url;
          //         console.log(commentImgUrl);
          //         newComment.commentImgURL = commentImgUrl;
          //         this.props.addcomment(newComment);
          //         // console.log(newComment);
          //         this.setState({
          //           text: "",
          //           latitude: "",
          //           longitude: "",
          //           commentPicURL: ""
          //         });
          //       })
          //       .catch(err => {
          //         console.log(err);
          //       });
          //   }
          // );
        }
      });
    } else {
    }
    // const { user } = this.props.auth;

    //  this.props.addcomment(newPost);
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
          <div className="card-header bg-info text-white">Comment now</div>
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
  mapStateToProps
  // { addComment }
)(CommentForm);
