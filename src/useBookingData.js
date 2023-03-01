import { useState, useReducer } from "react";
import useLocalStorage from "./useLocalStorage";

export const bookingDataKey = "BookingData";
export const allBookingTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
export const notAvailTime = ["Not Available"];
export const initialBookingDetails = { name: "", email: "", date: "", time: "", numGuests: 1, occasion: "" };
export const currentDate = () => {
    const dateValue = (new Date()).toISOString().split('T')[0];
    return dateValue;
};

const getAvailableTimes = (bookingData, date) => {
    let availTimes = [];

    //console.log("getAvailableTimes() date = " + date);
    //console.log("getAvailableTimes() bookingData = " + bookingData);

    if (date.length > 0) {
        let bookedTimes = [];
        if (bookingData != null) {
            bookingData.forEach((bookingItem) => {
                if (bookingItem.date === date) {
                    bookedTimes.push(bookingItem.time);
                }
            });
        }
        //console.log("getAvailableTimes() bookedTimes = " + bookedTimes);
        availTimes = bookedTimes.length > 0 ?
            allBookingTimes.filter((time) => (bookedTimes.indexOf(time) < 0)) : allBookingTimes;
    }

    if (availTimes.length < 1)
        availTimes = notAvailTime;

    //console.log("getAvailableTimes() availTimes = " + availTimes);

    return availTimes;
}

// Custom hook to handle booking data and booking details.
function useBookingData() {
    const [bookingData, setBookingData] = useLocalStorage(bookingDataKey);
    const [bookingDetails, setBookingDetails] = useState(initialBookingDetails);

    const saveBookingDetails = (bookingDetails) => {
        setBookingDetails({ ...bookingDetails });
        //console.log("saveBookingDetails() bookingDetails = " + JSON.stringify(bookingDetails));
        const newBookingData = bookingData != null ? [...bookingData] : [];
        newBookingData.push(bookingDetails);
        setBookingData(newBookingData);
        return (newBookingData.length > 0);
    }

    const initializeTimes = (initVal) => {
        const dateValue = currentDate();
        var initialState = getAvailableTimes(bookingData, dateValue);
        return initialState;
    }

    const updateTimes = (state, action) => {
        if (action.type === 'date') {
            //console.log("updateTimes() action.date = " + action.date);
            var newState = getAvailableTimes(bookingData, action.date);
            //console.log("updateTimes() newState = " + newState);
            return newState;
        }
        return state;
    }
    const [availableTimes, dispatch] = useReducer(updateTimes, null, initializeTimes);

    return [bookingDetails, saveBookingDetails, availableTimes, dispatch];
}

export default useBookingData;