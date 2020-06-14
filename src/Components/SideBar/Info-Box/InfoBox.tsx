import React from 'react';
import './InfoBox.css';
function InfoBox (props: {label: string; color: string; value: string}) {
  return (
    <div className="info-box" style = {{backgroundColor: props.color}}>
        <h3>{props.label}</h3>
        <p>{props.value}</p>
    </div>
  );
}

export default InfoBox;
