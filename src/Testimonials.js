import { CustomerRatings } from "./CustomerRatings";

const Star = () => { // use HTMl code for a solid star.
  return <span className="secondary1">&#9733;</span>;
}

const Rating = (props) => {
  const stars = [];
  var num = Number.parseInt(props.rating);
  for (let i = 0; i < num; i++) {
    stars.push(<Star key={i} />);
  }
  return <p className="secondary1">Rating: {stars}</p>;
}

function Testimonials() {
  const customerRatings = CustomerRatings.map((customerRating) => {
    return (
      <div key={customerRating.id} className="grid-vertical list-item2">
        <Rating rating={customerRating.rating} />
        <div className="grid-inline">
          <img className="picture-cust" src={"assets/" + customerRating.img} alt="Customer" />
          <p className="cardtitle secondary1">{customerRating.name}</p>
        </div>
        <p className="style1 highlight1">{customerRating.feedback}</p>
      </div>
    );
  });

  return (
    <article className="grid-vertical background2">
      <section className="grid-inline">
        <p className="subtitle primary1">Testimonials!</p>
      </section>
      <section className="grid-inline list">
        {customerRatings}
      </section>
    </article>
  );
}

export default Testimonials;
