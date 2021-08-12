import React, { Component } from "react";
import Card from "./Card/Card";
import "./App.css";
import DrawButton from "./DrawButton/DrawButton";
import firebase from "firebase/app";
import "firebase/database";
import { DB_CONFIG } from "./Config/Firebase/db_config";

class App extends Component {
  constructor(props) {
    super(props);

    if (firebase.apps.length === 0) {
      firebase.initializeApp(DB_CONFIG);
    }
    this.database = firebase.database().ref().child("cards");
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {},
    };
  }

  componentWillMount() {
    console.log(firebase.database().ref().child("cards"));

    const currentCards = this.state.cards;

    this.database.on("child_added", (snap) => {
      currentCards.push({
        id: snap.key,
        prompt: snap.val().prompt,
        answer_part_1: snap.val().answer_part_1,
        answer_part_2: snap.val().answer_part_2,
      });

      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards),
      });
    });
  }

  getRandomCard(cards) {
    var randomIndex = Math.floor(Math.random() * cards.length);
    var card = cards[randomIndex];
    if (card === this.state.currentCard) {
      this.getRandomCard(cards);
    }

    return card;
  }

  updateCard() {
    const currentCards = this.state.cards;
    this.setState({
      cards: currentCards,
      currentCard: this.getRandomCard(currentCards),
    });
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
