import React, {useState} from "react";
import "../Card.css"; // optional, if using custom CSS or Tailwind classes directly

const Card = ({ title, children, theme = 'light' }) => {
  const isDark = theme === 'dark';
  
  return (
    <div className="card" style={{
      backgroundColor: isDark ? '#0c3971ff' : '#d5d7f4ff',
      color: isDark ? '#c4c7efff' : '#05065aff'
    }}>
      {title && <h2 className="card-title" style={{
        borderBottomColor: isDark ? '#a5a5f1ff' : '#05065aff'
      }}>{title}</h2>}
      <div>{children}</div>
    </div>
  );
};

export default Card;
