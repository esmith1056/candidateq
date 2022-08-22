import { Link } from "react-router-dom";

const MainMenu = (): JSX.Element => {
  return (
    <menu className="MainMenu">
      <li>
        <Link to="/info">Candidate Info</Link>
      </li>
      <li>
        <Link to="/list">List of Previous Candidates</Link>
      </li>
    </menu>
  );
};

export default MainMenu;
