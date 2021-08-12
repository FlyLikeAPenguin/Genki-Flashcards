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

    if (!firebase.apps.length) {
      firebase.initializeApp(DB_CONFIG);
    }
    this.database = firebase.database().ref().child("cards");
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      cards: [],
      currentCard: {},
    };
  }

  componentDidMount() {
    console.log(firebase.database().ref().child("cards"));

    const currentCards = this.state.cards;

    this.database.on("child_added", (snap) => {
      currentCards.push({
        Definition: snap.val().Definition,
        Lesson: snap.val().Lesson,
        Reading: snap.val().Reading,
        Kanji: snap.val().Kanji,
      });

      this.setState({
        cards: currentCards,
        currentCard: this.getRandomCard(currentCards),
      });
    });
  }

  getRandomCard(currentCards) {
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if (card === this.state.currentCard) {
      this.getRandomCard(currentCards);
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
            Kanji={this.state.currentCard.Kanji}
            Definition={this.state.currentCard.Definition}
            Reading={this.state.currentCard.Reading}
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
