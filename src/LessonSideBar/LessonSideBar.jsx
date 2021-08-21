import React from "react";
import "./LessonSideBar.css";

const LessonSideBar = (props) => (
  <div>
    <ul class="side-lessons">
      <li className="lesson-list-item">
        {props.activeLessons.length === 0 ? "All" : "None"}
      </li>
      {props.lessons.map((lesson) => (
        <li className="lesson-list-item">Lesson {lesson.number}</li>
      ))}
    </ul>
  </div>
);

export default LessonSideBar;
