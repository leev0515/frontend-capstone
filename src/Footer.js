function Footer() {
  return (
    <footer className="grid-inline">
      <img src="assets/logo2.png" alt="Little Lemon logo-2" height="100" />
      <ul>
        <li><h5>Site Map</h5></li>
        <li><a href="./">Home</a></li>
        <li><a href="./about">About</a></li>
        <li><a href="./">Menu</a></li>
        <li><a href="./reservations">Reservations</a></li>
        <li><a href="./">Order Online</a></li>
        <li><a href="./">Login</a></li>
      </ul>
      <ul>
        <li><h5>Contact</h5></li>
        <li><img src="assets/home.svg" width="18" alt="Address" /> 123 Main St. Chicago</li>
        {/* Use HTML symbols for phone and envelope. */}
        <li>&#9990; 1234567890</li>
        <li>&#9993; little@lemon.com</li>
      </ul>
      <ul>
        <li><h5>Social Media</h5></li>
        <li><a href="./facebook">Facebook</a></li>
        <li><a href="./twitter">Twitter</a></li>
        <li><a href="./instagram">Instagram</a></li>
      </ul>
    </footer>
  );
}

export default Footer;
