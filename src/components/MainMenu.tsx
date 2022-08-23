import { Link } from "react-router-dom";
import { Classes, Navbar, Button, NavbarGroup } from "@blueprintjs/core";

const MainMenu = (): JSX.Element => {
  return (
    <Navbar className="MainMenu">
      <NavbarGroup>
        <Link className="bp4-button bp4-minimal bp4-icon-home" to="/info">
          Candidate Info
        </Link>
        <Link className="bp4-button bp4-minimal bp4-icon-people" to="/list">
          List of Previous Candidates
        </Link>
      </NavbarGroup>
    </Navbar>
  );
};

export default MainMenu;
