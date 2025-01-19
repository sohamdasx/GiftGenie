import React from "react";
import { Link } from "react-router-dom";
import house from "../assets/house.svg";

export default function Navbar() {
  return <nav className="absolute navbar right-0 navbar-expand-lg navbar-light bg-light md:scale-110 p-3 md:p-5">
    <Link to="/"><img src={house} alt="Home" /></Link>
  </nav>;
}
