import React, { Component } from "react";
// // import axios from "axios";
// import { storage } from "../../firebase";
import { connect } from "react-redux";
import { registerUser } from "../../actions/userAuthActions";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handleFileChange = e => {
  //   if (e.target.files[0]) {
  //     const avatar = e.target.files[0];
  //     this.setState({
  //       avatar,
  //       avatarURL: URL.createObjectURL(avatar)
  //     });
  //   }
  // };
  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    let { email, password, name } = this.state;

    const registerData = {
      password,
      email,
      name
    };
    // console.log(registerData);
    this.props.registerUser(registerData);
    this.props.history.push("/login");
  };
  render() {
    // const { avatarURL } = this.state;
    return (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="emailInput">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter email"
              onChange={this.handleInputChange}
              name="email"
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={this.handleInputChange}
              name="password"
              value={this.state.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nameInput">Name</label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              placeholder="Name"
              onChange={this.handleInputChange}
              name="name"
              value={this.state.name}
            />
          </div>
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Register
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
