import React from "react";
import twitter from "src/assets/images/social/dark/twitter.svg";
import telegram from "src/assets/images/social/dark/telegram.svg";
import redditAlien from "src/assets/images/social/dark/reddit-alien.svg";
import medium from "src/assets/images/social/dark/medium.svg";
import github from "src/assets/images/social/dark/github.svg";
import facebook from "src/assets/images/social/dark/facebook.svg";
import youtube from "src/assets/images/social/dark/youtube.svg";

export default () => (
  <div className="profile-social">
    <a href="https://www.twitter.com" targrt="_blank">
      <img src={twitter} alt="socila" />
    </a>
    <a href="https://www.telegram.com" targrt="_blank">
      <img src={telegram} alt="socila" />
    </a>
    <a href="https://www.reddit.com/" targrt="_blank">
      <img src={redditAlien} alt="socila" />
    </a>
    <a href="https://www.medium.com" targrt="_blank">
      <img src={medium} alt="socila" />
    </a>
    <a href="https://www.github.com" targrt="_blank">
      <img src={github} alt="socila" />
    </a>
    <a href="https://www.facebook.com" targrt="_blank">
      <img src={facebook} alt="socila" />
    </a>
    <a href="https://www.youtube.com" targrt="_blank">
      <img src={youtube} alt="socila" />
    </a>
  </div>
);
