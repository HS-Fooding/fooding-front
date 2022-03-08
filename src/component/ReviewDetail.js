import { useParams } from "react-router";
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { url, token } from "../Api";
import "@fortawesome/fontawesome-free/js/all.js";

const Container = styled.div`
  width: 350px;
  height: 600px;
  position: relative;
  box-sizing: border-box;
`;

const MainBox = styled.div`
  height: 600px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
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

const CommentInputBox = styled.div`
  position: absolute;
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: white;
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

const CommentInput = styled.textarea`
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

const CommentContainer = styled.div`
  //width: 100%;
  //background-color: pink;
  // height: 150px;
  margin-bottom: 100px;
`;

const CommentsUl = styled.ul``;

const CommentsLi = styled.li`
  margin: 10px;
  width: auto;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 8px;

  .replyName {
    font-weight: bold;
    margin-bottom: 4px;
  }
`;

const BigImageBox = styled.div`
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.bigImg == true ? "visible" : "hidden")};
  background-color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
  }
  button {
    cursor: pointer;
    padding: 14px;
    position: absolute;
    top: 0;
    left: 0;
    border: 0;
    outline: 0;
    background-color: inherit;
    color: white;
  }
`;

const DateReply = styled.div`
  font-size: 10px;
  button {
    background-color: inherit;
    outline: none;
    border: none;
    font-size: 10px;
    font-weight: bold;
  }
`;

const ReviewDetail = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState([]);
  const commentRef = useRef();
  const [bigImg, setBigImg] = useState(false);
  const [comments, setComments] = useState([]);
  const [parentReply, setParentReply] = useState();

  var axios = require("axios");

  const commentSubmit = () => {
    let replyValue = commentRef.current.value;
    commentRef.current.value = "";
    console.log(replyValue);

    var data = JSON.stringify({
      content: replyValue,
    });

    const getToken = localStorage.getItem("token");

    var config = {
      method: "post",
      url: url + `/sample_project/review/${reviewId}/comment`,
      headers: {
        Authorization: "Bearer " + getToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.comments);
        setComments(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postReply = (id, parent) => {
    console.log(id);
    commentRef.current.focus();
    commentRef.current.value = `@${parent} `;
  };

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
        setComments(response.data.comments);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  console.log(reviewId);

  return (
    <Container>
      <Link to={"/Review"}>
        <Header />
      </Link>
      <MainBox>
        <ReviewContent>
          <div className="userName">{review.author}</div>
          <div className="dateStar">
            <span>
              {" "}
              {review.registerDate?.replaceAll("-", ".").slice(0, 10)}
            </span>
            <span>★</span>
            <span>{review.star}</span>
          </div>
          <div className="title">{review.title}</div>
          <div className="image">
            {review.images?.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  onClick={() => {
                    setBigImg(true);
                  }}
                />
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
        <CommentContainer>
          <CommentsUl>
            {comments?.map((reply, index) => (
              <CommentsLi key={index}>
                <CommentBox>
                  <span class="replyName">{reply.author}</span>
                  <span class="replyContent"> {reply.content}</span>
                </CommentBox>
                <DateReply>
                  <span>{reply.modifiedDate.slice(0, 10)}</span>
                  <button
                    onClick={() => {
                      postReply(reply.id, reply.author);
                    }}
                  >
                    답글 달기
                  </button>
                </DateReply>
              </CommentsLi>
            ))}
          </CommentsUl>
        </CommentContainer>
        <CommentInputBox>
          <CommentInput ref={commentRef} />
          <div onClick={commentSubmit}>
            <i className="far fa-paper-plane fa-lg"></i>
          </div>
        </CommentInputBox>
        <BigImageBox bigImg={bigImg}>
          <button
            onClick={() => {
              setBigImg(false);
            }}
          >
            <i className="fa-solid fa-x fa-lg"></i>
          </button>
          {review.images?.map((img, index) => (
            <div key={index}>
              <img src={img} />
            </div>
          ))}
        </BigImageBox>
      </MainBox>
    </Container>
  );
};

export default ReviewDetail;
