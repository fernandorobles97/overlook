import { expect } from 'chai';
import { findBookings, findTotalSpent } from '../src/customerUtils';
import { bookings1, rooms1 } from '../test/sampleData.js';

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

describe('findTotalSpent', () => {
  it('should be a function', () => {
    expect(findTotalSpent).to.be.a('function');
  });

  it('should find the total that the user spent on rooms', () => {
    const currentUser = {"id": 1, "name": "Leatha Ullrich"};
    const totalSpent = findTotalSpent(currentUser, bookings1, rooms1);

    expect(totalSpent).to.equal(466.65);
  });

  it('should return 0 if user has no bookings', () => {
    const currentUser1 = {"id": 10101, "name": "Lars Ulrich"};
    const newTotalSpent = findTotalSpent(currentUser1, bookings1, rooms1);
    
    expect(newTotalSpent).to.equal(0);
  });
});