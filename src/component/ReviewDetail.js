import { useParams } from "react-router";
import React from "react";
import Header from "./Header";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    margin: 12px 0;x
  }
  .content{
    margin: 12px 0px;
  }

`;

const ReviewDetail = () => {
  const { reviewId } = useParams();

  console.log(reviewId);

  return (
    <Container>
      <Link to={"/Reviews"}>
        <Header />
      </Link>
      <ReviewContent>
        <div className="userName">김도연</div>
        <div className="dateStar">
          <span>2022.02.04</span>
          <span>★</span>
          <span>4.0</span>
        </div>
        <div className="title">청결이 좋았던 곳 </div>
        <div className="content">어쩌구저쩌구 좋았다 그래서 어쩌구</div>
      </ReviewContent>
    </Container>
  );
};

export default ReviewDetail;
