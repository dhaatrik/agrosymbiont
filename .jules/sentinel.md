## 2024-05-18 - [ReDoS in Email Regex]
**Vulnerability:** A ReDoS (Regular Expression Denial of Service) vulnerability in `validateField` for email validation due to `/\S+@\S+\.\S+/`.
**Learning:** This regex allows malicious input with many repeating characters without `@` or `.` to cause excessive backtracking and consume excessive CPU resources.
**Prevention:** Replaced it with the HTML5 standard robust regex for email validation: `/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/`.