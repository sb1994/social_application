import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios
      .get("api/users")
      .then(result => {
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <p>THis is a react app</p>
      </div>
    );
  }
}

export default App;
