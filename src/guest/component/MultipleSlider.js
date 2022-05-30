import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImgContainer = styled.div`
  width: 136px;
  height: 136px;

  /* margin-right: 20px; */
  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    margin-right: 10px;
  }

  /* .slick-list {
    display: flex;
    width: 100%;
  }

  .slick-track {
    display: flex;
    width: 100%;
  } */
`;

function MultipleSlider({ images }) {
  console.log("slider:", images);
  {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };
    return (
      <div>
        <Slider {...settings}>
          {images?.map((one, index) => (
            <ImgContainer>
              <img src={one} key={index} />
            </ImgContainer>
          ))}
        </Slider>
      </div>
    );
  }
}

export default MultipleSlider;
