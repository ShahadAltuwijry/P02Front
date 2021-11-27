import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./style.css";

const slideImages = [
  {
    url: "./v5.png",
    caption: "Slide 5",
  },
  {
    url: "./الدفى حولك.jpg",
    caption: "Slide 1",
  },
  {
    url: "./الشتاء حولك.jpg",
    caption: "Slide 2",
  },
  {
    url: "./v5.png",
    caption: "Slide 5",
  },
  {
    url: "./الشتاء حولك 2.jpg",
    caption: "Slide 3",
  },
  {
    url: "./المطر حولك.jpg",
    caption: "Slide 4",
  },
];

const Header = () => {
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div className="each-slide" key={index}>
            <div style={{ backgroundImage: `url("${slideImage.url}")` }}>
              {/* <span>{slideImage.caption}</span> */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Header;
