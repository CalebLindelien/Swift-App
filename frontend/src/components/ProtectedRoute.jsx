import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function ProtectedRoute({ children }) {
  // Access the state object from the Store context using the useContext hook
  const { state } = useContext(Store);
  // Extract the userInfo object from the state object
  const { userInfo } = state;
  // If the userInfo object exists, render the children
  // Otherwise, redirect to the signin page using the Navigate component
  return userInfo ? children : <Navigate to="/signin" />;
}
