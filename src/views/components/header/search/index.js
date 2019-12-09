import React from "react";
import { FormGroup, Input } from "reactstrap";
export default () => (
  <div className="headerSearch">
    <FormGroup className="mb-0">
      <Input type="search" placeholder="Search" />
      <button className="btn-search">
        <i className="fas fa-search" />
      </button>
    </FormGroup>
  </div>
);
