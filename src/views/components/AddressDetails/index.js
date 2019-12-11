import React from "react";
import qrInon from "src/assets/images/icons/qr.svg";
export default () => (
  <div className="addressDetails mb-4 mb-lg-5">
    <div className="address d-flex">
      <h2 className="title text-grey mb-0">Address</h2>
      <div className="addressHashWrapper">
        <p className="addressHash text-navy mb-0">
          0x490b16d0d98d5a43300fd1ca916741a2557dfc4b
        </p>
      </div>
      <div className="hashBtnWrapper">
        <button>
          <i className="far fa-copy" />
        </button>
        <button>
          <img src={qrInon} alt="QR" />
        </button>
      </div>
    </div>
  </div>
);
