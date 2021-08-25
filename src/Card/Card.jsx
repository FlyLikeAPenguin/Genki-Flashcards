import React from "react";
import "./Card.css";

const Card = (props) => (
  <div className="card">
    <div className="card-inner">
      <div className="card-front">
        <div className="kanji">{props.Prompt}</div>
      </div>

      <div className="card-back">
        <div className="reading">{props.Reading}</div>
        <div className="definition">{props.Definition}</div>
      </div>
    </div>
  </div>
);

export default Card;
