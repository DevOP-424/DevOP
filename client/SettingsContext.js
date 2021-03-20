import React, { useState, createContext } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = (props) => {
  const [settings, setSettings] = useState({
    username: "james",
    password: "default",
    url: "localhost",
    port: "22446",
  });
  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {props.children}
    </SettingsContext.Provider>
  );
};
