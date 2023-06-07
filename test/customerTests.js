import { expect } from 'chai';
import { findBookings } from '../src/customerUtils';

describe('findBookings', () => {
  it('should be a function', () => {
    expect(findBookings).to.be.a('function');
  })
})