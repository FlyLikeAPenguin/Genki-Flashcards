import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { BiDonateHeart } from "react-icons/bi";
import "./Header.css";

const Header = () => (
  <div className="topnav">
    <ul>
      <li className="topnav-bold">Kanji/Kana Flashcards</li>
      <li className="topnav-right">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://ko-fi.com/flylikeapenguin"
          className="topnav-light">
          Send a Thank You &nbsp;
          <BiDonateHeart className="icon" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/FlyLikeAPenguin/React-Flashcards"
          className="topnav-light">
          View on Github &nbsp;
          <AiFillGithub className="icon" />
        </a>
      </li>
    </ul>
  </div>
);

export default Header;
