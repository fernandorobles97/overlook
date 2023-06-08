//NOTE: Your DOM manipulation will occur in this file
import { getBookings, getCustomers, getRooms } from './apiCalls';
let currentCustomer;
let customersData;
let roomsData;
let bookingsData;

// Query Selectors

//Event Listeners
window.addEventListener('load', () => {
  Promise.all([getBookings(), getCustomers(), getRooms()]).then((data) => {
    customersData = data[1].customers
    roomsData = data[2].rooms
    bookingsData = data[0].bookings
    setCurrentCustomer()
})
});

//Event Handlers/Functions
const setCurrentCustomer = () => {
  return currentCustomer = customersData[Math.floor(Math.random()*customersData.length)];
};