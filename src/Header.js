import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="description">
      <section>
        <p className="displaytitle primary2">Little Lemon</p>
        <p className="subtitle">Chicago</p>
        <p className="leadtext">
          We are a family-owned Mediterranean restaurant, focused on traditional recipes
          served with a modern twist.
        </p>
        <Link to='./reservations'>
          <button className="actionbutton">Reserve a Table</button>
        </Link>
      </section>
      <section>
        <img className="picture" src="assets/restaurantfood.jpg" alt="Restaurant Food"
          width="350" height="350" />
      </section>
    </header>
  );
}

export default Header;
