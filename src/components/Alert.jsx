import React from 'react';
import { capitalize } from '../utils';

const Alert = (props) => {

  return (
    <div data-aos="fade-up" style={{ height: "40px" }}>
      {props.alert && (
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <span><strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}</span>
        </div>
      )}
    </div>
  )
}

export default Alert;
