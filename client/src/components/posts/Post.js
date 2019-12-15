import React, { Component } from "react";
import Moment from "react-moment";
import CommentForm from "./CommentForm";
import { connect } from "react-redux";
import { addPostLike } from "../../actions/postActions";

export class Post extends Component {
  onAddLikeClick(id) {
    this.props.addPostLike(id);
  }
  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={this.props.post.user.profile_pic}
                  alt="Card image cap"
                  style={style}
                />
                <span>{this.props.post.user.name}</span>
              </div>
              <div className="col-md-6">
                <Moment className="text-right" format="YYYY/MM/DD">
                  {this.props.post.created}
                </Moment>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">{this.props.post.text}</div>
              <div className="col-md-12">
                <img
                  className="img-responsive card-img"
                  src={this.props.post.postImgURL}
                />
              </div>
            </div>
            <button
              onClick={this.onAddLikeClick.bind(this, this.props.post._id)}
              type="button"
            >
              like
            </button>
            <span>{this.props.post.likes.length}</span>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <CommentForm post={this.props.post._id} />
              </div>
              <div className="col-md-12"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

let style = {
  height: 30
};
export default connect(
  mapStateToProps,
  { addPostLike }
)(Post);
