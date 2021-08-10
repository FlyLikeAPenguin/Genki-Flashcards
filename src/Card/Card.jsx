import React from "react";
import "./Card.css";

const Card = (props) => (
  <div className="card-container">
    <div className="card">
      <div className="front">
        <div className="prompt-text">{props.prompt}</div>
      </div>

      <div className="back">
        <div className="answer-part1">{props.answer_part_1}</div>
        <div className="answer-part2">{props.answer_part_2}</div>
      </div>
    </div>
  </div>
);

export default Card;
