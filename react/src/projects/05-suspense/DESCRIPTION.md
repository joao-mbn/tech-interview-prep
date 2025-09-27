# Suspense Data Fetching

## Difficulty: Hard

## Description

Build a React application that demonstrates the use of React's `use` hook and `Suspense` component for data fetching. The app should fetch dinosaur data from a mock API and display it in a list with proper loading states and error handling.

## Requirements

- Use the `use` hook to fetch data from the provided `api` function
- Implement `Suspense` component to handle loading states
- Display a loading spinner while data is being fetched
- Implement an ErrorBoundary component to catch and handle errors
- Handle and display errors if the API call fails
- Present the fetched dinosaurs in a visually appealing list
- Each dinosaur should display: name, period, diet, and description

## Technical Notes

- The `api` function should simulate network delay (already provided), providing data and errors at random, as you refresh the page.
