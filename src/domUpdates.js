//NOTE: Your DOM manipulation will occur in this file
import { getBookings, getCustomers, getRooms, postBooking } from './apiCalls';
import { filterByRoomType, findAvailableRooms, findBookings, findTotalSpent } from './customerUtils';
import flatpickr from 'flatpickr';
flatpickr(".date-input-box", {dateFormat: 'Y/m/d'});

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

availableRoomsSection.addEventListener('click', (event) => {
  if (event.target.classList.contains('book-button')) {
    postBooking(currentCustomer.id, dateInput.value, Number(event.target.id))
  };
});

bookHereForm.addEventListener('submit', event => {
  event.preventDefault()
  if(!dateInput.value) {
   removeHiddenClass([noDateSelected])
   return;
  }
  renderAvailableRooms();
});

const renderAvailableRooms = () => {
  removeHiddenClass([availableRoomsSection]);
  availableRoomsSection.innerHTML = '';
  let availableRooms = findAvailableRooms(bookingsData,roomsData, dateInput.value);
  if(selectRoomInput.value === 'All Rooms') {
    availableRooms.forEach(room => {
      availableRoomsSection.innerHTML += `
      <div class="available-booking-item">
        <div class="new-booking-item">
          <p>Booking Date: ${dateInput.value}</p> 
          <p>Room Type: ${room.roomType}</p>
          <p>Room Number: ${room.number}</p>
          <button class="book-button" id="${room.number}">Book now!</button>
        </div>
      </div>`
    })
  } else {
    let filteredAvailableRooms = filterByRoomType(availableRooms, selectRoomInput.value);
    filteredAvailableRooms.forEach(room => {
      availableRoomsSection.innerHTML += `
      <div class="available-booking-item">
        <div class="new-booking-item">
          <p>Booking Date: ${dateInput.value}</p> 
          <p>Room Type: ${room.roomType}</p>
          <p>Room Number: ${room.number}</p>
          <button class="book-button" id="${room.number}">Book now!</button>
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

export {
  bookingsData,
  displayCustomerBookings
}