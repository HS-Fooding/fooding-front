import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../component/Header";
import { Link, useLocation } from "react-router-dom";
import { url } from "../../Api";
// import {Cookies} from "react-cookie";
const Container = styled.div`
  border: 1px solid black;
  width: 410px;
  height: 770px;
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
  height: 625px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  height: auto;
  padding: 10px;
  margin: 10px;
  background-color: white;

  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  &:last-child {
    /*margin-bottom: 200px;*/
  }

  .title {
    font-weight: bold;
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
    display: flex;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.3);
  }

  &:last-child {
    padding-top: 10px;
    font-size: 13px;
    width: 100%;
    height: 90px;
    overflow: auto;
    line-height: 1.5;
  }
`;

const ReviewTitle = styled.div``;

const ReviewImg = styled.div`
  width: 100%;
  margin-bottom: 10px;
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
  const location = useLocation();
  //   const cookies = new Cookies();
  //   const getCookie=(name)=>{
  //     return cookies.get(name);
  //  }
  console.log("location.restId", location.state);
  let token = localStorage.getItem("token");
  useEffect(() => {
    // console.log("cookie",getCookie("JSESSION"));

    var axios = require("axios");
    const getToken = localStorage.getItem("guestToken");

    var config = {
      method: "get", //url + `/fooding/restaurant?name=${searchWord}`
      url: url + `/fooding/restaurant/${location.state.marketId}/review`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken,
      },
    };

    axios(config)
      .then(function (response) {
        console.log("response.data결과", response.data.content);

        setReviews(response.data.content.reverse());
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Header back={`/guest/${location.state.marketId}`} title={"리뷰 목록"} />

      <Reviews>
        <InnerReviews>
          {reviews.map((review, index) => (
            <Link
              to={`/review/${location.state.marketId}/${review.id}`}
              state={{
                marketId: location.state.marketId,
              }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ReviewBox
                key={index}
                style={
                  reviews.length - 1 == index ? { marginBottom: "520px" } : null
                }
              >
                <ReviewContent>
                  {review.nickName.length > 17
                    ? review.nickName.slice(0, 17) + ".."
                    : review.nickName}
                </ReviewContent>
                <ReviewContent>
                  <span>
                    {review.registerDate.replaceAll("-", ".").slice(0, 10)}
                  </span>
                  <span
                    style={{
                      color: "#fbc531",
                      marginLeft: "8px",
                      display: "flex",
                      aligntItems: "center",
                    }}
                  >
                    <p>★</p>
                  </span>
                  <span>
                    <p>{review.star}</p>
                  </span>
                </ReviewContent>
                <ReviewImg>
                  {review.image.map((img, index) => (
                    <>
                      <img
                        src={img.path}
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
                <ReviewContent className="title">
                  {review.title.length > 25
                    ? review.title.slice(0, 25) + ".."
                    : review.title}
                </ReviewContent>
                <ReviewContent>
                  {review.content.length > 100
                    ? review.content.slice(0, 100) + ".."
                    : review.content}
                </ReviewContent>
              </ReviewBox>
            </Link>
          ))}
        </InnerReviews>
      </Reviews>
      {token == null ? (
        <Link to={"/login"}>
          {" "}
          <WriteReviewBtn>리뷰 작성</WriteReviewBtn>
        </Link>
      ) : (
        <Link
          to={"/WriteReview"}
          state={{
            marketId: location.state.marketId,
          }}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <WriteReviewBtn>리뷰 작성</WriteReviewBtn>
        </Link>
      )}
    </Container>
  );
};

export default Review;
