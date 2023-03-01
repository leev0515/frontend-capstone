import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import BookingForm from "./BookingForm";
import ConfirmedBooking from "./ConfirmedBooking";
import useBookingData, { currentDate } from "./useBookingData";

function Main() {
  const [bookingDetails, saveBookingDetails, availableTimes, dispatch] = useBookingData();
  const navigate = useNavigate();

  const submitForm = (formData) => {
    let result = saveBookingDetails(formData);
    //console.log("submitForm() result = " + result);
    if (result) {
      dispatch({ type: 'date', date: currentDate() });
      navigate("/confirmedbooking");
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/reservations" element={<BookingForm availableTimes={availableTimes} updateState={dispatch} makeReservation={submitForm} />}></Route>
      <Route path="/confirmedbooking" element={<ConfirmedBooking bookingDetails={bookingDetails} />}></Route>
    </Routes>
  );
}

export default Main;