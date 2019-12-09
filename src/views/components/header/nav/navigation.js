import React from "react";
import { Link } from "react-router-dom";
const menus = [
  { name: "Home", link: "/", isActive: true },
  { name: "Transactions", link: "/" },
  { name: "Blocks", link: "/" },
  { name: "Validators", link: "/" }
];
export default () => (
  <div>
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
);
