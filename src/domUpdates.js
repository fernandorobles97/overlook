//NOTE: Your DOM manipulation will occur in this file
import { getBookings, getCustomers, getRooms } from './apiCalls';
import { findBookings, findTotalSpent } from './customerUtils';
import flatpickr from 'flatpickr';
flatpickr(".input-date-box", {});

var currentCustomer;
let customersData;
let roomsData;
let bookingsData;



// Query Selectors
const totalSpent = document.querySelector('.total-spent');
const userGreeting = document.querySelector('.user-greeting');
const allBookings = document.querySelector('.all-reservations');
const dateInput = document.querySelector(".input-date-box")

//Event Listeners
window.addEventListener('load', () => {
  Promise.all([getBookings(), getCustomers(), getRooms()]).then((data) => {
    customersData = data[1].customers;
    roomsData = data[2].rooms;
    bookingsData = data[0].bookings;
    setCurrentCustomer();
    displayTotalSpent();
    displayCustomerName();
    displayCustomerBookings();
  });
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

const findRoomType = (roomNumber) => {
  let foundRoom = roomsData.find(room => {
    if(room.number === roomNumber) {
      return room;
    }
  })
  return foundRoom.roomType.split(' ').map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ');
}

const displayCustomerBookings = () => {
  let filteredBookings = findBookings(currentCustomer, bookingsData);
  allBookings.innerHTML = '';
  filteredBookings.forEach(booking => {
    allBookings.innerHTML += `
    <div class="reservation-wrapper">
          <div class="booking-info">
            <p>Booking Date: ${booking.date}</p> 
            <p>Room Type: ${findRoomType(booking.roomNumber)}</p>
          </div>
        </div>`
  })
}

// customer should input a date AND select a room type
  // date input should be only numbers and in correct format "yyyy/mm/dd"
  // room type should have drop down