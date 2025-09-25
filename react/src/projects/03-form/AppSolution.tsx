import { useState, type HTMLInputTypeAttribute } from 'react';
import './App.css';

type FormErrors =
  | 'LessThanTwoChars'
  | 'InvalidEmail'
  | 'PasswordNotCompliant'
  | 'PasswordsDoNotMatch'
  | 'InvalidPhone'
  | 'Underage';

interface FormField {
  fieldName: string;
  fieldId: string;
  fieldType: HTMLInputTypeAttribute;
  value: string;
  required: boolean;
  errors: string[];
  errorMessages: Partial<Record<FormErrors, string>>;
  validations: Partial<Record<FormErrors, (input: string, ...args: unknown[]) => boolean>>;
  features?: Record<string, unknown>;
}

function App() {
  const [form, setForm] = useState<FormField[]>([
    {
      value: '',
      fieldId: 'full-name',
      fieldName: 'Full Name',
      fieldType: 'text',
      required: true,
      validations: { LessThanTwoChars: input => input.trim().length >= 2 },
      errorMessages: { LessThanTwoChars: 'Full name must be at least 2 characters long' },
      errors: [],
    },
    {
      value: '',
      fieldId: 'email',
      fieldName: 'Email',
      fieldType: 'email',
      required: true,
      validations: {
        InvalidEmail: input =>
          input
            .trim()
            .split('@')
            .filter(e => e.length > 0).length === 2,
      },
      errorMessages: { InvalidEmail: 'Please enter a valid email address' },
      errors: [],
    },
    {
      value: '',
      fieldId: 'password',
      fieldName: 'Password',
      fieldType: 'password',
      required: true,
      validations: {
        PasswordNotCompliant: input => {
          if (input.length < 8) return false;

          const charCodes = input.split('').map(c => c.charCodeAt(0));
          if (charCodes.filter(c => c >= 97 || c <= 122).length === 0) return false;
          if (charCodes.filter(c => c >= 65 || c <= 90).length === 0) return false;
          if (charCodes.filter(c => c >= 48 || c <= 57).length === 0) return false;

          return true;
        },
      },
      errorMessages: {
        PasswordNotCompliant:
          'Password must be at least 8 characters long and contain uppercase, lowercase, and number',
      },
      errors: [],
      features: {
        strength: (input: string) => {
          switch (true) {
            case input.length < 8:
              return 'Weak';
            case input.length < 12:
              return 'Fair';
            case input.length < 16:
              return 'Good';
            default:
              return 'Strong';
          }
        },
      },
    },
    {
      value: '',
      fieldId: 'confirm-password',
      fieldName: 'Confirm Password',
      fieldType: 'password',
      required: true,
      validations: {
        PasswordsDoNotMatch: (input, currentPassword) => input === currentPassword,
      },
      errorMessages: { PasswordsDoNotMatch: 'Passwords do not match' },
      errors: [],
    },
    {
      value: '',
      fieldId: 'birth-date',
      fieldName: 'Date of Birth',
      fieldType: 'date',
      required: false,
      validations: {
        Underage: input => {
          const birthAsNumber = new Date(input);
          if (isNaN(birthAsNumber.getTime())) return false;

          const now = new Date();
          const yearsOfAge = now.getFullYear() - birthAsNumber.getFullYear();

          return yearsOfAge >= 18;
        },
      },
      errorMessages: { Underage: 'You must be at least 18 years old' },
      errors: [],
    },
  ]);

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validatedForm = form.map(f => {
      const errors = validateField(f, f.value, form);
      return { ...f, errors };
    });
    const areAllFieldsValid = validatedForm.filter(field => field.errors.length > 0).length === 0;

    setForm(validatedForm);
    if (areAllFieldsValid) {
      setSubmissionStatus('succeeded');
    } else {
      setSubmissionStatus('attempted');
    }
  };

  const [submissionStatus, setSubmissionStatus] = useState<
    'unsubmitted' | 'attempted' | 'succeeded'
  >('unsubmitted');

  return (
    <div className="app">
      <div className="container">
        <h1>User Registration</h1>
        {submissionStatus === 'succeeded' ? (
          form
            .filter(field => field.fieldType !== 'password')
            .map(field => (
              <div key={field.fieldId} style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ fontWeight: 'bold' }}>{field.fieldName}</span>
                <span>{field.value}</span>
              </div>
            ))
        ) : (
          <form onSubmit={onSubmit}>
            {form.map(field => (
              <div
                key={field.fieldId}
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <span style={{ fontWeight: 'bold' }}>
                  {field.fieldName}
                  {field.required && '*'}
                </span>
                <input
                  type={field.fieldType}
                  id={field.fieldId}
                  onChange={e => {
                    setForm(prev =>
                      prev.map(prevField => {
                        if (prevField.fieldId !== field.fieldId) {
                          return prevField;
                        }

                        const newValue = e.target.value;
                        const errors = validateField(prevField, newValue, prev);

                        return {
                          ...prevField,
                          value: newValue,
                          errors,
                        };
                      })
                    );
                  }}
                />
                {field.fieldId === 'password' && (
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <span>
                      Password Strength:{' '}
                      {(field.features?.strength as (input: string) => string)(field.value)}
                    </span>
                    <div
                      style={{
                        position: 'relative',
                        height: '20px',
                        width: '150px',
                        backgroundColor: 'gray',
                      }}
                    >
                      {field.value.length > 4 && (
                        <div
                          style={{
                            position: 'absolute',
                            zIndex: 10,
                            height: '100%',
                            width: '25%',
                            backgroundColor: 'red',
                          }}
                        />
                      )}
                      {field.value.length > 8 && (
                        <div
                          style={{
                            position: 'absolute',
                            zIndex: 8,
                            height: '100%',
                            width: '50%',
                            backgroundColor: 'orange',
                          }}
                        />
                      )}
                      {field.value.length > 12 && (
                        <div
                          style={{
                            position: 'absolute',
                            zIndex: 6,
                            height: '100%',
                            width: '75%',
                            backgroundColor: 'yellow',
                          }}
                        />
                      )}
                      {field.value.length > 12 && (
                        <div
                          style={{
                            position: 'absolute',
                            zIndex: 4,
                            height: '100%',
                            width: '100%',
                            backgroundColor: 'green',
                          }}
                        />
                      )}
                    </div>
                  </div>
                )}
                {submissionStatus === 'attempted' && (
                  <ul>
                    {field.errors.map(e => (
                      <li style={{ color: 'crimson' }}>{e}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );

  function validateField(prevField: FormField, newValue: string, prevFields: FormField[]) {
    let validationResults: FormErrors[] = [];
    if (prevField.fieldId !== 'confirm-password') {
      validationResults = Object.entries(prevField.validations)
        .map(([errorType, validationFunction]) => (validationFunction(newValue) ? null : errorType))
        .filter(Boolean) as FormErrors[];
    } else {
      const password = prevFields.find(f => f.fieldId === 'password')?.value ?? '';

      validationResults = Object.entries(prevField.validations)
        .map(([errorType, validationFunction]) =>
          validationFunction(newValue, password) ? null : errorType
        )
        .filter(Boolean) as FormErrors[];
    }
    const errors = Object.entries(prevField.errorMessages)
      .filter(([errorType]) => validationResults.some(e => e === errorType))
      .map(([, message]) => message);

    if (newValue === '' && prevField.required) {
      errors.unshift(`${prevField.fieldName} is required`);
    }
    return errors;
  }
}

export default App;
