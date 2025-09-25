# Form Validation

## Difficulty: Medium

## Description

Build a comprehensive user registration form with real-time validation, error handling, and user feedback. The form should handle multiple input types and provide immediate validation feedback.

## Form Fields

### Full Name

- **Type**: Text input
- **Required**: Yes
- **Validation**: Minimum 2 characters
- **Error**: "Full name must be at least 2 characters long"

### Email

- **Type**: Email input
- **Required**: Yes
- **Validation**: Valid email format
- **Error**: "Please enter a valid email address"

### Password

- **Type**: Password input
- **Required**: Yes
- **Validation**: Minimum 8 characters, must contain uppercase, lowercase, and number
- **Error**: "Password must be at least 8 characters long and contain uppercase, lowercase, and number"
- **Feature**: Password strength indicator (Weak/Fair/Good/Strong)

### Confirm Password

- **Type**: Password input
- **Required**: Yes
- **Validation**: Must match password field
- **Error**: "Passwords do not match"

### Date of Birth

- **Type**: Date input
- **Required**: No
- **Validation**: Must be 18+ years old
- **Error**: "You must be at least 18 years old"

## Requirements

- Implement real-time validation that shows errors as user types
- Display validation errors below each field
- Show password strength indicator with visual bar
- Disable submit button when form is invalid
- Show success page on successful submission displaying all submitted values
- Handle form submission with proper error states
- Use controlled components for all inputs
