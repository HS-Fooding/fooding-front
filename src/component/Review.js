import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import { Link } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";

const Container = styled.div`
  border: 1px solid black;
  width: 350px;
  height: 600px;
  position: relative;
  box-sizing: border-box;
`;

const WriteReviewBtn = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  border: none;
  cursor: pointer;
  color: white;
  background-color: ${(props) => props.theme.mainColor};
`;

const Reviews = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  overflow: auto;
  /* padding-top: 50px; */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const ReviewBox = styled.div`
  width: 300px;
  height: 140px;
  padding: 10px;
  margin: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  &:last-child {
    /*margin-bottom: 200px;*/
  }
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
`;

const ReviewContent = styled.div`
  &:first-child {
    font-size: 20px;
    margin-bottom: 5px;
  }
  &:nth-child(2) {
    font-size: 13px;
  }
  &:last-child {
    padding-top: 10px;
    font-size: 15px;
    width: 100%;
    height: 80px;
  }
`;

const InnerReviews = styled.div`
  height: 500px;
  padding-top: 10px;
`;

const Review = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `http://13.124.207.219:8080/sample_project/members`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.data);
        setReviews(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Link to={"/"}>
        <Header title={"리뷰 목록"} />
      </Link>
      <Reviews>
        <InnerReviews>
          {reviews.map((review, index) => (
            <ReviewBox key={index}>
              <ReviewContent>{review.name}</ReviewContent>
              <ReviewContent>{review.star}</ReviewContent>
              <ReviewContent>{review.content}</ReviewContent>
            </ReviewBox>
          ))}
        </InnerReviews>
      </Reviews>
      <Link to={"/WriteReview"}>
        <WriteReviewBtn>리뷰 작성</WriteReviewBtn>
      </Link>
    </Container>
  );
};

export default Review;
