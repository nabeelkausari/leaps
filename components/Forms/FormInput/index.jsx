import * as React from "react";
import { FormControl, InputGroup } from "react-bootstrap";
// import { SearchIcon } from "../../../../common/images";

export const FormInput = props => {
  const { placeholder, name, onChange, value, type, disabled, ...rest } = props;
  return (
    <InputGroup>
      <FormControl
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...rest}
      />
    </InputGroup>
  );
};

export const SearchInput = props => {
  const { placeholder, name, onChange, value, type, disabled, ...rest } = props;
  return (
    <InputGroup className="search-wrapper">
      {/*<SearchIcon className="search-wrapper__icon" />*/}
      <FormControl
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...rest}
      />
    </InputGroup>
  );
};
