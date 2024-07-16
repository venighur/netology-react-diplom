import React from 'react';

type AlertProps = {
  text: string,
  status: 'success' | 'danger',
}

function Alert({ text, status }: AlertProps) {
  return (
    <div className={`alert alert-${status}`} role="alert">
      {text}
    </div>
  );
}

export default Alert;
