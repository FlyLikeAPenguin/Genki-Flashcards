import React, { Component } from "react";
import "./Lesson.css";
import { MdDone, MdClear } from "react-icons/md";

class Lesson extends Component {
  constructor(props) {
    super(props);
    this.toggleClass = this.toggleClass.bind(this);

    this.state = {
      lesson: props.lesson,
    };
  }

  toggleClass() {
    const currentLesson = this.state.lesson;
    currentLesson.active = !currentLesson.active;
    this.setState({ lesson: currentLesson });
  }

  render() {
    return (
      <li className="lesson-list-item" onClick={this.toggleClass}>
        Lesson {this.props.lesson.number}
        {this.state.lesson.active ? (
          <MdDone className="icon" />
        ) : (
          <MdClear className="icon" />
        )}
      </li>
    );
  }
}

export default Lesson;
