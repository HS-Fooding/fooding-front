import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../component/Header";
import { Link, useLocation } from "react-router-dom";
import { url } from "../../Api";
// import {Cookies} from "react-cookie";
const Container = styled.div`
  width: 410px;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
  display:flex;
  flex-direction:column;


`;
const Reviews = styled.div`
  margin-top:60px;
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
`;

const InnerReviews = styled.div`
  height: 85vh;
  
  overflow: auto;
  /* padding-top: 50px; */

  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const WriteReviewBtn = styled.button`
  width: 100%;
  height: 80px;
  border: none;
  cursor: pointer;
  color: white;
  position:absolute;
  bottom:0;
  background-color: ${(props) => props.theme.mainColor};
`;


const ReviewBox = styled.div`
  width: 350px;
  height: auto;
  padding: 15px;
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
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: bold;
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
    height: 88px;
    //verflow: auto;

    line-height: 1.5;

    overflow: hidden;
    text-overflow: ellipsis;
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
  const token = localStorage.getItem("guestToken");
  useEffect(() => {
    // console.log("cookie",getCookie("JSESSION"));

    var axios = require("axios");
    //const getTtoken = localStorage.getItem("guestToken");

    var config = {
      method: "get", //url + `/fooding/restaurant?name=${searchWord}`
      url: url + `/fooding/restaurant/${location.state.marketId}/review`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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
                  reviews.length - 1 == index ? { marginBottom: "30px" } : null
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
                  {review.content.split("\n").map((line, index) => {
                    return (
                      <>
                        <p key={index}>
                          {line} <br />
                        </p>
                      </>
                    );
                  })}

                  {/* {review.content.length > 100
                    ? review.content.split("\n").map((line, index) => {
                        return (
                          <>
                            <p key={index}>
                              {line} <br />
                            </p>
                          </>
                        );
                      }) + ".."
                    : review.content.split("\n").map((line, index) => {
                        return (
                          <>
                            <p key={index}>
                              {line} <br />
                            </p>
                          </>
                        );
                      })} */}
                </ReviewContent>
              </ReviewBox>
            </Link>
          ))}
        </InnerReviews>
      </Reviews>
      {token == null ? (
        <Link to={"/guest/login"}>
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
