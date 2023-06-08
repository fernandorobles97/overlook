const findBookings = (user, bookings) => {
  let filtered = bookings.filter(booking => booking.userID === user.id);
  if (!filtered.length) {
    return 'No bookings found.';
  }
  return filtered;
};

export {
  findBookings
}