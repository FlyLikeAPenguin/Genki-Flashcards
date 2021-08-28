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
    this.flipCard = this.flipCard.bind(this);
    this.saveActiveLessons = this.saveActiveLessons.bind(this);

    this.state = {
      currentCard: {},
      isFlipped: false,

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
    // If we currently have no active lessons, make them all active, otherwise disable them all.
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

    if (currentCards.length === 0) {
      // If no cards are active, return here.
      return null;
    } else if (currentCards.length === 1) {
      // If there's only one card active, we always want to return that one.
      // Eliminates potential stack overflow later.
      return currentCards[0];
    }

    // If we have multiple cards to choose from, randomly select one.
    var randomIndex = Math.floor(Math.random() * currentCards.length);
    var card = currentCards[randomIndex];
    // If we've picked the same card again, try to find a new card.
    if (card === this.state.currentCard) {
      return this.getRandomCard();
    }

    return card;
  }

  flipCard(flipState) {
    this.setState({ isFlipped: flipState });
  }

  updateCard() {
    // If we're currently flipped, flip the card back so that the user doesn't see the answer.
    // Delay getting the new card until the animation has finished.
    // If we're not flipped, we can get the card immediately
    if (this.state.isFlipped) {
      this.flipCard(false);
      setTimeout(() => {
        this.setState({
          currentCard: this.getRandomCard(),
        });
      }, 200);
    } else {
      this.setState({
        currentCard: this.getRandomCard(),
      });
    }
  }

  componentDidMount() {
    const persistState = localStorage.getItem("active-lessons");
    if (persistState) {
      try {
        this.setActiveLessons(JSON.parse(persistState).map((x) => x.number));
      } catch (e) {
        console.log("Error parsing local storage.");
      }
    }
    this.setState({
      currentCard: this.getRandomCard(),
    });
  }

  componentDidUpdate() {
    this.saveActiveLessons();
  }

  saveActiveLessons() {
    localStorage.setItem(
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
          saveLessons={this.saveActiveLessons}
        />
        <div className="card-controls">
          <div className="card-row">
            <Card
              Prompt={this.state.currentCard?.Prompt}
              Definition={this.state.currentCard?.Definition}
              Reading={this.state.currentCard?.Reading}
              flipCard={this.flipCard}
              isFlipped={this.state.isFlipped}
            />
          </div>
          <div className="button-row">
            <DrawButton drawCard={this.updateCard} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
