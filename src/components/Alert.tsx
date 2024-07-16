import React from 'react';

type AlertProps = {
  text: string,
  status: 'success' | 'danger',
  repeat?: () => void,
}

function Alert({ text, status, repeat }: AlertProps) {
  return (
    <div className={`alert alert-${status}`} role="alert">
      {text}. {repeat && <button className="alert-link alert-btn" onClick={repeat}>Повторить запрос</button>}
    </div>
  );
}

export default Alert;
