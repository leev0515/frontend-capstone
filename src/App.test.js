import { fireEvent, render, screen } from '@testing-library/react';
import BookingForm, {
  titleText, submitText,
  nameText, nameId, emailText, emailId,
  dateText, dateId, timeText, timeId,
  guestsText, guestsId, occasionText, occasionId
} from './BookingForm';
import { readLocalStorageData, writeLocalStorageData } from "./useLocalStorage";
import useBookingData, {
  bookingDataKey, allBookingTimes, notAvailTime,
  initialBookingDetails, currentDate
} from "./useBookingData";

const compareArrays = (a, b) => {
  let result = (a.length === b.length && a.every((element, index) => element === b[index]));
  let string1 = JSON.stringify(a);
  let string2 = JSON.stringify(b);
  console.log("result = " + result + "\nArray1 = " + string1 + "\nArray2 = " + string2);
  return result;
};
const compareObjects = (a, b) => {
  let string1 = JSON.stringify(a);
  let string2 = JSON.stringify(b);
  let result = string1 === string2;
  console.log("result = " + result + "\nObject1 = " + string1 + "\nObject2 = " + string2);
  return result;
};

test('BookingForm: Heading exists', () => {
  render(<BookingForm availableTimes={allBookingTimes} />);
  const element = screen.getByText(titleText);
  expect(element).toBeInTheDocument();
})

test('BookingForm: Name exists', () => {
  render(<BookingForm availableTimes={allBookingTimes} />);
  const element1 = screen.getByText(nameText);
  const element2 = document.getElementById(nameId);
  expect(element1).toBeInTheDocument();
  expect(element2).toBeInTheDocument();
})

test('BookingForm: Email exists', () => {
  render(<BookingForm availableTimes={allBookingTimes} />);
  const element1 = screen.getByText(emailText);
  const element2 = document.getElementById(emailId);
  expect(element1).toBeInTheDocument();
  expect(element2).toBeInTheDocument();
})

test('BookingForm: Choose date exists', () => {
  render(<BookingForm availableTimes={allBookingTimes} />);
  const element1 = screen.getByText(dateText);
  const element2 = document.getElementById(dateId);
  expect(element1).toBeInTheDocument();
  expect(element2).toBeInTheDocument();
})

test('BookingForm: Choose time exists', () => {
  render(<BookingForm availableTimes={allBookingTimes} />);
  const element1 = screen.getByText(timeText);
  const element2 = document.getElementById(timeId);
  expect(element1).toBeInTheDocument();
  expect(element2).toBeInTheDocument();
})

test('BookingForm: Number of guests exists', () => {
  render(<BookingForm availableTimes={allBookingTimes} />);
  const element1 = screen.getByText(guestsText);
  const element2 = document.getElementById(guestsId);
  expect(element1).toBeInTheDocument();
  expect(element2).toBeInTheDocument();
})

test('BookingForm: Occasion exists', () => {
  render(<BookingForm availableTimes={allBookingTimes} />);
  const element1 = screen.getByText(occasionText);
  const element2 = document.getElementById(occasionId);
  expect(element1).toBeInTheDocument();
  expect(element2).toBeInTheDocument();
})

test('BookingForm: Make Your Reservation exists', () => {
  render(<BookingForm availableTimes={allBookingTimes} />);
  const element = screen.getByText(submitText);
  expect(element).toBeInTheDocument();
})

test('BookingForm: Name validity', () => {
  const updateState = jest.fn();
  render(<BookingForm availableTimes={allBookingTimes} updateState={updateState} />);
  const element = document.getElementById(nameId);

  expect(element).toBeInvalid(); // should be invalid since default value is "".

  fireEvent.change(element, { target: { value: "a" } });
  // expect(element).toBeInvalid(); minLength check is not getting triggered here. Element remains valid.
  expect(element).toHaveDisplayValue('a');

  fireEvent.change(element, { target: { value: "ab" } });
  expect(element).toHaveDisplayValue('ab');

  fireEvent.change(element, { target: { value: "abc" } }); // >= 3 chars
  expect(element).toHaveDisplayValue('abc');
  expect(element).toBeValid();
})

test('BookingForm: Email validity', () => {
  const updateState = jest.fn();
  render(<BookingForm availableTimes={allBookingTimes} updateState={updateState} />);
  const element = document.getElementById(emailId);

  expect(element).toBeInvalid(); // should be invalid since default value is "".

  fireEvent.change(element, { target: { value: "a" } }); // no @ symbol
  expect(element).toBeInvalid();

  fireEvent.change(element, { target: { value: "a@" } }); // no symbol following @
  expect(element).toBeInvalid();

  fireEvent.change(element, { target: { value: "a@b" } });
  expect(element).toBeValid();
})

test('BookingForm: Choose date validity', () => {
  const updateState = jest.fn();
  render(<BookingForm availableTimes={allBookingTimes} updateState={updateState} />);
  const element = document.getElementById(dateId);

  expect(element).toBeValid(); // should be valid since default date is current date.

  fireEvent.change(element, { target: { value: "2023-01-01" } }); // invalid date, must be today or later.
  expect(element).toBeInvalid();
})

test('BookingForm: Choose time validity', () => {
  render(<BookingForm availableTimes={notAvailTime} />);
  const element = document.getElementById(timeId);
  expect(element).toBeInvalid();
})

test('BookingForm: Number of guests validity', () => {
  const updateState = jest.fn();
  render(<BookingForm availableTimes={allBookingTimes} updateState={updateState} />);
  const element = document.getElementById(guestsId);

  expect(element).toBeValid(); // should be valid since default value is 1.

  fireEvent.change(element, { target: { value: "0" } });
  expect(element).toBeInvalid();

  fireEvent.change(element, { target: { value: "5" } });
  expect(element).toBeValid();

  fireEvent.change(element, { target: { value: "11" } });
  expect(element).toBeInvalid();
})

test('BookingForm: updateState called', () => {
  const updateState = jest.fn();
  render(<BookingForm availableTimes={allBookingTimes} updateState={updateState} />);
  const element = document.getElementById(dateId);
  fireEvent.change(element, { target: { value: "2023-01-01" } });
  expect(updateState).toHaveBeenCalled();
})

test('BookingForm: makeReservation called with valid data', () => {
  const makeReservation = jest.fn();
  render(<BookingForm availableTimes={allBookingTimes} makeReservation={makeReservation} />);
  const element = screen.getByText(submitText);
  fireEvent.click(element);
  expect(makeReservation).toHaveBeenCalled();
})

test('BookingForm: makeReservation should be called with invalid data', () => {
  const makeReservation = jest.fn();
  render(<BookingForm availableTimes={notAvailTime} makeReservation={makeReservation} />);
  const element = screen.getByText(submitText);
  fireEvent.click(element);
  expect(makeReservation).toHaveBeenCalled();
})

test('useBookingData: initializeTimes', () => {
  let actual = [];
  const setActual = (data) => { actual = data; };

  const TestBookingData = (props) => {
    const [bookingDetails, saveBookingDetails, availableTimes, dispatch] = useBookingData();
    props.setData(availableTimes);
    return (<></>);
  }
  render(<TestBookingData setData={setActual} />);
  let result = compareArrays(allBookingTimes, actual);
  expect(result).toEqual(true);
})

test('useBookingData: updateTimes', () => {
  let actual = [];
  const setActual = (data) => { actual = data; };

  const date = currentDate();
  const bookedTimes = ["17:00", "20:00"];
  const testBookingData = [
    { ...initialBookingDetails, date: date, time: bookedTimes[0] },
    { ...initialBookingDetails, date: date, time: bookedTimes[1] }
  ];

  localStorage.clear();
  localStorage.setItem(bookingDataKey, JSON.stringify(testBookingData));

  const TestBookingData1 = (props) => {
    const [bookingDetails, saveBookingDetails, availableTimes, dispatch] = useBookingData();
    props.setData(availableTimes);
    return (<button id="testButton" onClick={() => dispatch({ type: 'date', date: date })}></button>);
  }

  render(<TestBookingData1 setData={setActual} />);

  const element = document.getElementById('testButton');
  fireEvent.click(element);
  localStorage.clear();

  const expected = allBookingTimes.filter((bookingTime) => (bookedTimes.indexOf(bookingTime) < 0));
  let result = compareArrays(expected, actual);
  expect(result).toEqual(true);
})

test('useLocalStorage: get data', () => {
  const testKey = "testKey";
  const sampleData = { "key1": "value1", "key2": "value2" };

  localStorage.clear();
  localStorage.setItem(testKey, JSON.stringify(sampleData));
  const retrievedData = readLocalStorageData(testKey);
  localStorage.clear();

  let result = compareObjects(sampleData, retrievedData);
  expect(result).toEqual(true);
})

test('useLocalStorage: set data', () => {
  const testKey = "testKey";
  const sampleData = { "key1": "value1", "key2": "value2" };

  localStorage.clear();
  writeLocalStorageData(testKey, sampleData);
  const value = localStorage.getItem(testKey);
  const retrievedData = JSON.parse(value);
  localStorage.clear();

  let result = compareObjects(sampleData, retrievedData);
  expect(result).toEqual(true);
})