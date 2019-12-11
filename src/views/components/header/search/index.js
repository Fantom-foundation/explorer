import React, { useState } from "react";
import { FormGroup, Input } from "reactstrap";
import { SearchIcon, SearchBoldIcon } from "src/views/components/IconsSvg";

export default () => {
  const [active, setActive] = useState(false);
  function activeHandler(val) {
    setActive(val);
  }
  return (
    <div className="headerSearchWrapper">
      <button
        className="text-white toggle-btn d-lg-none"
        onClick={() => activeHandler(true)}
        //onBlur={() => activeHandler(!active)}
      >
        <SearchIcon />
      </button>
      <div className={`headerSearch ${active ? "active" : ""}`}>
        <FormGroup className="mb-0">
          <Input type="search" placeholder="Search" />
          <button className="btn-search ">
            <SearchIcon />
            <SearchBoldIcon />
          </button>
        </FormGroup>
      </div>
    </div>
  );
};
