import React from "react";
import "./Lesson.css";

const Lesson = (props) => (
  <li className="lesson-list-item">
    <input name="lesson{props.LessonNumber}" type="checkbox" />
    Lesson {props.LessonNumber}
  </li>
);

export default Lesson;
