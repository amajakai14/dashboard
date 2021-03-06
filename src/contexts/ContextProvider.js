import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

const initilialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initilialState);

  const [screenSize, setScreenSize] = useState(undefined);

  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");

  const [themeSettings, setThemeSettings] = useState(false);

  const setMode = (e) => {
    setCurrentMode(e.target.value);

    //  setThemeSettings(false);
    localStorage.setItem("themeMode", e.target.value);
  };
  const setColor = (color) => {
    setCurrentColor(color);

    // setThemeSettings(false);
    localStorage.setItem("colorMode", color);
  };

  useEffect(() => {
    const initTheme = localStorage.getItem("themeMode");
    const initColor = localStorage.getItem("colorMode");
    if (initTheme) setCurrentMode(initTheme);
    if (initColor) setCurrentColor(initColor);
  }, []);

  const handleClick = (clicked) => {
    if (isClicked[clicked]) {
      setIsClicked(initilialState);
    } else {
      setIsClicked({ ...initilialState, [clicked]: true });
    }
  };
  return (
    <StateContext.Provider
      value={{
        initilialState,
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        setColor,
        setMode,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
