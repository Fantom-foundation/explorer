import React from 'react';
import Alert from 'react-s-alert';
import Dashboard from './dashboard';

export default function Routes() {
  return (
    <div>
      <Dashboard />
      <Alert timeout={2000} />
    </div>
  );
}
