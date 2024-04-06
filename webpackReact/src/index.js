import React, { Component } from "react";
import ReactDOM from "react-dom/client";

class App extends Component {
  render() {
    return <div>react frame content.....221232..</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
