import React from "react";
import PostAddIcon from "@material-ui/icons/PostAdd";

function Header() {
  return (
    <header>
      <h1>
        <PostAddIcon style={{ fontSize: "inherit" }} />
        Note Taker App
      </h1>
    </header>
  );
}

export default Header;
