import { useState, useContext } from "react";
import "../Styles/NewColorForm.css";
import { FC } from "react";
import ColorsContext from "../store/colors-context";

const NewColorForm: FC = () => {
  const ctx = useContext(ColorsContext);
  const colorList = ctx.colorList;
  const addColor = ctx.addColor;

  const [colorName, setColorName] = useState("");
  const [colorValues, setColorValues] = useState({ red: 0, green: 0, blue: 0 });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newColor = {
      name: colorName,
      red: colorValues.red,
      green: colorValues.green,
      blue: colorValues.blue,
    };

    addColor(newColor);
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!value.match(/^([A-Z#]{0,1})([A-Z]{0,12})$/)) {
      return;
    }

    setColorName(e.currentTarget.value);
  };

  const onChangeColor: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = +e.currentTarget.value;

    if (Number.isNaN(value) || value > 255 || value < 0) {
      return;
    }

    const colorToChange = e.target.name;
    if (colorToChange === "red")
      setColorValues((prevState) => {
        return { ...prevState, red: value };
      });
    if (colorToChange === "green")
      setColorValues((prevState) => {
        return { ...prevState, green: value };
      });
    if (colorToChange === "blue")
      setColorValues((prevState) => {
        return { ...prevState, blue: value };
      });
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <label>Color Name: </label>
        <input
          type="text"
          name="colorName"
          value={colorName}
          onChange={onChange}
        ></input>
        <br />

        <label>Red: </label>
        <input
          type="number"
          id="red"
          name="red"
          value={colorValues.red}
          onChange={onChangeColor}
          min={0}
          max={255}
        ></input>
        <br />

        <label>Green: </label>
        <input
          type="number"
          name="green"
          value={colorValues.green}
          onChange={onChangeColor}
          min={0}
          max={255}
        ></input>
        <br />

        <label>Blue: </label>
        <input
          type="number"
          name="blue"
          value={colorValues.blue}
          onChange={onChangeColor}
          min={0}
          max={255}
        ></input>
        <br />
        <button type="submit" disabled={colorName.length < 1}>
          submit
        </button>
      </form>
    </div>
  );
};

export default NewColorForm;
