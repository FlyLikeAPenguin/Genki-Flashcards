import React from "react";
import "./Card.css";

const Card = (props) => (
  <div className="card-container">
    <div className="card">
      <div className="front">
        <div className="kanji">{props.Kanji}</div>
      </div>

      <div className="back">
        <div className="reading">{props.Reading}</div>
        <div className="definition">{props.Definition}</div>
      </div>
    </div>
  </div>
);

export default Card;
