import React from "react";
import { Link } from "react-router-dom";
import { House } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="absolute navbar navbar-expand-lg navbar-light right-0 bg-light md:scale-110 p-3 md:p-5">
      <Link className="" to="/">
        {/* <img src={house} alt="Home" /> */}
        <House color="#ca8e83" className="md:scale-110" />
      </Link>
    </nav>
  );
}
