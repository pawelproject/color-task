import { useState, useContext } from "react";
import "../Styles/ColorList.css";
import FilterForm from "./FilterForm";
import { FC } from "react";
import ColorsContext from "../store/colors-context";

const ColorList: FC = () => {
  const ctx = useContext(ColorsContext);
  const colorList = ctx.colorList;
  const deleteColor = ctx.deleteColor;

  const [filterConditions, setFilterConditions] = useState({
    red: false,
    green: false,
    blue: false,
    saturation: false,
  });

  const sortedList = [...colorList].sort((a, b) => {
    if (b.red - a.red === 0) {
      if (b.green - a.green >= 0) {
        if (b.green - a.green > 0) {
          return b.green - a.green;
        } else if (b.blue - a.blue > 0) {
          return b.blue - a.blue;
        }
      }
    }
    return b.red - a.red;
  });

  const filteredColorList = sortedList.filter((color) => {
    let result = true;
    if (filterConditions.red === true) {
      result = color.red > 127;
    }
    if (filterConditions.green === true && result === true) {
      result = color.green > 127;
    }
    if (filterConditions.blue === true && result === true) {
      result = color.blue > 127;
    }
    if (filterConditions.saturation === true && result === true) {
      const colorValues = [
        color.red / 255,
        color.blue / 255,
        color.green / 255,
      ];
      const max = Math.max(...colorValues);
      const min = Math.min(...colorValues);

      const saturation = (max - min) / (1 - Math.abs(max + min - 1));
      result = saturation > 0.5;
    }
    return result;
  });

  const changeFilters = (e: { checked: boolean; name: string }) => {
    const checked = e.checked;
    const filterName = e.name;
    if (filterName === "red") {
      setFilterConditions((PrevState) => {
        return { ...PrevState, red: checked };
      });
    }
    if (filterName === "green") {
      setFilterConditions((PrevState) => {
        return { ...PrevState, green: checked };
      });
    }
    if (filterName === "blue") {
      setFilterConditions((PrevState) => {
        return { ...PrevState, blue: checked };
      });
    }
    if (filterName === "saturation") {
      setFilterConditions((PrevState) => {
        return { ...PrevState, saturation: checked };
      });
    }
  };

  const filterOptions = Object.keys(filterConditions);

  return (
    <div>
      <h2>Lista kolorow</h2>
      <FilterForm changeFilters={changeFilters} filterOptions={filterOptions} />
      <br />
      <div className="color-list">
        {filteredColorList.map((color, i) => {
          return (
            <div className="color-item" key={i}>
              <div
                className={`color-triangle`}
                style={{
                  backgroundColor: `rgb(${color.red},${color.green},${color.blue})`,
                }}
              ></div>
              <div className="color-name">{color.name} </div>
              {/* <div>
                {color.red} {color.green} {color.blue}
              </div> */}

              {!color.id.includes("default") && (
                <button
                  className="delete-btn"
                  onClick={() => deleteColor(color.id)}
                >
                  x
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorList;
