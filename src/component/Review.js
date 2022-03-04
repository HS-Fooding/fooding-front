import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import { Link } from "react-router-dom";
import { url } from "../Api";
// import {Cookies} from "react-cookie";
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
  padding-top: 90px;
  width: 100%;
  height: 510px;
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

const InnerReviews = styled.div`
  height: 500px;
  padding-top: 10px;
`;

const ReviewBox = styled.div`
  width: 300px;
  height: 350px;
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
  margin: 10px 0px;
  &:first-child {
    font-size: 17px;
    margin-bottom: 5px;
  }
  &:nth-child(2) {
    /* star */
    font-size: 13px;
    color: rgba(0, 0, 0, 0.3);
  }
  &:last-child {
    padding-top: 10px;
    font-size: 15px;
    width: 100%;
    height: 80px;
    overflow: auto;
    line-height: 1.3;
  }
`;

const ReviewImg = styled.div`
  width: 100%;
  display: flex;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  img {
    object-fit: cover;
  }
`;

const Review = () => {
  const [reviews, setReviews] = useState([]);
//   const cookies = new Cookies();
//   const getCookie=(name)=>{
//     return cookies.get(name);
//  }
  useEffect(() => {
    // console.log("cookie",getCookie("JSESSION"));

    var axios = require("axios");

    var config = {
      method: "get",
      url: url + "/sample_project/review",
      headers: {
        "Content-Type": "application/json",
        "Cookie": "cookie1=value; cookie2=value; cookie3=value;"
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
       
        setReviews(response.data.reverse());
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
              <ReviewContent>
                {review.author.length > 17
                  ? review.author.slice(0, 17) + ".."
                  : review.author}
              </ReviewContent>
              <ReviewContent>
                <span>
                  {review.registerDate.replaceAll("-", ".").slice(0, 10)}
                </span>
                <span
                  style={{
                    color: "#fbc531",
                    alignItems: "center",
                    marginLeft: "8px",
                  }}
                >
                  ★
                </span>

                {review.star}
              </ReviewContent>
              <ReviewImg>
                {review.images.map((img, index) => (
                  <>
                    <img
                      src={img}
                      key={index}
                      style={{
                        width: "100px",
                        height: "100px",
                        marginRight: "10px",
                      }}
                    />
                  </>
                ))}
              </ReviewImg>
              <ReviewContent>
                {review.content.length > 60
                  ? review.content.slice(0, 60) + ".."
                  : review.content}
              </ReviewContent>
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
