import { Component } from "react";
import FilterFormInput from "./FilterFormInput";

interface IFilterFormProps {
  changeFilters: (obj: { checked: boolean; name: string }) => void;
  filterOptions: string[];
}

class FilterForm extends Component<IFilterFormProps> {
  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    const filterName = e.currentTarget.value;
    this.props.changeFilters({ checked: checked, name: filterName });
  };

  render() {
    return (
      <div>
        <h3>Filter Options</h3>
        <form>
          {this.props.filterOptions.map((option) => {
            return (
              <FilterFormInput
                key={option}
                changeFilters={this.props.changeFilters}
                filterName={option}
              />
            );
          })}
        </form>
      </div>
    );
  }
}

export default FilterForm;
