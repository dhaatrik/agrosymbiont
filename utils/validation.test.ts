import { describe, it, expect } from 'vitest';
import { isValidEmail } from './validation';

describe('isValidEmail', () => {
  it('should return true for valid email addresses', () => {
    const validEmails = [
      'test@example.com',
      'user.name@domain.co.uk',
      'user+plus@sub.domain.com',
      '1234567890@example.com',
      'email@domain-one.com',
      '_______@example.com',
      'email@example.name',
      'email@example.museum',
      'email@example.co.jp',
      'firstname.lastname@example.com',
    ];
    validEmails.forEach(email => {
      expect(isValidEmail(email)).toBe(true);
    });
  });

  it('should return false for invalid email addresses', () => {
    const invalidEmails = [
      'plainaddress',
      '#@%^%#$@#$@#.com',
      '@example.com',
      'Joe Smith <email@example.com>',
      'email.example.com',
      'email@example@example.com',
      'あいうえお@example.com',
      'email@example.com (Joe Smith)',
      'email@-example.com',
      'email@example..com',
    ];
    invalidEmails.forEach(email => {
      expect(isValidEmail(email)).toBe(false);
    });
  });

  it('should return false for an empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });

  it('should return false for strings without @', () => {
    expect(isValidEmail('noatstring.com')).toBe(false);
  });

  it('should return false for strings with only @', () => {
    expect(isValidEmail('@')).toBe(false);
  });
});
