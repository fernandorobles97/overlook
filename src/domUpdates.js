//NOTE: Your DOM manipulation will occur in this file
import { getBookings, getCustomers, getRooms } from './apiCalls';
import { findTotalSpent } from './customerUtils';
var currentCustomer;
let customersData;
let roomsData;
let bookingsData;

// Query Selectors
const totalSpent = document.querySelector('.total-spent');
const userGreeting = document.querySelector('.user-greeting');

//Event Listeners
window.addEventListener('load', () => {
  Promise.all([getBookings(), getCustomers(), getRooms()]).then((data) => {
    customersData = data[1].customers;
    roomsData = data[2].rooms;
    bookingsData = data[0].bookings;
    setCurrentCustomer();
    displayTotalSpent();
    displayCustomerName();
})
});

//Event Handlers/Functions
const setCurrentCustomer = () => {
  return currentCustomer = customersData[Math.floor(Math.random()*customersData.length)];
};

const displayTotalSpent = () => {
  let total = findTotalSpent(currentCustomer, bookingsData, roomsData);
  totalSpent.innerHTML = `Total Spent: $${total.toFixed(2)}`;
};

const displayCustomerName = () => {
  userGreeting.innerHTML = `Welcome, ${currentCustomer.name}`;
};