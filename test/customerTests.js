import { expect } from 'chai';
import { findBookings } from '../src/customerUtils';
import { bookings1 } from '../test/sampleData.js';

describe('findBookings', () => {
  it('should be a function', () => {
    expect(findBookings).to.be.a('function');
  });

  it('should find bookings based on a users ID', () => {
    const currentUser = {"id": 1, "name": "Leatha Ullrich"};
    const bookingsForCurrentUser = findBookings(currentUser, bookings1);

    expect(bookingsForCurrentUser.length).to.equal(2);
    expect(bookingsForCurrentUser[0].userID).to.equal(1)
  });

  it('should return "No bookings found." if there are no bookings for user', () => {
    const currentUser1 = {"id": 10101, "name": "Lars Ulrich"};
    const bookingsForCurrentUser1 = findBookings(currentUser1, bookings1);

    expect(bookingsForCurrentUser1).to.equal('No bookings found.')
  });
});