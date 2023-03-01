function About() {
  return (
    <article className="description">
      <section>
        <p className="subtitle primary2">About Little Lemon</p>
        <p>Based in Chicago, Illinois, Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. </p>
        <p>The chefs draw inspiration from Italian, Greek, and Turkish culture and have a menu of 12–15 items that they rotate seasonally.</p>
        <p>The restaurant has a rustic and relaxed atmosphere with moderate prices, making it a popular place for a meal any time of the day.</p>
        <p>Little Lemon is owned by two Italian brothers, Mario and Adrian, who moved to the United States to pursue their shared dream of owning a restaurant. To craft the menu, Mario relies on family recipes and his experience as a chef in Italy.</p>
      </section>
      <section >
        <img className="picture" src="assets\Mario_Adrian_a.jpg" alt="Restaurant Chefs" width="500" />
        <img className="picture" src="assets\restaurant.jpg" alt="Restaurant" width="500" />
      </section>
    </article>
  );
}

export default About;
