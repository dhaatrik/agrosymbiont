## 2024-05-18 - [ReDoS in Email Regex]
**Vulnerability:** A ReDoS (Regular Expression Denial of Service) vulnerability in `validateField` for email validation due to `/\S+@\S+\.\S+/`.
**Learning:** This regex allows malicious input with many repeating characters without `@` or `.` to cause excessive backtracking and consume excessive CPU resources.
**Prevention:** Replaced it with the HTML5 standard robust regex for email validation: `/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/`.
## 2026-03-12 - [Exposed API Key in Vite Config]
**Vulnerability:** The `vite.config.ts` file exposed `GEMINI_API_KEY` to the client-side code by defining `process.env.API_KEY` and `process.env.GEMINI_API_KEY` globally.
**Learning:** Using Vite's `define` configuration to inject environment variables containing secrets into the global scope makes them accessible to anyone inspecting the frontend bundle.
**Prevention:** Never use `define` or `import.meta.env` to expose sensitive API keys or secrets to the frontend. If a frontend needs to interact with an API requiring a secret key, that interaction should be proxied through a secure backend.
## 2024-11-20 - [Insecure File Upload UI]
**Vulnerability:** The `<input type="file">` for uploading resumes in `JobApplicationForm.tsx` lacked an `accept` attribute, which allowed users to select any file format including executables.
**Learning:** While client-side `accept` attributes are not a substitute for proper backend file type validation, omitting them provides poor UX and unnecessarily broadens the attack surface for accidental or automated uploads of insecure file types.
**Prevention:** Always restrict file input fields on the client-side to only the explicitly allowed MIME types or extensions (e.g., `accept=".pdf,.doc,.docx"`) to provide defense-in-depth UI restrictions.
