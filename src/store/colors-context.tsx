import React, { useState, useEffect } from "react";

type ColorWithoutId = {
  name: string;
  red: number;
  green: number;
  blue: number;
};

// type Color = ColorWithoutId & { id: string };

interface Color extends ColorWithoutId {
  id: string;
}

const DEFAULT_COLORS: Color[] = [
  { id: "default1", name: "ZIELONY", red: 0, green: 255, blue: 0 },
  { id: "default2", name: "CZERWONY", red: 255, green: 0, blue: 0 },
];

const defaultState = {
  colorList: DEFAULT_COLORS,
  addColor: (color: ColorWithoutId) => {},
  deleteColor: (id: string) => {},
};

const ColorsContext = React.createContext(defaultState);

export const ColorsContextProvider = (props: { children: React.ReactNode }) => {
  const [data, setData] = useState(localStorage.getItem("colorList") || "[]");
  const userColorList: Color[] = JSON.parse(data);
  const entireColorList = [...userColorList, ...DEFAULT_COLORS];

  const addColor = (color: ColorWithoutId) => {
    const dataJson = JSON.stringify([
      ...userColorList,
      {
        id: Date.now().toString(),
        name: color.name,
        red: color.red,
        green: color.green,
        blue: color.blue,
      },
    ]);
    localStorage.setItem("colorList", dataJson);
    setData(dataJson);
  };

  const deleteColor = (id: string) => {
    const elementToDelete = userColorList.findIndex(
      (color: Color) => color.id === id
    );

    const newUserColorList = [...userColorList.splice(elementToDelete, 1)];
    const dataJson = JSON.stringify(userColorList);

    localStorage.setItem("colorList", dataJson);
    setData(dataJson);
  };

  return (
    <ColorsContext.Provider
      value={{
        colorList: entireColorList,
        addColor: addColor,
        deleteColor: deleteColor,
      }}
    >
      {props.children}
    </ColorsContext.Provider>
  );
};

export default ColorsContext;
