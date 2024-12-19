# React Native: setState after component unmount in useEffect

This repository demonstrates a common issue in React Native applications where using `setState` within a `useEffect` hook after the component has unmounted causes a warning.  This example showcases the problem and its solution using cleanup functions within `useEffect`.

## Problem
The problem arises when an asynchronous operation (like a data fetch) inside `useEffect` takes longer than the component's lifecycle. If the data arrives after the component is unmounted, calling `setState` will trigger a warning.  This warning can lead to unexpected behavior and application instability.

## Solution
The solution involves using the cleanup function provided by `useEffect`.  The cleanup function is executed before the component unmounts, allowing us to cancel pending requests or prevent state updates after the component has unmounted. This ensures the application remains stable and avoids unnecessary warnings.