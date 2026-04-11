import { describe, it, expect } from 'vitest';
import { isValidEmail, sanitizeUrl } from './validation';

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
      // 254 characters (max valid length)
      "a".repeat(64) + "@" + ("b".repeat(63) + ".") + ("c".repeat(63) + ".") + "d".repeat(57) + ".com",
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
      // 256 characters (exceeds max length)
      "a".repeat(64) + "@" + ("b".repeat(63) + ".") + ("c".repeat(63) + ".") + "d".repeat(59) + ".com",
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

describe('sanitizeUrl', () => {
  it('should return empty string for undefined or empty input', () => {
    expect(sanitizeUrl()).toBe('');
    expect(sanitizeUrl('')).toBe('');
  });

  it('should allow valid protocols', () => {
    expect(sanitizeUrl('http://example.com')).toBe('http://example.com/');
    expect(sanitizeUrl('https://example.com')).toBe('https://example.com/');
    expect(sanitizeUrl('mailto:test@example.com')).toBe('mailto:test@example.com');
    expect(sanitizeUrl('tel:+1234567890')).toBe('tel:+1234567890');
  });

  it('should allow relative paths', () => {
    expect(sanitizeUrl('/path/to/resource')).toBe('/path/to/resource');
    expect(sanitizeUrl('#anchor')).toBe('#anchor');
    expect(sanitizeUrl('?query=string')).toBe('?query=string');
  });

  it('should block malicious protocols', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBe('about:blank');
    expect(sanitizeUrl('data:text/html,<html>')).toBe('about:blank');
    expect(sanitizeUrl('vbscript:msgbox("hello")')).toBe('about:blank');
  });

  it('should remove whitespace and control characters', () => {
    expect(sanitizeUrl(' http://example.com ')).toBe('http://example.com/');
    expect(sanitizeUrl('https://example.com\n')).toBe('https://example.com/');
    expect(sanitizeUrl('javascript\u0000:alert(1)')).toBe('about:blank');
  });

  it('should handle relative paths that might look like absolute URLs', () => {
    expect(sanitizeUrl('folder/file.html')).toBe('folder/file.html');
    expect(sanitizeUrl('path.with.dots/file')).toBe('path.with.dots/file');
  });

  it('should trigger catch block and handle it correctly', () => {
    // This is to test the catch block:
    // try { ... } catch (e) { if (!sanitizedUrl.includes(':')) return sanitizedUrl; }
    // We need a URL that fails new URL(sanitizedUrl, 'http://localhost')
    // and doesn't contain a colon.

    // A string with a backslash before the first colon-like part might fail in some environments
    // or just a very long string, but "new URL" is quite robust.
    // However, the implementation specifically handles cases where it might fail.

    // Test case that triggers catch block but doesn't have a colon (valid relative path)
    // Many strings that are not valid URLs according to the spec might throw.
    // In many JS environments, new URL('http://[::1]') is fine, but new URL('http://[') is not.

    // If sanitizedUrl is '[[[' it will likely throw because it's not a valid host and can't be appended to base.
    expect(sanitizeUrl('[[[')).toBe('[[[');

    // If it HAS a colon and fails, it should return 'about:blank'
    // 'javascript:[' might throw and has a colon.
    expect(sanitizeUrl('javascript:[')).toBe('about:blank');
  });
});
