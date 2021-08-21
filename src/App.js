import React, { Component } from "react";
import Card from "./Card/Card";
import "./App.css";
import DrawButton from "./DrawButton/DrawButton";
import cards from "./Data/cards.json";
import LessonSideBar from "./LessonSideBar/LessonSideBar";
import Header from "./Header/Header";

const lessonNumbers = Array.from(new Set(cards.map((x) => x.Lesson))).sort(
  (a, b) => a - b
);
const lessons = lessonNumbers.map((n) => ({
  number: n,
  active: true,
  cards: cards.filter((k) => k.Lesson === n),
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);

    this.state = {
      currentCard: {},
    };
  }

  activeLessons() {
    return lessons.filter((x) => x.active);
  }

  componentDidMount() {
    this.setState({
      currentCard: this.getRandomCard(),
    });
  }

  getRandomCard() {
    var currentCards = lessons
      .filter((l) => l.active === true)
      .map((x) => x.cards)
      .flat();
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if (card === this.state.currentCard) {
      this.getRandomCard();
    }

    return card;
  }

  updateCard() {
    this.setState({
      currentCard: this.getRandomCard(),
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <LessonSideBar activeLessons={this.activeLessons()} lessons={lessons} />
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
