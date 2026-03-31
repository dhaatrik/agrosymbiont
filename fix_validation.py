import os

# Fix validation.ts
with open('utils/validation.ts', 'r') as f:
    content = f.read()

search = r"""export const isValidEmail"""
replace = r"""export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const isValidEmail"""

if "export const EMAIL_REGEX" not in content:
    content = content.replace(search, replace)
    with open('utils/validation.ts', 'w') as f:
        f.write(content)
