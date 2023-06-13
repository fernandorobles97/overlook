import { bookingsData, displayCustomerBookings, displayTotalSpent }  from './domUpdates'

const getCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then((response => response.json()))
    .then((data) => { return data })
    .catch((error) => alert(error))
}

const getRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
  .then((response => response.json()))
  .then((data) => { return data })
  .catch((error) => alert(error))
}

const getBookings = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then((response => response.json()))
    .then((data) => { return data })
    .catch((error) => alert(error))
}

const postBooking = (userID, date, roomNumber) => {
fetch('http://localhost:3001/api/v1/bookings', {
  method: 'POST',
  body: JSON.stringify({userID: userID, date: date, roomNumber: roomNumber}),
  headers: {"Content-Type": "application/json"}
})
.then(response => response.json())
.then(json => {
  bookingsData.push(json.newBooking);
  displayCustomerBookings();
  displayTotalSpent();
})
.catch(error => alert(error))
}

export {
  getCustomers,
  getRooms,
  getBookings,
  postBooking
}