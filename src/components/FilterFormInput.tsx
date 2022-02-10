import { Component } from "react";

interface IFilterFormInputProps {
  changeFilters: (obj: { checked: boolean; name: string }) => void;
  filterName: string;
}

class FilterFormInput extends Component<IFilterFormInputProps> {
  filterName = this.props.filterName;
  toggleFilter = (e: React.FormEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    this.props.changeFilters({ checked: checked, name: this.filterName });
  };

  render() {
    return (
      <>
        <input
          type="checkbox"
          id={`${this.filterName}ColorCheckBox`}
          name={`${this.filterName}ColorCheckBox`}
          value={`${this.filterName}`}
          onChange={this.toggleFilter}
        />
        <label id={`${this.filterName}ColorCheckBox`}>
          {`${this.filterName.slice(0, 1).toUpperCase()}${this.filterName.slice(
            1
          )} > 50%`}
        </label>
        <br />
      </>
    );
  }
}

export default FilterFormInput;
