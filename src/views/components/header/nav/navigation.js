import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, CrossIcon } from "src/views/components/IconsSvg";
import logo from "src/assets/images/Logo/fantom-logo-blue.svg";
const menus = [
  { name: "Home", link: "/", isActive: true },
  { name: "Transactions", link: "/" },
  { name: "Blocks", link: "/" },
  { name: "Validators", link: "/" }
];
export default () => {
  const [active, setActive] = useState(false);

  function activeHandler(val) {
    val
      ? document.body.classList.add("menu-active")
      : document.body.classList.remove("menu-active");
    setActive(val);
  }
  return (
    <>
      <button
        className="text-white d-lg-none toggle-btn"
        onClick={() => activeHandler(true)}
      >
        <MenuIcon />
      </button>
      <div className={`menus-wrapper ${active ? "active" : ""}`}>
        <div
          className="backdrop d-lg-none"
          onClick={() => activeHandler(false)}
        />

        <div className="menu-holder">
          <div className="menu-handler  d-lg-none">
            <div className="logo">
              <img src={logo} alt="Fontam" />
            </div>
            <button
              className="text-navy toggle-btn d-lg-none"
              onClick={() => activeHandler(false)}
            >
              <CrossIcon />
            </button>
          </div>
          <ul className="menus">
            {menus.map(({ name, link, isActive = false }, index) => (
              <li key={index}>
                <Link to={link} className={isActive ? "active" : ""}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
