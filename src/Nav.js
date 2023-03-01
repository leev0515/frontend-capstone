import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul className="grid-inline">
        <li><Link to="./"><img src="assets/logo.svg" alt="Little Lemon logo" /></Link></li>
        <li><Link to="./">Home</Link></li>
        <li><Link to="./about">About</Link></li>
        <li><Link to="./">Menu</Link></li>
        <li><Link to="./reservations">Reservations</Link></li>
        <li><Link to="./">Order Online</Link></li>
        <li><Link to="./">Login</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;