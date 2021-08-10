import React, { Component } from 'react';
import Card from './Card/Card';
import './App.css';
import { IsConstructor } from 'es-abstract';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cards: [
        {id:1, prompt:"あ", answer_part_1:"a", answer_part_2:"a as in c(a)t"},
        {id:2, prompt:"か", answer_part_1:"ka", answer_part_2:"ka as in (ca)ptain"}
      ],
      currentCard: {

      }
    }

  }

  render() {
    return (
      <div className="App">
        <Card />
      </div>
    )
  };
}

export default App;
