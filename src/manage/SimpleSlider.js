import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MarketImg = styled.img`
  width: 210px;
  height: 179px;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
`;

function SimpleSlider({ images }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log("Slider:", images);
  return (
    <div>
      {" "}
      <h2> Single Item</h2>{" "}
      <Slider {...settings}>
        {images?.length !== 0 ? (
          images?.map((one, index) => (
            <MarketImg src={one} key={index}></MarketImg>
          ))
        ) : (
          <FontAwesomeIcon
            style={{ color: "rgba(0, 0, 0, 0.1)" }}
            icon={faCamera}
          />
        )}{" "}
      </Slider>{" "}
    </div>
  );
}

export default SimpleSlider;
