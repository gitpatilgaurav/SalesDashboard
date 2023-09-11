import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Sales",
    path: "/sales",
    icon: <FaIcons.FaMoneyBillAlt />,
    cName: "nav-text",
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: <MdIcons.MdInventory />,
    cName: "nav-text",
  },
  {
    title: "Table",
    path: "/Table",
    icon: <FaIcons.FaTable />,
    cName: "nav-text",
  },
  {
    title: "Form",
    path: "/form",
    icon: <FaIcons.FaWpforms />,
    cName: "nav-text",
  },
  {
    title: "WorldMap",
    path: "/worldmap",
    icon: <FaIcons.FaGlobe />,
    cName: "nav-text",
  },
  {
    title: "About US",
    path: "/aboutus",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
