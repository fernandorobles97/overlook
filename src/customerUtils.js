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

export {
  findBookings,
  findTotalSpent
}