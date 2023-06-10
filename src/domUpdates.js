//NOTE: Your DOM manipulation will occur in this file
import { getBookings, getCustomers, getRooms } from './apiCalls';
import { filterByRoomType, findAvailableRooms, findBookings, findTotalSpent } from './customerUtils';
import flatpickr from 'flatpickr';
flatpickr(".date-input-box", {});

var currentCustomer;
let customersData;
let roomsData;
let bookingsData;



// Query Selectors
const totalSpent = document.querySelector('.total-spent');
const userGreeting = document.querySelector('.user-greeting');
const allBookings = document.querySelector('.all-bookings');
const dateInput = document.querySelector(".date-input-box");
const bookHereForm = document.querySelector('.book-here-form');
const selectRoomInput = document.querySelector('.select-room')
const noDateSelected = document.querySelector(".no-date-selected")
const availableRoomsSection = document.querySelector('.available-rooms')

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

bookHereForm.addEventListener('submit', event => {
  event.preventDefault()
  // console.log(dateInput.value)
  console.log(selectRoomInput.value)
  if(!dateInput.value) {
    console.log('no')
   removeHiddenClass([noDateSelected])
   return;
  }
  renderAvailableRooms();
})

const renderAvailableRooms = () => {
  let newDate = dateInput.value.replaceAll('-', '/');
  // console.log(newDate)
  removeHiddenClass([availableRoomsSection]);
  availableRoomsSection.innerHTML = '';
  let availableRooms = findAvailableRooms(bookingsData,roomsData, newDate);
  // console.log(availableRooms)
  if(selectRoomInput.value === 'All Rooms') {
    availableRooms.forEach(room => {
      availableRoomsSection.innerHTML += `
      <div class="booking-item">
        <div class="new-booking-item">
          <p>Booking Date: ${newDate}</p> 
          <p>Room Type: ${room.roomType}</p>
          <button class="book-button">Book now!</button>
        </div>
      </div>`
    })
  } else {
    let filteredAvailableRooms = filterByRoomType(availableRooms, selectRoomInput.value);
    filteredAvailableRooms.forEach(room => {
      availableRoomsSection.innerHTML += `
      <div class="booking-item">
        <div class="new-booking-item">
          <p>Booking Date: ${newDate}</p> 
          <p>Room Type: ${room.roomType}</p>
          <button class="book-button">Book now!</button>
        </div>
      </div>`
    })
  }
};

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
          <div class="booking-item">
            <p>Booking Date: ${booking.date}</p> 
            <p>Room Type: ${findRoomType(booking.roomNumber)}</p>
          </div>
        </div>`
  })
}

function removeHiddenClass(elements) {
  return elements.forEach(element => element.classList.remove('hidden'));
};

function addHiddenClass(elements) {
  return elements.forEach(element => element.classList.add('hidden'));
};