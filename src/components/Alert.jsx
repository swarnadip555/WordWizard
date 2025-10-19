import React from 'react';
import { capitalize } from '../utils';

const Alert = ({alert}) => {
  return (
    <div data-aos="fade-up" style={{ height: "40px", backgroundColor: "transparent" }}>
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <span><strong>{capitalize(alert.type)}</strong> : {alert.msg}</span>
        </div>
      )}
    </div>
  )
}

export default Alert;