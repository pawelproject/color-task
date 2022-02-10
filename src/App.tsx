import React from "react";
import ColorList from "./components/ColorList";
import NewColorForm from "./components/NewColorForm";
import "./Styles/App.css";
import { ColorsContextProvider } from "./store/colors-context";

import { FC } from "react";

const App: FC = () => {
  return (
    <ColorsContextProvider>
      <div className="App">
        <NewColorForm />
        <br />

        <ColorList />
      </div>
    </ColorsContextProvider>
  );
};

export default App;
