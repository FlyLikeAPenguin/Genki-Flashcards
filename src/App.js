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

class App extends Component {
  constructor(props) {
    super(props);
    this.updateCard = this.updateCard.bind(this);
    this.toggleAllLessons = this.toggleAllLessons.bind(this);

    this.state = {
      currentCard: {},

      lessons: lessonNumbers.map((n) => ({
        number: n,
        active: true,
        cards: cards.filter((k) => k.Lesson === n),
      })),
    };
  }

  setActiveLessons(activelessons) {
    this.disableAllLessons();
    activelessons.forEach(
      (x) => (this.state.lessons.find((y) => y.number === x).active = true)
    );
  }

  disableAllLessons() {
    this.state.lessons.forEach((x) => (x.active = false));
  }

  toggleAllLessons() {
    // If we currently have no active lessons, make them all active.
    const active = this.activeLessons().length === 0;
    this.state.lessons.forEach((x) => (x.active = active));
    this.updateCard();
  }

  activeLessons() {
    return this.state.lessons.filter((x) => x.active);
  }

  getRandomCard() {
    var currentCards = this.state.lessons
      .filter((l) => l.active === true)
      .map((x) => x.cards)
      .flat();

    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    if (card === this.state.currentCard && card != null) {
      this.getRandomCard();
    }

    return card;
  }

  updateCard() {
    this.setState({
      currentCard: this.getRandomCard(),
    });
  }

  componentDidMount() {
    const persistState = sessionStorage.getItem("active-lessons");
    console.log(persistState);
    if (persistState) {
      try {
        this.setActiveLessons(JSON.parse(persistState).map((x) => x.number));
      } catch (e) {
        // is not json
      }
    }
    this.setState({
      currentCard: this.getRandomCard(),
    });
  }

  componentDidUpdate() {
    sessionStorage.setItem(
      "active-lessons",
      JSON.stringify(this.activeLessons())
    );
  }

  render() {
    return (
      <div className="App">
        <Header />
        <LessonSideBar
          activeLessons={this.activeLessons()}
          lessons={this.state.lessons}
          toggleAllLessons={this.toggleAllLessons}
        />
        <div className="cardRow">
          <Card
            Kanji={this.state.currentCard?.Kanji}
            Definition={this.state.currentCard?.Definition}
            Reading={this.state.currentCard?.Reading}
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
