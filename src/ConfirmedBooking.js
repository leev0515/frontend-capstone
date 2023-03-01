function ConfirmedBooking(props) {
  return (
    <section>
      <p className="subtitle primary1">Reservation Confirmed!</p>
      <div className="grid-inline list booking leadtext">
        <label>Name: </label>
        <label className="secondary1">{props.bookingDetails.name}</label>
        <label>Email: </label>
        <label className="secondary1">{props.bookingDetails.email}</label>
        <label>Date: </label>
        <label className="secondary1">{props.bookingDetails.date}</label>
        <label>Time: </label>
        <label className="secondary1">{props.bookingDetails.time}</label>
        <label>Number of guests: </label>
        <label className="secondary1">{props.bookingDetails.numGuests}</label>
        <label>Occasion: </label>
        <label className="secondary1">{props.bookingDetails.occasion}</label>
      </div>
    </section>
  );
}

export default ConfirmedBooking;
