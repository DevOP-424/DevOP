import React from "react";
import Main from "../client/Components/Main/Main";
import { HashRouter } from "react-router-dom";
import { SettingsProvider } from "./SettingsContext";

class App extends React.Component {
  render() {
    return (
      <SettingsProvider>
        <HashRouter>
          <div className="App">
            <Main />
          </div>
        </HashRouter>
      </SettingsProvider>
    );
  }
}

export default App;
