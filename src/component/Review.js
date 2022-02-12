import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";

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
  background-color: ${(props) => props.theme.mainColor};
`;

const Reviews = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: orange;
  overflow: auto;
`;

const ReviewBox = styled.div`
  width: 300px;
  height: 140px;
  padding: 10px;
  margin: 10px;
  background-color: teal;
  display: flex;
  flex-direction: column;
  &:last-child {
    /*margin-bottom: 200px;*/
  }
`;

const ReviewContent = styled.div`
  &:first-child {
    font-size: 20px;
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
  height: 570px;
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
      <Reviews>
        <Header title={"리뷰목록"} />

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
      <WriteReviewBtn>리뷰 작성</WriteReviewBtn>
    </Container>
  );
};

export default Review;
