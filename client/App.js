import React from "react";
import Main from "../client/Components/Main/Main";
import { HashRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Main />
        </div>
      </HashRouter>
    );
  }
}

export default App;
