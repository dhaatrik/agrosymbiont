## 2024-05-18 - [ReDoS in Email Regex]
**Vulnerability:** A ReDoS (Regular Expression Denial of Service) vulnerability in `validateField` for email validation due to `/\S+@\S+\.\S+/`.
**Learning:** This regex allows malicious input with many repeating characters without `@` or `.` to cause excessive backtracking and consume excessive CPU resources.
**Prevention:** Replaced it with the HTML5 standard robust regex for email validation: `/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/`.
## 2026-03-12 - [Exposed API Key in Vite Config]
**Vulnerability:** The `vite.config.ts` file exposed `GEMINI_API_KEY` to the client-side code by defining `process.env.API_KEY` and `process.env.GEMINI_API_KEY` globally.
**Learning:** Using Vite's `define` configuration to inject environment variables containing secrets into the global scope makes them accessible to anyone inspecting the frontend bundle.
**Prevention:** Never use `define` or `import.meta.env` to expose sensitive API keys or secrets to the frontend. If a frontend needs to interact with an API requiring a secret key, that interaction should be proxied through a secure backend.
