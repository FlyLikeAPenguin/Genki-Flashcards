import React from "react";
import "./Card.css";

const Card = (props) => (
  <div className="card-container">
    <div className="card">
      <div className="front">
        <div className="Kanji">{props.Kanji}</div>
      </div>

      <div className="back">
        <div className="Reading">{props.Reading}</div>
        <div className="Definition">{props.Definition}</div>
      </div>
    </div>
  </div>
);

export default Card;
