import React, { Component } from "react";
import Card from "./Card/Card";
import "./App.css";
import DrawButton from "./DrawButton/DrawButton";

class App extends Component {
  constructor(props) {
    super(props);

    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [
        {
          id: 1,
          prompt: "あ",
          answer_part_1: "a",
          answer_part_2: "a as in c(a)t",
        },
        {
          id: 2,
          prompt: "か",
          answer_part_1: "ka",
          answer_part_2: "ka as in (ca)ptain",
        },
      ],
      currentCard: {},
    };
  }

  componentWillMount() {
    const currentCards = this.state.cards;

    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards),
    });
  }

  getRandomCard(cards) {
    return cards[Math.floor(Math.random() * cards.length)];
  }

  updateCard() {
    console.log("New Card");
  }

  render() {
    return (
      <div className="App">
        <div className="cardRow">
          <Card
            prompt={this.state.currentCard.prompt}
            answer_part_1={this.state.currentCard.answer_part_1}
            answer_part_2={this.state.currentCard.answer_part_2}
          />
        </div>
        <div className="buttonRow">
          <DrawButton drawCard={this.updateCard} />
        </div>
      </div>
    );
  }
}

export default App;
