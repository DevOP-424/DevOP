import React from "react";
import Main from './Components/Main/Main.js';
import { HashRouter } from 'react-router-dom';

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