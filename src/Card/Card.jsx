import React, { Component } from "react";
import "./Card.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";
class Card extends Component {
  render() {
    return (
      <Flippy
        flipDirection="horizontal"
        className="card"
        isFlipped={this.props.isFlipped}
        flipOnClick={false}
        onClick={() => this.props.flipCard(!this.props.isFlipped)}>
        <FrontSide
          style={{
            background: "rgb(189, 197, 201)",
            borderRadius: "25px",
            boxShadow: "2em 1em 1em rgba(0, 0, 0, 0.2)",
            padding: "0px",
            display: "block",
          }}>
          <div className="kanji noSelect">{this.props.Prompt}</div>
        </FrontSide>
        <BackSide
          style={{
            background: "rgb(189, 197, 201)",
            borderRadius: "25px",
            boxShadow: "2em 1em 1em rgba(0, 0, 0, 0.2)",
            padding: "0px",
          }}>
          <div className="reading noSelect">{this.props.Reading}</div>
          <div className="definition noSelect">{this.props.Definition}</div>
        </BackSide>
      </Flippy>
    );
  }
}

export default Card;
