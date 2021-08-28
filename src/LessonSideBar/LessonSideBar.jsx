import React, { Component } from "react";
import "./LessonSideBar.css";
import Lesson from "./Lesson/Lesson";

class LessonSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lessons: props.lessons,
    };
  }

  render() {
    return (
      <div className="side-bar">
        <ul className="side-lessons">
          <li
            className="lesson-list-item"
            onClick={this.props.toggleAllLessons}>
            {this.props.activeLessons.length === 0 ? "All" : "None"}
          </li>
          {this.state.lessons.map((lesson) => (
            <Lesson
              key={lesson.number}
              lesson={lesson}
              saveLessons={this.props.saveLessons}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default LessonSideBar;
