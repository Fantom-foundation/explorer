import React from "react";
import {
  ArrowBack,
  ArrowBackword,
  ArrowRight,
  ArrowForward
} from "src/views/components/IconsSvg/index.js";
export default () => (
  <div className="pagination">
    <button className="btn-arrow">
      <ArrowBack />
    </button>
    <button className="btn-arrow">
      <ArrowBackword />
    </button>
    <div className="page-number">
      <p>Page 1 of 2</p>
    </div>
    <button className="btn-arrow active">
      <ArrowRight />
    </button>
    <button className="btn-arrow active">
      <ArrowForward />
    </button>
  </div>
);
