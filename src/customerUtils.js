const findBookings = (user, bookings) => {
  let filtered = bookings.filter(booking => booking.userID === user.id);
  if (!filtered.length) {
    return 'No bookings found.';
  }
  return filtered;
};

const findTotalSpent = (user, bookings, rooms) => {
  let userBookings = findBookings(user, bookings);
  if(userBookings !== 'No bookings found.') {
    return userBookings.reduce((acc, booking) => {
     rooms.forEach(room => {
       if(booking.roomNumber === room.number) {
         acc += room.costPerNight;
       }
     });
     return acc;
   }, 0);
  }
  return 0;
};

const findAvailableRooms = (bookings, rooms, date) => {
  let unavailableRooms = bookings.reduce((roomNumbers, booking) => {
    if(booking.date === date) {
      roomNumbers.push(booking.roomNumber)
    }
    return roomNumbers;
  }, []);
  if(!unavailableRooms.length) {
    return "No Rooms Available";
  };
  return rooms.filter(room => !unavailableRooms.includes(room.number));
};

const filterByRoomType = (rooms, type) => {
  let availableRooms = rooms.filter(room => room.roomType === type);
  if(!availableRooms.length) {
    return "No Rooms Available For This Type";
  }
  return availableRooms;
};

export {
  findBookings,
  findTotalSpent,
  findAvailableRooms,
  filterByRoomType
}