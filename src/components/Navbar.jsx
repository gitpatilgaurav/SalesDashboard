import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "../App.css";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  function showSidebar() {
    setSidebar(!sidebar);
  }

  return (
    <div>
      <div className="navbar">
        <div className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar} />
        </div>
        <h3>IKEA Sales</h3>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <div className="menu-bars">
              <AiIcons.AiOutlineClose />
            </div>
          </li>

          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <NavLink to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
