import { useState, useEffect } from "react";
import { currentDate } from './useBookingData';

export const titleText = "Reserve a Table";

export const nameText = "Name";
export const nameId = "nameId";

export const emailText = "Email";
export const emailId = "emailId";

export const dateText = "Choose date";
export const dateId = "dateId";

export const timeText = "Choose time";
export const timeId = "timeId";

export const guestsText = "Number of guests";
export const guestsId = "guestsId";

export const occasionText = "Select Occasion";
export const occasionId = "occasionId";

export const submitText = "Make Your Reservation";

function BookingForm(props) {
  const today = currentDate();

  const noAvailableTimes = (props.availableTimes[0] === "Not Available");
  const timeValue = noAvailableTimes ? "" : props.availableTimes[0];
  const availableTimes = props.availableTimes.map((timeSlot) => (<option key={timeSlot} value={noAvailableTimes ? "" : timeSlot}>{timeSlot}</option>));

  const occasions = ["Birthday", "Engagement", "Anniversary"];
  const availableOccasions = occasions.map((occasion) => (<option key={occasion}>{occasion}</option>));


  const [data, setData] = useState({
    name: "",
    email: "",
    date: today,
    time: timeValue,
    numGuests: 1,
    occasion: occasions[0]
  });

  useEffect(() => { // prevents using unavailable times between date changes.
    if (timeValue !== data.time) {
      if (props.availableTimes.indexOf(data.time) === -1)
        setData({ ...data, time: timeValue });
    }
  }, [props.availableTimes, timeValue, data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("handleSubmit() data = " + JSON.stringify(data));
    props.makeReservation(data);
  }
  const handleInvalidTime = (e) => {
    const validityText = noAvailableTimes ? "Choose a different date." : "";
    e.target.setCustomValidity(validityText);
  }

  const updateName = (e) => setData({ ...data, name: e.target.value });

  const updateEmail = (e) => setData({ ...data, email: e.target.value });

  const updateDate = (e) => {
    const newDate = e.target.value;
    //console.log("updateDate() newDate = " + newDate);
    //console.log("updateDate() date (before setDate) = " + data.date);
    setData({ ...data, date: newDate });
    //console.log("updateDate() date (after setDate) = " + data.date);
    props.updateState({ type: 'date', date: newDate });

    const timeElem = document.getElementById(timeId);
    if (timeElem) {
      timeElem.setCustomValidity("");
    }
  }
  const updateTime = (e) => {
    //console.log("updateTime() data = " + JSON.stringify(data));
    setData({ ...data, time: e.target.value });
  }
  const updateNumGuests = (e) => setData({ ...data, numGuests: e.target.value });
  const updateOccasion = (e) => setData({ ...data, occasion: e.target.value });

  //console.log("BookingForm data = " + JSON.stringify(data));

  return (
    <section>
      <p className="subtitle primary1">{titleText}</p>
      <form className="grid-inline list booking leadtext" onSubmit={handleSubmit}>

        <label htmlFor={nameId}>{nameText}</label>
        <input className="input" type="text" placeholder="Full Name" id={nameId} minLength="3" value={data.name} onChange={updateName} autoFocus required />

        <label htmlFor={emailId}>{emailText}</label>
        <input className="input" type="email" placeholder="email address" id={emailId} minLength="3" value={data.email} onChange={updateEmail} required />

        <label htmlFor={dateId}>{dateText}</label>
        <input className="input" type="date" id={dateId} min={today} value={data.date} onChange={updateDate} />

        <label htmlFor={timeId}>{timeText}</label>
        <select className="input" id={timeId} value={data.time} onChange={updateTime} onInvalid={handleInvalidTime} required>
          {availableTimes}
        </select>

        <label htmlFor={guestsId}>{guestsText}</label>
        <input className="input" type="number" placeholder="1" min="1" max="10" id={guestsId}
          value={data.numGuests} onChange={updateNumGuests} />

        <label htmlFor={occasionId}>{occasionText}</label>
        <select className="input" id={occasionId} value={data.occasion} onChange={updateOccasion} required>
          {availableOccasions}
        </select>

        <input aria-label="On Click" className="actionbutton" type="submit" value={submitText} />
      </form>
    </section >
  );
}

export default BookingForm;
