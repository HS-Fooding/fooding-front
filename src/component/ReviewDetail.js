import { useParams } from "react-router";
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { url } from "../Api";
import "@fortawesome/fontawesome-free/js/all.js";

const Container = styled.div`
  width: 350px;
  height: 600px;
  position: relative;
  box-sizing: border-box;
`;

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 20px;
  border-bottom: 1px solid ${(props) => props.theme.borderGrayColor};

  .userName {
    font-weight: 600;
    margin: 10px 0px;
  }
  .dateStar {
    margin: 10px 0px;
    span: first-child {
      color: ${(props) => props.theme.fontGrayColor};
      margin-right: 10px;
    }
    span: nth-child(2) {
      color: #fbc531;
    }
    span: last-child {
      color: ${(props) => props.theme.fontGrayColor};
    }
  }
  .title {
    font-weight: 600;
    margin: 12px 0px;
  }
  .content {
    margin: 12px 0px;
  }
  .image {
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }

    img {
      object-fit: cover;
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }
  }
`;

const ReplyInputBox = styled.div`
  position: absolute;
  bottom: 0;
  height: 50px;
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.borderGrayColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  color: ${(props) => props.theme.fontGrayColor};
  svg {
    cursor: pointer;
  }
`;

const ReplyInput = styled.textarea`
  width: 90%;
  height: 68%;
  border: 1px solid ${(props) => props.theme.borderGrayColor};
  &:focus {
    outline: none;
  }
  border-radius: 20px;
  resize: none;
  padding: 8px;
  overflow: hidden;
`;

const Replies = styled.div`
  width: 100%;
`;

const ReviewDetail = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState([]);
  const replyRef = useRef();

  const replySubmit = () => {
    let replyValue = replyRef.current.value;
    replyRef.current.value = "";
    console.log(replyValue);
  };

  var axios = require("axios");

  useEffect(() => {
    var config = {
      method: "get",
      url: url + `/sample_project/review/${reviewId}`,
      headers: {
        //'Cookie': 'Cookie_1=31B130A5F9F3D2ED1CFB0B94AB5FCBD8',
        //...data.getHeaders()
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setReview(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(reviewId);

  return (
    <Container>
      <Link to={"/Reviews"}>
        <Header />
      </Link>
      <ReviewContent>
        <div className="userName">{review.author}</div>
        <div className="dateStar">
          <span> {review.registerDate?.replaceAll("-", ".").slice(0, 10)}</span>
          <span>★</span>
          <span>{review.star}</span>
        </div>
        <div className="title">{review.title}</div>
        <div className="image">
          {review.images?.map((img, index) => (
            <div key={index}>
              <img src={img} />
            </div>
          ))}
        </div>
        <div className="content">
          {review.content?.split("\n").map((line, index) => {
            return (
              <>
                <p key={index}>
                  {line} <br />
                </p>
              </>
            );
          })}
        </div>
      </ReviewContent>
      <Replies></Replies>
      <ReplyInputBox>
        <ReplyInput ref={replyRef} />
        <div onClick={replySubmit}>
          <i className="far fa-paper-plane fa-lg"></i>
        </div>
      </ReplyInputBox>
    </Container>
  );
};

export default ReviewDetail;
